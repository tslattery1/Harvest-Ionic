import {Component, Input} from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "order-status",
  templateUrl: "./template.html"
})
export class OrderStatusComponent {
  @Input() status;
  @Input() date;

  getTitle() {
    return _.first(_.values(this.status));
  }
}
