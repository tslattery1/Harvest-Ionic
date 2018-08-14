import {DeliveryInstruction} from "./Models/Instructions/DeliveryInstruction";

export interface DeliveryInfo {
  address_1: string,
  address_2: string,
  city: string,
  state_abbr: string,
  zip: number,
  deliveries_count: number,
  delivery_location: string,
  special_instructions: DeliveryInstruction[]
}
