import useDashboardHook from "./useDashboardHook";
import Loading from "../../components/Loading";
import Table from "../../components/Table";

const TopStudiosWinner = () => {
  const {
    state: { cardStudiosWithWinCount },
  } = useDashboardHook();
  const { studios, loading, error } = cardStudiosWithWinCount;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table
      columns={[
        { title: "Nome", dataIndex: "name", key: "name" },
        { title: "Quantidade", dataIndex: "winCount", key: "winCount" },
      ]}
      dataSource={studios}
    />
  );
};

export default TopStudiosWinner;
