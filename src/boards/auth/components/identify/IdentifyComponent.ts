import {Component, OnInit} from "@angular/core";
import {AuthInnerComponentContract, AuthStateEvent} from "../../contracts/AuthInnerComponentContract";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {regexpValidator} from "../../../../app/Validators/RegexpValidator";
import {trigger, transition, style, animate} from "@angular/animations";
import * as _ from "lodash";
import {Token} from "../../../../app/Models/Token";
import {UserSelectComponent} from "../login/UserSelectComponent";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { DeviceAuthenticationResource } from "../../../../app/Resources/Models/Auth/DeviceAuthenticationResource";
import { ToastController } from "ionic-angular";
import { Observable } from "rxjs";
import { LayoutViewService } from "../../../../app/Services/LayoutView/LayoutView.service";

@Component({
  selector: "identify-tablet-component",
  templateUrl: "./template.html",
  animations: [
    trigger('title', [
      transition('* => *', [
        animate(250, style({ transform: "translateX(25px)" })),
        animate(250, style({ transform: "translateY(0)" })),
        animate(250, style({ transform: "translateX(-25px)" })),
        animate(250, style({ transform: "translateY(0)" }))
      ])
    ]),
    trigger('state', [
      transition('* => *', [
        style({ opacity: 0, transform: "translateY(100px)" }),
        animate(750, style({ opacity: 1, transform: "translateY(0)" }))
      ])
    ]),
  ]
})
export class IdentifyComponent implements AuthInnerComponentContract, OnInit {
  public isChecked = false;
  public isInProgress = false;
  public isTokenValid = false;
  public stateBus: BehaviorSubject<AuthStateEvent>;

  public accessToken:Token;

  public state = {
    isTokenSendInProgress: false,
    isSubmitInProgress: false,
    isFinished: false,
    location: null,
    title: {
      message: "Please Enter your Tablet Authentication Code",
      color: "",
      state: "normal"
    },
    description: "This code should be sent to the main Harvest account email: b*****@gm***.com",
  };

  public form:FormGroup;

  constructor(private deviceSvc:DeviceAuthenticationResource,
              private toastCtrl: ToastController,
              private viewSvc:LayoutViewService)
  {
    this.stateBus = new BehaviorSubject<AuthStateEvent>({type: "init", size: "wide"});
  }

  ngOnInit() {
    this.form = new FormGroup({
      "token": new FormControl("", [
        Validators.required,
        Validators.minLength(17),
        Validators.maxLength(17),
        regexpValidator(/^\w{2}-\d{4}-\d{4}-[\w\d]{4}$/),
      ])
    });

    this.form.valueChanges
      .subscribe(() => {
        if(!this.form.valid) {
          return false;
        }

        this.form.get("token").disable();

        this.isChecked = true;
        this.isInProgress = true;
        this.isTokenValid = true;
        this.isInProgress = false;
        this.state.title.state = "error";

        // this.tokenSvc.getAccessToken(this.token)
        //   .subscribe(
        //     (data) => {
        //       this.isTokenValid = true;
        //       this.isInProgress = false;
        //       this.state.title.state = "error";
        //       this.accessToken = data;
        //     },
        //     (error) => {
        //       this.state.title.message = "Invalid authentication token. Please try again.";
        //       this.state.title.state = "error";
        //       this.state.title.color = "assertive";
        //
        //       this.form.get("token").enable();
        //       this.isTokenValid = false;
        //       this.isInProgress = false;
        //     }
        //   );
      });
  }

  get token() {
    return _.upperCase(this.form.get("token").value.toString());
  }

  get stateIdentifier() {
    return (this.isInProgress) ?
      'loading' :
      ((this.isValid) ? 'valid' : 'error');
  }

  isValid() {
    return (!this.isInProgress && (this.isChecked && this.isTokenValid));
  }

  doResendIdentificationCode() {
    this.state.isTokenSendInProgress = true;

    this.deviceSvc.resendCode()
      .map((result) => {
        this.state.isTokenSendInProgress = false;
        return result;
      })
      .subscribe(
        (message) => {
          this.state.title.message = message;
          this.state.title.color = "calm";
        },
        (error) => {
          this.state.title.message = "Failed to request new code. Please try again later..";
          this.state.title.state = "error";
          this.state.title.color = "assertive";
        }
      );
  }

  doSaveCode() {
    this.state.isSubmitInProgress = true;

    this.deviceSvc.authenticate(this.token)
      .catch((error:Error) => {
        this.toastCtrl.create({
          message: error.message,
          position: "bottom"
        });

        return Observable.of(false)
      })
      .flatMap((isAuthenticated) => {
        if(isAuthenticated) {
          return this.deviceSvc.getActiveLocation(); 
        }

        return Observable.of(null);
      })
      .map(data => {
        if(data) {
          this.state.location = data;
        }
    
        this.state.isSubmitInProgress = false;
        this.state.isFinished = true;
      })
      .delay(1000)
      .subscribe(() => this.viewSvc.pushView(UserSelectComponent));
  }
}
