import Card from "../../components/Card";

import ListMoviesWinnersByYear from "./ListMoviesWinnersByYear";
import MultipleWinnersByYear from "./MultipleWinnersByYear";
import IntervalForProducers from "./IntervalForProducers";
import TopStudiosWinner from "./TopStudiosWinner";
import DashboardWrapper from "./style";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <div className="row">
        <Card title="Lista de anos com múltiplos vencedores">
          <MultipleWinnersByYear />
        </Card>
        <Card title="Top 3 estúdios vencedores">
          <TopStudiosWinner />
        </Card>
      </div>
      <div className="row">
        <Card title="Produtores com maior e menor intervalo entre vitórias">
          <IntervalForProducers />
        </Card>
        <Card title="Lista de filmes vencedores por ano">
          <ListMoviesWinnersByYear />
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
