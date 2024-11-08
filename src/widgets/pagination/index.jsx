import ReactPaginate from 'react-paginate'

import styles from './ui/pagination.module.scss'

export const Pagination = () => {
	const handlePageClick = event => {
		console.log(event)
	}
	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel='...'
				nextLabel='>'
				previousLabel='<'
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={3}
				renderOnZeroPageCount={null}
			/>
		</>
	)
}
