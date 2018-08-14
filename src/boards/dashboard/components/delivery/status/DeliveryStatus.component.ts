import {Component, Input} from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "delivery-status",
  templateUrl: "./template.html"
})
export class DeliveryStatusComponent {
  @Input() status = [];
  public date = moment();

  constructor() {}

  isArrivingToday():boolean {

    for (let i = 0; i < this.status.length; i++) {
      // let id = this.deliveries[i];
      // let delivery = self.deliveryById(id);
      // if(moment(delivery.delivery_date).isBetween(moment().startOf('day'), moment().add(1, 'day').endOf('day'))){
      //   return true;
      // }
    }

    return false;
  }

  isTodayDeliveriesComplete():boolean {
    // todayDeliveries = self.todayDeliveries();
    // for (var i = 0; i < todayDeliveries.length; i++) {
    //   var delivery = todayDeliveries[i];
    //   if(Object.keys(delivery.delivery_status)[0] < 3){
    //     return false;
    //   }
    // }
    return true;
  }
}
