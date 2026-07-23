import styled from "styled-components";

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0 50px;

  .row {
    display: flex;
    flex: 1;
    gap: 20px;
    margin-top: 20px;

    > div {
      flex: 1;
    }
  }

  @media (max-width: 1100px) {
    .row {
      flex-direction: column;
    }
  }
`;

export default DashboardWrapper;
