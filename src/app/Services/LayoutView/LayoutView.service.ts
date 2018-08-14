import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentComponentWasNotSetError } from "./Exceptions/CurrentComponentWasNotSetError";
import _ from "lodash";

type InstanceParams = {[key:string]: any};

@Injectable()
export class LayoutViewService {
    private _current:any;
    private _params:InstanceParams;
    private _subject:BehaviorSubject<any>;
    
    constructor(private componentFactoryResolver:ComponentFactoryResolver) {
        this.reset();
    }

    reset() {
        this._current = null;
        this._params = null;
        this._subject = new BehaviorSubject(null);
    }
    
    stream():Observable<any> {
        return this._subject.filter(view => !!view);
    }
    
    pushView(component, params:InstanceParams = {}) {
        let instance = this.componentFactoryResolver.resolveComponentFactory(component);

        if(!instance) {
          throw new Error("Failed to instantiate child component");
        }

        this._params = params;
        this._current = instance;
        this._subject.next(this._current);
    }

    publishAt(container:ViewContainerRef) {
        if(!this._current) {
            throw new CurrentComponentWasNotSetError
        }

        let ref = container.createComponent(this._current);

        _.each(this._params, (value, key) => {
            ref.instance[key] = value;
        });

        return ref;
    }
}