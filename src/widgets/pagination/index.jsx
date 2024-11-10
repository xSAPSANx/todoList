import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ui/pagination.module.scss'
import { checkNumPage } from '../../pages/Home/model/taskSlice'

export const Pagination = () => {
	const { updateFilter, totalPages, numPage } = useSelector(state => state.task)
	const dispatch = useDispatch()
	const location = useLocation()

	const getBackgroundClass = () => {
		switch (location.pathname) {
			case '/':
				return styles.homeBackground
			case '/TaskManager':
				return styles.taskManagerBackground
			default:
				return styles.notFoundBackground
		}
	}

	const handlePageClick = event => {
		dispatch(checkNumPage(event.selected + 1))
	}

	useEffect(() => {
		dispatch(checkNumPage(1))
	}, [dispatch, updateFilter])
	return (
		<div className={`${styles.root} ${getBackgroundClass()}`}>
			{numPage === totalPages && (
				<div className={styles.titleContainerEnd}>
					<div className={styles.titleEnd}>Конец списка</div>
				</div>
			)}
			<ReactPaginate
				forcePage={numPage - 1}
				breakLabel='...'
				nextLabel='>'
				previousLabel='<'
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={totalPages}
				renderOnZeroPageCount={null}
			/>
		</div>
	)
}
