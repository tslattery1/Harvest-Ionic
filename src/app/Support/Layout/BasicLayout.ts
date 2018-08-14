import { LayoutViewService } from "../../Services/LayoutView/LayoutView.service";
import { ViewChild, ViewContainerRef, Component } from "@angular/core";

@Component({
    template: ""
})
export class BasicLayout {
    @ViewChild('container', {read: ViewContainerRef})
    protected container: ViewContainerRef;

    protected activeView:any;
    protected activeState:string = "init";

    constructor(protected viewSvc:LayoutViewService) {}

    ionViewDidLoad() {
        this.activeState = "init";

        this.viewSvc.stream()
            .map(component => {
                this.activeState = "transition";
                return this.viewSvc.publishAt(this.container);
            })
            .subscribe(ref => {
                if(this.activeView) {
                    this.activeView.destroy();
                }

                this.activeView = ref;
                this.activeState = "finished";
            });
    }

    switchView(view) {
        return this.viewSvc.pushView(view);
    }

    activeStateSnapshot() {
        return this.activeState;
    }

    resetState() {
        this.viewSvc.reset();
    }
}