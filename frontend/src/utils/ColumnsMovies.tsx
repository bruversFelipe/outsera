import Tag from "../components/Tag";

import type { Movie } from "../types/movie";
import type { Column } from "../types/column";

const ColumnsMovies: Column<Movie>[] = [
  { key: "id", title: "Identificador", dataIndex: "id" },
  { key: "title", title: "Nome do filme", dataIndex: "title" },
  { key: "year", title: "Ano", dataIndex: "year" },
  {
    key: "studios",
    title: "Estúdios",
    dataIndex: "studios",
    render: (_value, row) =>
      row.studios.map((studio: string) => <Tag key={studio} color="#410d0e" text={studio} />),
  },
  {
    key: "producers",
    title: "Produtores",
    dataIndex: "producers",
    render: (_value, row) =>
      row.producers.map((producer: string) => (
        <Tag key={producer} color="#826633" text={producer} />
      )),
  },
  {
    key: "winner",
    title: "Vencedor",
    dataIndex: "winner",
    render: (value) => (value ? "Sim" : "Não"),
  },
];

export default ColumnsMovies;
