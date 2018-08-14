import { Component, Input, OnInit } from "@angular/core";
import { OrderResource } from "../../../../../app/Resources/Models/Order/OrderResource";
import { OrderItem } from "../../../../../app/Models/Order/Models/Item/OrderItem";

@Component({
    selector: "ordered-items-list",
    templateUrl: "./template.html"
})
export class SubmitedItemListComponent implements OnInit {
    @Input() orderId:number;

    public items:OrderItem[] = [];;

    public cols = [
        { field: 'sku_quantity', header: 'QTY' },
        { field: 'name', header: 'Item' },
        { field: 'seller_name', header: 'Selected Supplier' },
        { field: '', header: 'Quality Options' },
        { field: '', header: 'Added by' },
        { field: 'price', header: 'Network Price' },
        { field: 'item_subtotal', header: 'Subtotal' }
    ]

    public state = {
        isReady: false
    }

    constructor(private orderSvc:OrderResource) {}

    ngOnInit() {
        this.orderSvc.getItems(this.orderId)
            .subscribe(items => {
                this.state.isReady = true;
                this.items = items;
            }) 
    }    
}