'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={selectedItem => onPageChange(selectedItem.selected + 1)}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
}
