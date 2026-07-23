import GlobalWrapper from "./Global.style";
import Menu from "./components/Menu";
import AppRoutes from "./routes";

function App() {
  return (
    <GlobalWrapper>
      <Menu />
      <main className="app-content">
        <AppRoutes />
      </main>
    </GlobalWrapper>
  );
}

export default App;
