import {Order} from "../../../Models/Order/Order";
import {Injectable} from "@angular/core";
import {TokenAwareRemoteResource} from "../../TokenAwareRemoteResource";
import {Observable} from "rxjs/Observable";
import {Delivery} from "../../../Models/Delivery/Delivery";
import {OrderDetailed} from "../../../Models/Order/OrderDetailed";
import {Cart} from "../../../Models/Cart/Cart";
import {OrderItem} from "../../../Models/Order/Models/Item/OrderItem";

@Injectable()
export class OrderResource extends TokenAwareRemoteResource<Order> {
  all():Observable<Order[]> {
    return this.withAuth()
      .perform("GET", "/orders");
  }

  get(id:number):Observable<OrderDetailed> {
    return this.withAuth()
      .perform("GET", `/orders/${id}`);
  }

  remove(id: number):Observable<string> {
    return this.withAuth()
      .perform("DELETE", `/orders/${id}`)
      .map(result => {
        return result["success"];
      });
  }

  setEditState(id:number):Observable<Cart> {
    return this.withAuth()
      .perform("GET", `/orders/${id}/edit`);
  }

  getItems(id:number):Observable<OrderItem[]> {
    return this.withAuth()
      .perform("GET", `/orders/${id}/items`);
  }

  getItem(id:number, itemId:number):Observable<OrderItem> {
    return this.withAuth()
      .perform("GET", `/orders/${id}/items/${itemId}`);
  }

  getDeliveries(id:number):Observable<Delivery[]> {
    return this.withAuth()
      .perform("GET", `/orders/${id}/deliveries`);
  }

  getDelivery(id:number, deliveryId:number):Observable<Delivery> {
    return this.withAuth()
      .perform("GET", `/orders/${id}/deliveries/${deliveryId}`);
  }
}
