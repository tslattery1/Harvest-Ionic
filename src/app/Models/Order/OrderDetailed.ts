import {Order} from "./Order";
import {OrderItem} from "./Models/Item/OrderItem";
import {OrderMetadata} from "./Models/Metadata/OrderMetadata";

export interface OrderDetailed extends Order {
  invoice_id: number;
  location_id: number;
  location_name: string;
  order_metadata: OrderMetadata,
  data: Object,
  order_items: OrderItem[]
}
