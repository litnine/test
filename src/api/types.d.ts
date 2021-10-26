export interface PagingParams {
  page?: number;
  size?: number;
}

export interface PagingResult<T> {
  total: number;
  list: T[];
}
