import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Table from "../../../components/Table";
import { renderWithTheme } from "../../testUtils";
import type { Column } from "../../../types/column";

interface Row {
  id: number;
  name: string;
}

const columns: Column<Row>[] = [
  { key: "id", title: "Id", dataIndex: "id" },
  { key: "name", title: "Nome", dataIndex: "name" },
];

describe("Table", () => {
  it("renders the column headers", () => {
    renderWithTheme(<Table columns={columns} dataSource={[]} />);

    const headerRow = screen.getAllByRole("row")[0];
    expect(within(headerRow).getByText("Id")).toBeInTheDocument();
    expect(within(headerRow).getByText("Nome")).toBeInTheDocument();
  });

  it("renders one row per item in dataSource, reading each cell by dataIndex", () => {
    renderWithTheme(
      <Table
        columns={columns}
        dataSource={[
          { id: 1, name: "Studio A" },
          { id: 2, name: "Studio B" },
        ]}
      />,
    );

    expect(screen.getByText("Studio A")).toBeInTheDocument();
    expect(screen.getByText("Studio B")).toBeInTheDocument();
  });

  it('shows "Nenhum registro encontrado" when dataSource is empty', () => {
    renderWithTheme(<Table columns={columns} dataSource={[]} />);

    expect(screen.getByText("Nenhum registro encontrado")).toBeInTheDocument();
  });

  it("uses the column's render function instead of the raw value when provided", () => {
    const columnsWithRender: Column<Row>[] = [
      { key: "id", title: "Id", dataIndex: "id" },
      {
        key: "name",
        title: "Nome",
        dataIndex: "name",
        render: (value) => `#${String(value)}`,
      },
    ];

    renderWithTheme(
      <Table columns={columnsWithRender} dataSource={[{ id: 1, name: "Studio A" }]} />,
    );

    expect(screen.getByText("#Studio A")).toBeInTheDocument();
  });
});
