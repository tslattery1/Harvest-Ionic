import { Component, Input, OnInit } from "@angular/core";
import { Cart } from "../../../../../app/Models/Cart/Cart";
import { CartResource } from "../../../../../app/Resources/Models/Order/CartResource";

@Component({
    selector: "cart-details",
    templateUrl: "./template.html"
})
export class CartDetailsComponent implements OnInit {
    @Input() id:number;
    public cart:Cart;
    public isReady:boolean = false;

    constructor(private cartSvc:CartResource) {}

    ngOnInit() {
        this.cartSvc.get(this.id)
            .subscribe((cart:Cart) => {
                this.isReady = true;
                this.cart = cart;
            });
    }
}