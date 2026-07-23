import Loading from "../../components/Loading";
import Table from "../../components/Table";

import type { ProducerInterval } from "../../types/producerInterval";
import type { Column } from "../../types/column";

import useDashboardHook from "./useDashboardHook";

const columns: Column<ProducerInterval>[] = [
  { title: "Produtor", dataIndex: "producer", key: "producer" },
  { title: "Intervalo", dataIndex: "interval", key: "interval" },
  { title: "Ano anterior", dataIndex: "previousWin", key: "previousWin" },
  { title: "Ano seguinte", dataIndex: "followingWin", key: "followingWin" },
];

const IntervalForProducers = () => {
  const {
    state: { cardIntervalForProducers },
  } = useDashboardHook();
  const { min, max, loading, error } = cardIntervalForProducers;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <strong style={style.strong}>Máximo</strong>
      <Table columns={columns} dataSource={max} />
      <div style={style.divider} />
      <strong style={style.strong}>Mínimo</strong>
      <Table columns={columns} dataSource={min} />
    </div>
  );
};

const style = {
  strong: {
    display: "block",
    marginBottom: "10px",
    fontSize: "12px",
  },
  divider: {
    margin: "20px 0",
    borderBottom: "1px solid #dedede",
  },
};

export default IntervalForProducers;
