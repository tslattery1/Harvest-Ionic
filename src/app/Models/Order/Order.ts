import { OrderItemStatus } from "./Models/Item/OrderItem";

export interface OrderStatus {
  id: number,
  name: string
}

export interface Order {
  id: number,
  order_token: string,
  price: number,
  status: OrderStatus,
  order_type: string
}