export interface CartStatus {
  id: number;
  name: string
}

export interface Cart {
  id: number;
  cart_token: string,
  status: CartStatus,
  live_total: number,
  location_name: string,
  location_id: number,
  data: Object
}
