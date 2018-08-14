import {Component, HostListener} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import {AuthPage} from "../boards/auth/auth.page";

@Component({
  templateUrl: 'layout.html',
})
export class AppComponent {
  rootPage:any = AuthPage;

  constructor(platform: Platform, statusBar: StatusBar) {
    platform.ready().then(() => {
      statusBar.styleBlackTranslucent();
    });

    // this.cache.setOfflineInvalidate(false);
  }

  @HostListener("document:paused")
  onBeingPaused() {
    // TODO: reset user authentication on being minimized
  }

  @HostListener("document:resume")
  onBeingResumed() {
    // TODO: display lock screen
  }
}

