import styled from "styled-components";

export const MenuContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #f5f5f5;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
    display: flex;
    justify-content: center;

    li {
      a {
        display: flex;
        padding: 20px;
        color: #222;
        text-decoration: none;
      }

      &: hover {
        background: #222;
        a {
          color: #fff;
        }
      }
    }
  }
`;

export default MenuContainer;
