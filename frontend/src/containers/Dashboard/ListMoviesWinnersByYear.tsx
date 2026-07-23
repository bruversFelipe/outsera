import { useState } from "react";

import Loading from "../../components/Loading";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Input from "../../components/Input";

import ColumnsMovies from "../../utils/ColumnsMovies";

import useDashboardHook from "./useDashboardHook";

const ListMoviesWinnersByYear = () => {
  const [year, setYear] = useState(0);
  const {
    state: { cardWinnersByYear },
    loadWinnersByYear,
  } = useDashboardHook();
  const { winners, loading, error } = cardWinnersByYear;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value));
  };

  return (
    <>
      <div style={{ margin: "10px 0" }}>
        <Input placeholder="Pesquise por ano" onChange={onChange} type="number" />
        <Button
          type="primary"
          style={{ marginLeft: "10px" }}
          onClick={() => loadWinnersByYear(year)}
        >
          Buscar
        </Button>
      </div>
      <Table columns={ColumnsMovies} dataSource={winners} />
    </>
  );
};

export default ListMoviesWinnersByYear;
