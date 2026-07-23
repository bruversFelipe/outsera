import { NavLink } from "react-router-dom";

import MenuContainer from "./style";

function Menu() {
  return (
    <MenuContainer>
      <h2>Outsera</h2>
      <ul>
        <li>
          <NavLink to="/dashboard">Painel</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Listagem de Filmes</NavLink>
        </li>
      </ul>
    </MenuContainer>
  );
}

export default Menu;
