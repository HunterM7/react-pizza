import React from 'react'
import ReactPaginate from 'react-paginate'

// Assets
import { arrowIcon } from 'assets/icons'

// Styles
import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number
  setCurrentPage: (page: number) => void
  pageCount: number
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  pageCount,
}) => (
  <ReactPaginate
    className={styles.wrapper}
    previousLabel={arrowIcon}
    nextLabel={arrowIcon}
    breakLabel="..."
    onPageChange={(e) => setCurrentPage(+e.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={pageCount}
    forcePage={currentPage - 1}
  />
)
