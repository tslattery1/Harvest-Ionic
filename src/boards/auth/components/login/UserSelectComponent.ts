import {Component, OnInit} from "@angular/core";
import {AuthInnerComponentContract, AuthStateEvent} from "../../contracts/AuthInnerComponentContract";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UserResource} from "../../../../app/Resources/Models/Users/UserResource";
import {User} from "../../../../app/Models/User";
import {Observable} from "rxjs/Observable";
import {transition, trigger} from "@angular/animations";
import {NavController} from "ionic-angular";
import {DashboardPage} from "../../../dashboard/dashboard.page";
import {DIRECTION_FORWARD} from "ionic-angular/navigation/nav-util";

type UserSelectStep = "select" | "pincode" | "reset" | "create";

@Component({
  selector: "user-auth",
  templateUrl: "./template.html",
  animations: [
    trigger('state', [
      transition('* => select', [
      ]),
      transition('* => pincode', [
      ]),
      transition('* => reset', [
      ])
    ]),
  ]
})
export class UserSelectComponent implements AuthInnerComponentContract, OnInit {
  public pincode = "";

  public state = {
    step: "select",
    title: "Select user",
    icon: "hvst-user-1",
    color: null,
    user: null,
    failedAttempts: 0,
    isResetSuggested: false,
    isInProgress: false,
    isPinPadLocked: false
  };

  public users:Observable<User[]>;
  public stateBus: BehaviorSubject<AuthStateEvent> = new BehaviorSubject<AuthStateEvent>({type: "init", size: "small", color: "light"});

  constructor(private userService:UserResource, private navCtl:NavController) {}

  ngOnInit() {
    this.users = this.userService.all();

    this.stateBus.next({
      type: "init",
      color: "light"
    });
  }

  onResetFinished() {
    console.log("test");
  }

  doUserSelect(user:User) {
    this.state.user = user;
    this.doSwitchStep("pincode");
  }

  doSwitchStep(step:UserSelectStep) {
    switch(step) {
      default:
      case "select":
        this.state.color = null;
        this.state.title = "Select user";
        this.state.icon = "hvst-user-1";
        break;

      case "pincode":
        this.state.color = null;
        this.state.title = "Enter your PIN";
        this.state.icon = "hvst-lock";
        this.pincode = "";
        break;

      case "create":
        this.state.color = null;
        this.state.title = "Create user";
        this.state.icon = null;
        this.pincode = "";
        break;

      case "reset":
        this.state.color = "energized";
        this.state.icon = "hvst-lock-reset";
        this.state.title = "Reset PIN";
        break;
    }

    this.state.step = step;
  }

  doPinEnter() {
    if(!(this.state.step === "pincode")) {
      return false;
    }

    this.state.title = `PIN: `;

    for(let i = 0; i<this.pincode.length; i++) {
      this.state.title += "*";
    }

    if(this.pincode.length == 4) {
      this.state.isInProgress = true;
      this.state.isPinPadLocked = true;

      this.userService.authenticate(this.state.user, this.pincode)
        .map((data) => {
          this.state.isInProgress = false;
          return !!data;
        })
        .subscribe((result: boolean) => {
            if (result) {
              this.doAuthorize();
            } else {
              this.doFailedPinAttempt();
            }
          }
        );
    }
  }

  doAuthorize() {
    this.state.failedAttempts = 0;

    this.state.title = "Welcome back";
    this.state.icon = null;
    this.state.color = "balanced";

    setTimeout(() => {
      this.navCtl.setRoot(DashboardPage, {}, {animate: true, direction: DIRECTION_FORWARD});
    }, 1500);
  }

  doFailedPinAttempt() {
    this.state.failedAttempts++;
    this.state.isPinPadLocked = false;

    if(this.state.failedAttempts > 5) {
      this.state.title = "Reset PIN?";
      this.state.icon = "hvst-lock-reset";
      this.state.color = "energized";
      this.state.isResetSuggested = true;
    } else {
      this.state.title = "Try again";
      this.state.color = "energized";
    }
  }

  doResetPinClick() {
    this.stateBus.next({
      type: "proceed",
      color: "dark"
    });

    this.doSwitchStep('reset');
  }

  doResetPinDeclineClick() {
    this.doSwitchStep('select');
    this.state.isResetSuggested = false;
    this.stateBus.next({
      type: "proceed",
      color: "light"
    });
  }
}
