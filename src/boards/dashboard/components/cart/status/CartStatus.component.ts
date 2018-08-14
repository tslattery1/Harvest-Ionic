import { Component, Input } from "@angular/core";

@Component({
    selector: "cart-status",
    templateUrl: "./template.html"
})
export class CartStatusComponent {
    @Input() status;

    toClassName(status:string) {
        return status.replace(" ", "_");
    }
}