import type { PaginationProps } from "./types";

import PaginationWrapper from "./style";
import Button from "../Button";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages === null || totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          className={i === currentPage ? "active" : ""}
          type="default"
        >
          {i}
        </Button>,
      );
    }
    return pageNumbers;
  };

  return (
    <PaginationWrapper>
      <div className="pagination">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          type="default"
        >
          {"<"}
        </Button>
        {renderPageNumbers()}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          type="default"
        >
          {">"}
        </Button>
      </div>
      <small>
        Página {currentPage} de {totalPages}
      </small>
    </PaginationWrapper>
  );
};

export default Pagination;
