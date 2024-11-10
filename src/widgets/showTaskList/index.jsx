import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import styles from './ui/showTask.module.scss'
import { fetchTask, filterTasksOld, filterTasksState } from '../../app/axiosReqest'
import { AlertError } from '../../features/errorAlert'
import { TaskCard } from '../taskCard'
import { FilterMenu } from '../filrersTask'

export const TodoList = () => {
	const dispatch = useDispatch()
	const { taskData, taskUpdate, numPage, stateFilters } = useSelector(state => state.task)

	useEffect(() => {
		if (stateFilters === 'Сначала новые') {
			dispatch(fetchTask(numPage))
		} else if (stateFilters === 'Сначала старые') {
			dispatch(filterTasksOld(numPage))
		} else if (stateFilters === 'Выполненные') {
			dispatch(filterTasksState({ state: true, numPage: numPage }))
		} else if (stateFilters === 'Не выполненные') {
			dispatch(filterTasksState({ state: false, numPage: numPage }))
		}
	}, [dispatch, taskUpdate, numPage, stateFilters])

	AlertError(taskData.status)

	return (
		<div className={styles.todoList}>
			<div className={styles.titleContainer}>
				<h1 className={styles.title}>Список задач</h1>
			</div>
			<FilterMenu />
			<div className={styles.schedule}>
				{Array.isArray(taskData.items) && taskData.items.map(item => <TaskCard key={item.id} item={item} />)}
			</div>
		</div>
	)
}
