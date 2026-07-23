import SelectCustom from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";

import type { FilterMoviesState } from "./hooks/types";

const winnerOptions = [
  { value: "true", label: "Vencedores" },
  { value: "false", label: "Não Vencedores" },
];

interface FilterMoviesProps {
  state: FilterMoviesState;
  onChange: (value: string, key: string) => void;
  clearFilters: () => void;
}

const FilterMovies = ({ state, onChange, clearFilters }: FilterMoviesProps) => {
  return (
    <Card>
      <Input
        placeholder="Filtre por ano"
        style={{ marginRight: "10px" }}
        value={state.year}
        onChange={(e) => onChange(e.target.value, "year")}
      />
      <SelectCustom
        options={winnerOptions}
        placeholder="Filtre por vencedor"
        value={state.winner}
        onChange={(value) => onChange(value, "winner")}
      />
      <Button type="default" style={{ marginLeft: "10px" }} onClick={clearFilters}>
        Limpar filtros
      </Button>
    </Card>
  );
};

export default FilterMovies;
