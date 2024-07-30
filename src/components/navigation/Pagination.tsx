import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const handlePrevious = () => {
    if (props.page > 1) {
      props.onPageChange(props.page - 1);
    }
  };

  const handleNext = () => {
    if (props.page < props.totalPages) {
      props.onPageChange(props.page + 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrevious} disabled={props.page === 1}>
        Previous
      </button>
      <span>{`Page ${props.page} of ${props.totalPages}`}</span>
      <button onClick={handleNext} disabled={props.page === props.totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
