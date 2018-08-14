import {Component} from "@angular/core";
import {CartWizardComponent} from "../cart/wizard/cartWizard.component";
import { LayoutViewService } from "../../../../app/Services/LayoutView/LayoutView.service";

@Component({
  selector: "home-component",
  templateUrl: "./template.html"
})
export class HomeComponent {
  public now = new Date;

  constructor(private viewSvc:LayoutViewService) {}

  doSwitchPage(page:string) {
    switch (page) {
      case "start-cart":
        return this.viewSvc.pushView(CartWizardComponent);
    }
  }
}
