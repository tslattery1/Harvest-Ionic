import {IItemAlterations} from "../../Item/Models/Alterations/ITemAlterations";

export class ListChangeItemDTO {
  public options: IItemAlterations;

  constructor() {
    this.options = {
      query_alterations: {},
      query_rules: {}
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
