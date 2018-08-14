import {Component, Input} from "@angular/core";
import {User} from "../../../../app/Models/User";
import {animate, style, transition, trigger} from "@angular/animations";
import {UserSelectComponent} from "../login/UserSelectComponent";
import { LayoutViewService } from "../../../../app/Services/LayoutView/LayoutView.service";

@Component({
  selector: "pin-reset",
  templateUrl: "./template.html",
  animations: [
    trigger('step', [
      transition("* => *", [
        style({transform: "translateX(25px)"}),
        animate(250, style({transform: "translateX(0)"}))
      ])
    ])
  ]
})
export class PinResetComponent {
  @Input() public user:User;
  public step = "method";

  public state = {
    isInProgress: false,
    isPinpadLocked: false
  };

  public pincode = {
    value: "",
    confirm: ""
  };

  constructor(private viewSvc:LayoutViewService) {}

  getTitle() {
    switch(this.step) {
      case "method":
        return "Select Reset Method";

      case "approve":
        return "Enter Verification Code";

      case "new":
        return "Enter a New PIN";

      case "confirm":
        return "Re-enter Your New PIN";

      case "success":
        return "";
    }
  }

  getColor() {
    switch(this.step) {
      case "approve":
      case "method":
        return "calm";

      case "confirm":
      case "new":
        return "balanced";
    }
  }

  doSwitchStep(id) {
    this.step = id;
    return this;
  }

  doPinEnter() {
    if(this.pincode.value.length == 4) {
      this.doSwitchStep('confirm');
    }
  }

  doPinConfirmEnter() {
    if(this.pincode.confirm.length == 4) {
      if(this.pincode.value == this.pincode.confirm) {
        this.doSwitchStep('success');

        setTimeout(() => {
          this.viewSvc.pushView(UserSelectComponent);
        }, 1500);
      }
    }
  }
}
