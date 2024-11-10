import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ui/filterTask.module.scss'

import { filterTaskTitle, fetchTask } from '../../app/axiosReqest'
import { changeFilters, UpdateFilter } from '../../pages/Home/model/taskSlice'

export const FilterMenu = () => {
	const dispatch = useDispatch()
	const { numPage, stateFilters } = useSelector(state => state.task)
	const [titleSearch, setTitleSearch] = useState('')

	const handleFilterChange = selectedFilter => {
		dispatch(changeFilters(selectedFilter))
		dispatch(UpdateFilter())
		if (selectedFilter !== 'По заголовку') {
			setTitleSearch('')
		}
	}

	const handleTitleSearchChange = event => {
		const value = event.target.value
		setTitleSearch(value)

		if (value.trim() === '') {
			dispatch(fetchTask(numPage))
		} else {
			dispatch(filterTaskTitle({ text: value, numPage: numPage }))
		}
	}

	return (
		<div className={styles.filterMenu}>
			<span className={styles.filterLabel}>Фильтрация:</span>
			<div className={styles.filterContainer}>
				<div className={styles.dropdown}>
					<button className={styles.filterButton}>{stateFilters}</button>
					<div className={styles.dropdownContent}>
						<div onClick={() => handleFilterChange('Сначала новые')}>Сначала новые</div>
						<div onClick={() => handleFilterChange('Сначала старые')}>Сначала старые</div>
						<div onClick={() => handleFilterChange('По заголовку')}>По заголовку</div>
						<div onClick={() => handleFilterChange('Выполненные')}>Выполненные</div>
						<div onClick={() => handleFilterChange('Не выполненные')}>Не выполненные</div>
					</div>
				</div>
				{stateFilters === 'По заголовку' && (
					<input
						type='text'
						className={styles.titleInput}
						placeholder='Введите заголовок'
						value={titleSearch}
						onChange={handleTitleSearchChange}
					/>
				)}
			</div>
		</div>
	)
}
