import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './ui/filterTask.module.scss'

import { filterTaskTitle, fetchTask, filterTasksOld, filterTasksState } from '../../pages/Home/model/taskSlice'

export const FilterMenu = () => {
	const dispatch = useDispatch()
	const [filter, setFilter] = useState('Сначала новые')
	const [titleSearch, setTitleSearch] = useState('')

	const handleFilterChange = selectedFilter => {
		setFilter(selectedFilter)
		if (selectedFilter !== 'По заголовку') {
			setTitleSearch('')
			if (selectedFilter === 'Сначала новые') {
				dispatch(fetchTask())
			} else if (selectedFilter === 'Сначала старые') {
				dispatch(filterTasksOld())
			} else if (selectedFilter === 'Выполненные') {
				dispatch(filterTasksState(true))
			} else if (selectedFilter === 'Не выполненные') {
				dispatch(filterTasksState(false))
			}
		}
	}

	const handleTitleSearchChange = event => {
		const value = event.target.value
		setTitleSearch(value)

		if (value.trim() === '') {
			dispatch(fetchTask())
		} else {
			dispatch(filterTaskTitle(value))
		}
	}

	return (
		<div className={styles.filterMenu}>
			<span className={styles.filterLabel}>Фильтрация:</span>
			<div className={styles.filterContainer}>
				<div className={styles.dropdown}>
					<button className={styles.filterButton}>{filter}</button>
					<div className={styles.dropdownContent}>
						<div onClick={() => handleFilterChange('Сначала новые')}>Сначала новые</div>
						<div onClick={() => handleFilterChange('Сначала старые')}>Сначала старые</div>
						<div onClick={() => handleFilterChange('По заголовку')}>По заголовку</div>
						<div onClick={() => handleFilterChange('Выполненные')}>Выполненные</div>
						<div onClick={() => handleFilterChange('Не выполненные')}>Не выполненные</div>
					</div>
				</div>
				{filter === 'По заголовку' && (
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
