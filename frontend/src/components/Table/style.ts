import styled from "styled-components";

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 2px 2px 10px #cecece;
  background: #fff;

  thead {
    tr {
      th:first-child {
        border-top-left-radius: 4px;
      }
      th:last-child {
        border-top-right-radius: 4px;
      }
    }
  }
  tbody {
    tr {
      td {
        border-bottom: 1px solid #ccc;
      }

      &:last-child {
        td {
          border-bottom: none;
        }
      }
    }
  }

  th {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-size: 14px;
  }

  td {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
  }
`;

export default TableWrapper;
