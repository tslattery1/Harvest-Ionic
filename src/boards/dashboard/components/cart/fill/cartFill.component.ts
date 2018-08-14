import {Component} from "@angular/core";
import {CartWizardHostService} from "../wizard/cartWizardHost.service";

@Component({
  selector: "cart-fill",
  templateUrl: "./template.html"
})
export class CartFillComponent {


  constructor(private wizardHostSvc:CartWizardHostService) {}

  doOnSelect() {
    console.log("test");
  }

  doGoToCheckout() {
    this.wizardHostSvc.fire("next");
  }
}
