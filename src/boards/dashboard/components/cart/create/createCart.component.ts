import {Component} from "@angular/core";
import {CartWizardHostService} from "../wizard/cartWizardHost.service";

@Component({
  selector: "create-cart",
  templateUrl: "./template.html"
})
export class CreateCartComponent {
  constructor(private hostSvc:CartWizardHostService) {}

  doClickNext() {
    this.hostSvc.fire('next');
  }
}
