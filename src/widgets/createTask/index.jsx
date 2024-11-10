import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { TaskDayHome } from '../TaskItem'
import { TaskFormDialog } from '../modalCreateUpdate'
import { FilterMenu } from '../filrersTask'
import { AlertError } from '../../features/errorAlert'
import { formatDate } from '../../features/formatDate'
import { generateRandomId } from '../../features/ganerateRandomId'
import { fetchTask, filterTasksOld, filterTasksState } from '../../app/axiosReqest'
import styles from './ui/createTask.module.scss'
export const TodoCreate = () => {
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

	const [open, setOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		id: '',
		title: '',
		dateEnd: '',
		description: '',
		completed: false,
		dateCreate: '',
		createdAt: '',
	})

	const [errors, setErrors] = useState({
		title: false,
		dateEnd: false,
	})

	const getCurrentFormattedDate = () => formatDate(new Date())
	const handleToggleButton = () => {
		setOpen(prev => !prev)
		setFormData({
			id: generateRandomId(),
			title: '',
			dateEnd: '',
			description: '',
			completed: false,
			dateCreate: getCurrentFormattedDate(),
			createdAt: new Date().toISOString(),
		})
		setErrors({ title: false, dateEnd: false })
		setIsEditing(false)
	}

	AlertError(taskData.status)
	return (
		<div className={styles.todoList}>
			<div className={styles.titleContainer}>
				<h1 className={styles.title}>Управление задачами</h1>
			</div>
			<FilterMenu />
			<div className={styles.schedule}>
				<div className={`${styles.dayCard} ${styles.addCard}`}>
					<IconButton onClick={handleToggleButton} className={styles.addButton}>
						<AddIcon fontSize='large' />
					</IconButton>
				</div>
				{Array.isArray(taskData.items) &&
					taskData.items.map(item => (
						<TaskDayHome
							key={item.id}
							item={item}
							setFormData={setFormData}
							setErrors={setErrors}
							setOpen={setOpen}
							setIsEditing={setIsEditing}
						/>
					))}
			</div>

			<TaskFormDialog
				open={open}
				setOpen={setOpen}
				formData={formData}
				isEditing={isEditing}
				handleToggleButton={handleToggleButton}
				errors={errors}
				setErrors={setErrors}
				setFormData={setFormData}
			/>
		</div>
	)
}
