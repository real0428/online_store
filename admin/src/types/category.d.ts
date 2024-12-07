export interface Category {
  type_id: number
  name: string
  owner_id?:number 
  parent_id?:number
  parent_name?:string
  [propName: string]: any
}
