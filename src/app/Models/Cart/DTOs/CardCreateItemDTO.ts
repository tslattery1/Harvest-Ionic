import {IItemAlterations} from "../../Item/Models/Alterations/ITemAlterations";
import {ListCreateItemDTO} from "../../List/DTOs/ListCreateItemDTO";
import {CartItem} from "../Models/Item/CartItem";

export class CardCreateItemDTO extends ListCreateItemDTO {
  public ShoppingListItem: number;
  public options: IItemAlterations;

  constructor(item:CartItem, options:IItemAlterations = null) {
    super(item, options);
    this.ShoppingListItem = item.shopping_list_id;
  }
}
