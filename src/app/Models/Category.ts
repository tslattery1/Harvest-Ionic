export interface Category {
  id: number,
  safe_name: string,
  name: string,
  item_count: number,
  image_url: string
  parent_id?:number
  short_name?: string
}
