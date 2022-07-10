import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

const Pagination = ({ setCurrentPage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			previousLabel='<'
			nextLabel='>'
			breakLabel='...'
			onPageChange={(e) => setCurrentPage(+e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			renderOnZeroPageCount={null}
		/>
	)
}
export default Pagination
