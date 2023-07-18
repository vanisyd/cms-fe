export interface IPaginatedResponse<T> {
  data: Array<T>,
  meta: IResponseMeta
}

export interface IResponseMeta {
  current_page: number,
  from: number,
  last_page: number,
  per_page: number,
  to: number,
  total: number
}