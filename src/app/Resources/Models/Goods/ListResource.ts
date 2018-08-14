import {TokenAwareRemoteResource} from "../../TokenAwareRemoteResource";
import {List} from "../../../Models/List/List";
import {Observable} from "rxjs/Observable";
import {Item} from "../../../Models/Item/Item";
import {ListItem} from "../../../Models/List/ListItem";
import {ListChangeDTO} from "../../../Models/List/DTOs/ListChangeDTO";
import {ListCreateDTO} from "../../../Models/List/DTOs/ListCreateDTO";
import {ListCreateItemDTO} from "../../../Models/List/DTOs/ListCreateItemDTO";
import {ListChangeItemDTO} from "../../../Models/List/DTOs/ListChangeItemDTO";
import {Injectable} from "@angular/core";

@Injectable()
export class ListResource extends TokenAwareRemoteResource<List> {
  all():Observable<List[]> {
    return this.withAuth()
      .perform("GET", "/shopping_lists");
  }

  create(list:ListCreateDTO):Observable<List> {
    return this.withAuth()
      .perform("POST", "/shopping_lists", list);
  }

  get(id:number):Observable<List> {
    return this.withAuth()
      .perform("GET", `/shopping_lists/${id}`);
  }

  update(id:number, list:ListChangeDTO):Observable<List> {
    return this.withAuth()
      .perform("PATCH", `/shopping_lists/${id}`, list);
  }

  remove(id:number):Observable<string> {
    return this.withAuth()
      .perform("DELETE", `/shopping_lists/${id}`)
      .map((result:Object) => {
        return result["success"];
      });
  }

  itemsInList(id:number):Observable<ListItem[]> {
    return this.withAuth()
      .perform<ListItem[]>("GET", `/shopping_lists/${id}/items`);
  }

  itemInList(listId:number, itemId:number):Observable<ListItem> {
    return this.withAuth()
      .perform<ListItem>("GET", `/shopping_lists/${listId}/items/${itemId}`);
  }

  addItemInList(id:number, item:ListCreateItemDTO):Observable<List> {
    return this.withAuth()
      .perform("POST", `/shopping_lists/${id}/items`, item);
  }

  changeItemInList(listId:number, itemId:number, changes:ListChangeItemDTO):Observable<Item> {
    return this.withAuth()
      .perform("PATCH", `/shopping_lists/${listId}/items/${itemId}`, changes);
  }

  removeItemFromList(listId:number, itemId:number):Observable<string> {
    return this.withAuth()
      .perform("DELETE", `/shopping_lists/${listId}/items/${itemId}`)
      .map(result => {
        return result["success"];
      });
  }
}