import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'
import { arrowIcon } from '../../assets/icons'

type PaginationProps = {
	currentPage: number
	setCurrentPage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	setCurrentPage,
}) => (
	<ReactPaginate
		className={styles.wrapper}
		previousLabel={arrowIcon}
		nextLabel={arrowIcon}
		breakLabel='...'
		onPageChange={(e) => setCurrentPage(+e.selected + 1)}
		pageRangeDisplayed={4}
		pageCount={3}
		forcePage={currentPage - 1}
	/>
)
