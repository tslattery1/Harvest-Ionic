import {IItemAlterations} from "../../Item/Models/Alterations/ITemAlterations";
import {ListItem} from "../ListItem";

export class ListCreateItemDTO {
  public product_id:number;
  public options: IItemAlterations;

  constructor(item:ListItem, options:IItemAlterations = null) {
    this.product_id = item.id;

    if(options) {
      this.options = options;
    } else {
      this.options = {
        query_alterations: {},
        query_rules: {}
      };
    }
  }

  addAlteration(name: string, rule: string) {
    this.options.query_alterations[name] = rule;
    return this;
  }

  addRule(name: string, rule: string) {
    this.options.query_rules[name] = rule;
    return this;
  }
}
