import {Toggle} from "ionic-angular";
import {Component, Input, ViewEncapsulation} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: "labeled-toggle",
  templateUrl: "./template.html",
  host: {
    '[class.toggle-labeled]': 'true',
    '[class.toggle-disabled]': '_disabled',
    '[class.toggle-checked]': '_value',
    '[class.toggle-activated]': '_activated',
  },
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: Toggle, multi: true }],
  encapsulation: ViewEncapsulation.None,
})
export class ToggleWithLabelsComponent extends Toggle {
  @Input() public yesLabel = "yes";
  @Input() public noLabel = "no";
}
