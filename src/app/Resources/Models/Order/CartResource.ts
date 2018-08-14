import {TokenAwareRemoteResource} from "../../TokenAwareRemoteResource";
import {Cart} from "../../../Models/Cart/Cart";
import {Observable} from "rxjs/Observable";
import {CartItem} from "../../../Models/Cart/Models/Item/CartItem";
import {CardCreateItemDTO} from "../../../Models/Cart/DTOs/CardCreateItemDTO";
import {CartChangeItemDTO} from "../../../Models/Cart/DTOs/CartChangeItemDTO";
import {Injectable} from "@angular/core";

@Injectable()
export class CartResource extends TokenAwareRemoteResource<Cart> {
  all():Observable<Cart[]> {
    return this.withAuth()
      .perform("GET", "/carts");
  }

  get(id:number):Observable<Cart> {
    return this.withAuth()
      .perform("GET", `/carts/${id}`);
  }

  latest():Observable<Cart> {
    return this.withAuth()
      .perform("GET", "/carts/latest");
  }

  /**
   * Get reco
   * @param {number} id
   * @returns {Observable<number>}
   */
  recommendations(id:number):Observable<CartItem[]> {
    return this.withAuth()
      .perform("GET", `/carts/${id}/recommendations`)
      .map(result => {
        return result["recommendations"];
      });
  }

  /**
   * Submits the specified cart for order processing.
   * @param {number} id Submittable cart id
   * @returns {Observable<Cart>} Create order id
   */
  submit(id:number):Observable<number> {
    return this.withAuth()
      .perform("GET", `/carts/${id}/submit`)
      .map(result => {
        return result["order_id"];
      });
  }

  getCartItems(id:number):Observable<CartItem[]> {
    return this.withAuth()
      .perform("GET", `/carts/${id}/items`);
  }

  getItemInCart(id:number, cartItemId:number):Observable<CartItem> {
    return this.withAuth()
      .perform("GET", `/carts/${id}/items/${cartItemId}`);
  }

  editItemInCart(id:number, cartItemId:number, item:CartChangeItemDTO):Observable<CartItem> {
    return this.withAuth()
      .perform("PATCH", `/carts/${id}/items/${cartItemId}`, item);
  }

  removeItemFromCart(id:number, cartItemId:number):Observable<string> {
    return this.withAuth()
      .perform("DELETE", `/carts/${id}/items/${cartItemId}`)
      .map(result => {
        return result["success"];
      });
  }

  addItemToCart(id:number, item:CardCreateItemDTO):Observable<CartItem> {
    return this.withAuth()
      .perform("POST", `/carts/${id}/items`, item);
  }
}
