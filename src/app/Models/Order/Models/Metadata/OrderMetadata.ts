import {DeliveryInfo} from "../../../Delivery/DeliveryInfo";

export interface OrderMetadata {
  item_qty_total: number,
  item_skus_total: number,
  delivery_info: DeliveryInfo[]
}
