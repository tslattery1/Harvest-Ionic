import {Component, ElementRef, HostListener} from "@angular/core";
import * as Tether from "tether";

@Component({
  selector: "help-button",
  templateUrl: "./template.html"
})
export class HelpComponent {
  public isPopupActivated:boolean = false;
  private popup;

  constructor(private elRef:ElementRef) {}

  ngOnInit() {
    this.popup = new Tether({
      element: this.elRef.nativeElement.querySelector("#helpHeaderPopup"),
      attachment: 'top center',
      targetAttachment: 'bottom center',
      target: this.elRef.nativeElement,
      targetOffset: '25px 0'
    });
  }

  @HostListener('document:click', ["$event.target"])
  onClickOutside(target) {
    const clickedInside = this.elRef.nativeElement.contains(target);

    if (!clickedInside && this.isPopupActivated) {
      this.doTogglePopup();
    }
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

  doGoToCallback() {
    console.log("test");
  }
}
