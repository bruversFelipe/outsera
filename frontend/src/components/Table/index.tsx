import type { TableProps } from "./types";

import TableWrapper from "./style";

function Table<T>({ columns, dataSource }: TableProps<T>) {
  return (
    <TableWrapper>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.length === 0 && (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: "center" }}>
              Nenhum registro encontrado
            </td>
          </tr>
        )}
        {dataSource.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render
                  ? column.render(
                      column.dataIndex ? row[column.dataIndex] : (undefined as never),
                      row,
                      index,
                    )
                  : column.dataIndex
                    ? String(row[column.dataIndex])
                    : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}

export default Table;
