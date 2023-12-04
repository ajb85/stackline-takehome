export type KeyExtractor<RowData> = (params: RowData) => string | number;

export type TablePagination = {
  initialState: { page: number; pageSize: number };
  sizeOptions?: number[];
};

export type TableColumn<RowData> = {
  field: keyof RowData;
  label: string;
  width: number;
  sortable?: boolean;
  filter?: (value: string) => boolean;
  formatCell?: (value: string | number) => string | number;
};

export type TableProps<RowData> = {
  columns: TableColumn<RowData>[];
  rows: RowData[];
  pagination: TablePagination;
};
