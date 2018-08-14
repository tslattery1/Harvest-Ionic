import {Item} from "../../../Item/Item";

export interface OrderItemStatus {
  id: number,
  name: string
}

export interface OrderItem extends Item {
  sku_quantity: number,
  price: number,
  item_subtotal: number,
  seller_name: string,
  status: OrderItemStatus,
  customer_fee_amount: number,
  supplier_fee_amount: number,
  sort_order: number,
}
