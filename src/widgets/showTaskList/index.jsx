import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import styles from './ui/showTask.module.scss'
import { fetchTask } from '../../pages/Home/model/taskSlice'
import { AlertError } from '../../features/errorAlert'
import { TaskCard } from '../taskCard'
import { FilterMenu } from '../filrersTask'

export const TodoList = () => {
	const dispatch = useDispatch()
	const { taskData, taskUpdate } = useSelector(state => state.task)

	useEffect(() => {
		dispatch(fetchTask())
	}, [dispatch, taskUpdate])

	AlertError(taskData.status)

	return (
		<div className={styles.todoList}>
			<div className={styles.titleContainer}>
				<h1 className={styles.title}>Список задач</h1>
			</div>
			<FilterMenu />
			<div className={styles.schedule}>
				{Array.isArray(taskData.items) &&
					taskData.items
						.slice()
						.reverse()
						.map(item => <TaskCard key={item.id} item={item} />)}
			</div>
		</div>
	)
}
