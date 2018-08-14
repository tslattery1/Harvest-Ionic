import { Component, Input, OnInit } from "@angular/core";
import { OrderResource } from "../../../../../app/Resources/Models/Order/OrderResource";
import { Delivery } from "../../../../../app/Models/Delivery/Delivery";

@Component({
    selector: "delivery-map",
    templateUrl: "./template.html"
})
export class DeliveryMapComponent implements OnInit {
    @Input() orderId:number;

    public deliveries: Delivery[] = [];

    public state = {
        isReady: false
    }

    constructor(private orderSvc:OrderResource) {}

    ngOnInit() {
        this.orderSvc.getDeliveries(this.orderId)
            .subscribe(deliveries => {
                this.state.isReady = true;
                this.deliveries = deliveries;
            }) 
    }    
}