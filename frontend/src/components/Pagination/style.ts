import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: transparent;
  margin-top: 20px;
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    button {
      margin: 0 5px;
      padding: 5px 10px;
      border: 1px solid #ccc;
      background: #fff;
      cursor: pointer;
    }

    button:disabled {
      cursor: not-allowed;
    }
    .active {
      background: ${({ theme }) => theme.colors.primary};
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    .pagination {
      flex-wrap: wrap;

      button {
        margin-top: 5px;
      }
    }
  }
`;

export default PaginationWrapper;
