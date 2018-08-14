import { Component, Input, OnInit } from "@angular/core";
import { OrderResource } from "../../../../../app/Resources/Models/Order/OrderResource";
import { Delivery } from "../../../../../app/Models/Delivery/Delivery";

@Component({
    selector: "delivery-list",
    templateUrl: "./template.html"
})
export class DeliveryListComponent implements OnInit {
    @Input() orderId:number;

    public deliveries: Delivery[] = [];

    public cols = [
        { field: 'arrival', header: 'Arrival' },
        { field: 'id', header: 'Delivery ID' },
        { field: 'supplier_name', header: 'Supplier' },
        { field: 'item_count', header: 'Items' },
        { field: 'status', header: 'Status' }
    ]

    public state = {
        isReady: false
    }

    constructor(private orderSvc:OrderResource) {}

    ngOnInit() {
        this.orderSvc.getDeliveries(this.orderId)
            .subscribe(deliveries => {
                // this.state.isReady = true;
                this.deliveries = deliveries;
            }) 
    }    
}