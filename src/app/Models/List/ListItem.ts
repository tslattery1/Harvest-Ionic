import { Item } from "../Item/Item";

export interface ItemLivePrice {
  price: number,
  priced_by: string,
  txt: string
}

export interface ListItem extends Item {
  rules_summary: string,
  shopping_list_id: number,
  base_category_id: number,
  list_category_safe_name: string,
  live_price: ItemLivePrice,
  increment_unit: string,
  increment_scalar: number,
  quality_indicator: string,
  sort_order: number
}
