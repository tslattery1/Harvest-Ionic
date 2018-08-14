import {Component, OnInit, Input} from "@angular/core";
import {OrderResource} from "../../../../../app/Resources/Models/Order/OrderResource";
import { LoadingController } from "ionic-angular";
import { OrderDetailed } from "../../../../../app/Models/Order/OrderDetailed";

@Component({
  selector: "order-view",
  templateUrl: "./template.html"
})
export class OrderViewComponent implements OnInit {
  @Input() id:number;

  public order:OrderDetailed;
  public isReady:boolean = false;

  constructor(private orderService:OrderResource, private loadingCtrl:LoadingController) {
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: "Loading order data"
    });

    loading.present();

    this.orderService.get(this.id)
        .subscribe((order) => {
          this.order = order;
          this.isReady = true;

          loading.dismiss();
        })
  }
}
