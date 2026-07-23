export interface Column<T> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}
