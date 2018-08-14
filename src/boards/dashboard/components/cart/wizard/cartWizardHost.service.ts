import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";
import * as _ from "lodash";

type WizardEventType = "registered" | "switched" | "next" | "previous" | "unlock" | "lock";

export interface WizardEvent {
  type: WizardEventType,
  params?: Object
}

@Injectable()
export class CartWizardHostService {
  private _steps = [];
  private _current = 0;
  private _subject:BehaviorSubject<WizardEvent>;

  constructor() {
    this._subject = new BehaviorSubject(null);
    this._subject
      .filter((event) => {
        return !!event;
      })
      .subscribe((event:WizardEvent) => {
        switch(event.type) {
          case "next":

            this.nextStep()
              .stream()
              .next({
                type:"switched",
                params: {
                  component: this.current["component"]
                }
              });

            break;
      }
    })
  }

  registerStep(id:string, title:string, component) {
    this._steps[id] = {
      title: title,
      component: component,
    };

    this.stream()
      .next({type: "registered", params: this._steps[id]});

    return this;
  }

  nextStep() {
    let next = this._current + 1;

    if(_.values(this._steps).length >= next) {
      this._current = next;
    }

    return this;
  }

  stream():BehaviorSubject<any> {
    return this._subject;
  }

  fire(type:WizardEventType, parameters?:{}) {
    let event = {
      type: type,
      parameters: parameters
    };

    this.stream().next(event);
    return this;
  }

  get steps() {
    return this._steps;
  }

  get current() {
    return _.values(this._steps)[this._current-1];
  }
}
