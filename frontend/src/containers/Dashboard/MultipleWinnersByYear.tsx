import useDashboardHook from "./useDashboardHook";
import Loading from "../../components/Loading";
import Table from "../../components/Table";

const MultipleWinnersByYear = () => {
  const {
    state: { cardYearsWithMultipleWinners },
  } = useDashboardHook();
  const { years, loading, error } = cardYearsWithMultipleWinners;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table
      columns={[
        { title: "Ano", dataIndex: "year", key: "year" },
        { title: "Vencedores", dataIndex: "winnerCount", key: "winnerCount" },
      ]}
      dataSource={years}
    />
  );
};

export default MultipleWinnersByYear;
