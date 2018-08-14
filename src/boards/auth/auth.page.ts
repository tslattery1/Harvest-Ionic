import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {IdentifyComponent} from "./components/identify/IdentifyComponent";
import {transition, trigger, style, animate, state, query} from "@angular/animations";
import {AuthStateEvent, AuthStateBoxSizeTypes} from "./contracts/AuthInnerComponentContract";
import {AuthPageStateContract} from "./contracts/AuthPageStateContract";
import {SplashScreen} from "@ionic-native/splash-screen";
import {UserSelectComponent} from "./components/login/UserSelectComponent";
import { DeviceAuthenticationResource } from '../../app/Resources/Models/Auth/DeviceAuthenticationResource';
import { Platform } from 'ionic-angular';
import { LayoutViewService } from '../../app/Services/LayoutView/LayoutView.service';
import { BasicLayout } from '../../app/Support/Layout/BasicLayout';

const AUTH_BOX_WIDE_WIDTH = "90vw";
const AUTH_BOX_SMALL_WIDTH = "25vw";
const AUTH_BOX_DEFAULT_WIDTH = "50vw";

type BoxState = {
  state: string,
  size?: AuthStateBoxSizeTypes,
  classes?: string[]
}

@Component({
  selector: "auth-page",
  templateUrl: 'template.html',
  animations: [
    trigger('box', [
      transition('void => *', [
        query("#container", style({opacity: 0, transform: "scale(1.025, 1.025)"})),
        style({ opacity: 0, transform: "translateY(150px)" }),
        animate(500, style({ opacity: 1, transform: "translateY(0)" })),
        query("#container", animate('0.25s 0.1s ease-in-out', style({opacity: 1, transform: "scale(1,1)"})))
      ])
    ]),
    trigger('content', [
      state("appear", style({ display: "block" })),
      state("disappear", style({ display: "block" })),
      transition('* => disappear', [
        animate('0.25s 0.5s ease-in-out', style({ opacity: 0, transform: "scale(1.025, 1.025)" }))
      ]),
      transition('* => appear', [
        style({ opacity: 0, transform: "scale(1.25, 1.25)" }),
        animate('0.25s 0.5s ease-in-out', style({ opacity: 1, transform: "scale(1, 1)" }))
      ])
    ]),
    trigger('widen', [
      state("wide", style({ width: AUTH_BOX_WIDE_WIDTH })),
      state("small", style({ width: AUTH_BOX_SMALL_WIDTH })),
      state("normal", style({ width: AUTH_BOX_DEFAULT_WIDTH })),
      transition('* => wide', [
        animate('0.750s ease-in-out', style({ width: AUTH_BOX_WIDE_WIDTH }))
      ]),
      transition('* => small', [
        animate('0.750s ease-in-out', style({ width: AUTH_BOX_SMALL_WIDTH }))
      ]),
      transition('* => normal', [
        animate('0.750s ease-in-out', style({ width: AUTH_BOX_DEFAULT_WIDTH }))
      ])
    ])
  ]
})
export class AuthPage extends BasicLayout implements OnInit {
  public time;

  public box:BoxState = {
    state: "appear",
    size: "normal",
    classes: []
  };

  public state:AuthPageStateContract = {
    company: null,
    user: null
  };

  constructor(hostService:LayoutViewService,
              private platform:Platform,
              private deviceAuthSvc:DeviceAuthenticationResource,
              private splashScreen:SplashScreen) 
  {
    super(hostService);
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();

    this.viewSvc.stream()
      .switchMap(() => this.activeView.instance.stateBus)
      .subscribe(event => this.onEvent(<AuthStateEvent>event));
  }

  ngOnInit() {
    this.time = Observable.interval(10000)
      .startWith(0)
      .map(() => new Date);

    try {
      this.deviceAuthSvc.isAuthenticated()
        .subscribe((isAuthenticated: boolean) => {
          if (isAuthenticated) {
            this.switchView(UserSelectComponent);
          } else {
            this.switchView(IdentifyComponent);
          }

          this.platform.ready()
            .then(() => this.splashScreen.hide());
        });
    } catch (e) {
      console.warn(e);
    }
  }

  private onEvent(event:AuthStateEvent) {
    if(this.activeView) {
      this.box.state = "disappear";
    }

    switch(event.type) {
      case "init":
        this.box.state = "appear";
        break;

      case "success":
      case "fail":
      case "proceed":
        break;

      default:
        throw new Error('Undefined host event type');
    }

    if(event['size']) {
      this.box.size = event.size || "normal";
    }

    if(event['color']) {
      this.box.classes = [
        `box_${event['color']}`
      ];
    }
  } 
}
