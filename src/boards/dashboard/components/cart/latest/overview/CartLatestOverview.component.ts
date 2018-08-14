import { Component, OnInit } from "@angular/core";
import { CartResource } from "../../../../../../app/Resources/Models/Order/CartResource";
import { Cart } from "../../../../../../app/Models/Cart/Cart";
import { OrderResource } from "../../../../../../app/Resources/Models/Order/OrderResource";
import { Order } from "../../../../../../app/Models/Order/Order";
import { Observable } from "../../../../../../../node_modules/rxjs";
import { LayoutViewService } from "../../../../../../app/Services/LayoutView/LayoutView.service";
import { OrderViewComponent } from "../../../orders/view/orderView.component";
import { CartWizardComponent } from "../../wizard/cartWizard.component";

@Component({
    selector: "cart-latest-overview",
    templateUrl: "./template.html"
})
export class CartLatestOverviewComponent implements OnInit {
    public isReady:boolean = false;

    public cart:Cart;
    public order:Order;

    constructor(private cartSvc:CartResource, private orderSvc:OrderResource, private viewSvc:LayoutViewService) {}

    ngOnInit() {
        this.orderSvc.all()
            .map(orders => {
                return orders[0];
            })
            .switchMap(order => {
                this.order = order;

                if(!order) {
                    return this.cartSvc.latest();
                }

                return Observable.of(null);
            })
            .subscribe(cart => {
                this.cart = cart;
                this.isReady = true;
            })
    }

    doSwitchPage(page:string, id?:number) {
        switch(page) {
            case "order":
                return this.viewSvc.pushView(OrderViewComponent, {id: id});

            case "cart":
                if(id) {
                    return this.viewSvc.pushView(CartWizardComponent, {id: id, step: 3});
                } else {
                    return this.viewSvc.pushView(CartWizardComponent);
                }
        }
    }
}