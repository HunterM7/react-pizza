import React from 'react'
import ReactPaginate from 'react-paginate'
import { arrowIcon } from '../../assets/icons'

import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, setCurrentPage }) => {
	return (
		<ReactPaginate
			className={styles.wrapper}
			previousLabel={arrowIcon}
			nextLabel={arrowIcon}
			breakLabel='...'
			onPageChange={(e) => setCurrentPage(+e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
			renderOnZeroPageCount={null}
		/>
	)
}
export default Pagination
