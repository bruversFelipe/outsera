import styled from "styled-components";

const GlobalWrapper = styled.div`
  height: 100vh;
  overflow: hidden;

  .app-content {
    padding: 20px;
    background-color: #e9e9e9;
    height: calc(100vh - 60px);
    overflow-y: scroll;
  }
`;

export default GlobalWrapper;
