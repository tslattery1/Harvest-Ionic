import {Component, ElementRef, HostListener, OnInit} from "@angular/core";
import {User} from "../../../../app/Models/User";
import {UserResource} from "../../../../app/Resources/Models/Users/UserResource";
import {NavController} from "ionic-angular";
import {AuthPage} from "../../../auth/auth.page";
import {DIRECTION_BACK} from "ionic-angular/navigation/nav-util";
import * as Tether from "tether";
import {SettingsComponent} from "../settings/settings.component";
import { LayoutViewService } from "../../../../app/Services/LayoutView/LayoutView.service";
// import * as Tether from "tether";

@Component({
  selector: "current-user",
  templateUrl: "./template.html"
})
export class CurrentUserComponent implements OnInit {
  public isPopupActivated:boolean = false;
  public user:User;
  public popup;

  constructor(private userResource:UserResource,
              private layoutSvc:LayoutViewService,
              private navCtl:NavController,
              private elRef:ElementRef) {}

  ngOnInit() {
    this.userResource.getActive()
      .subscribe((user) => {
        this.user = user;

        // Fix element input lag
        setTimeout(() => {
          this.popup = new Tether({
            element: this.elRef.nativeElement.querySelector("#userHeaderPopup"),
            attachment: 'top left',
            targetAttachment: 'bottom left',
            target: this.elRef.nativeElement,
            targetOffset: '25px -10px'
          });
        }, 10);
      });
  }

  doTogglePopup() {
    this.isPopupActivated = !this.isPopupActivated;

    let popupEl = this.popup.element;

    if(popupEl.classList.contains("active")) {
      popupEl.classList.remove("active");
    } else {
      popupEl.classList.add("active");
      this.popup.position();
    }

    return this;
  }

  @HostListener('document:click', ["$event.target"])
  onClickOutside(target) {
    const clickedInside = this.elRef.nativeElement.contains(target);

    if (!clickedInside && this.isPopupActivated) {
      this.doTogglePopup();
    }
  }

  doGoToSettings() {
    this.layoutSvc.pushView(SettingsComponent);
  }

  doLogUserOut() {
    this.userResource.logout()
      .subscribe(isLoggedOut => {
        if (isLoggedOut) {
          this.navCtl.setRoot(AuthPage, {animate: true, direction: DIRECTION_BACK})
        }
      });
  }
}
