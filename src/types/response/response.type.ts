export interface Response {
  code: number;
  message: string;
  data: any;
}

export interface PaginationResponse {
  list: any[];
  totalPages: number;
  totalItems: number;
  pageSize: number;
  pageNumber: number;
}
