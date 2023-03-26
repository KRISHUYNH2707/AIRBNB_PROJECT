export interface Content<C> {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords?: any;
  data: C[];
}
