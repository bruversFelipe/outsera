import type { Column } from "../../types/column";

export interface TableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
}
