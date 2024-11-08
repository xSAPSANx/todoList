import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

import { FilterMenu } from '../filrersTask'
import { AlertError } from '../../features/errorAlert'
import { formatDate } from '../../features/formatDate'
import { generateRandomId } from '../../features/ganerateRandomId'
import { fetchTask, postTask, patchTask } from '../../pages/Home/model/taskSlice'
import styles from './ui/createTask.module.scss'

export const TodoCreate = () => {
	const dispatch = useDispatch()
	const { taskData, taskUpdate } = useSelector(state => state.task)

	const [open, setOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		id: '',
		title: '',
		dateEnd: '',
		description: '',
		completed: false,
		dateCreate: '',
	})

	const [errors, setErrors] = useState({
		title: false,
		dateEnd: false,
	})

	useEffect(() => {
		dispatch(fetchTask())
	}, [dispatch, taskUpdate])

	// Функция для отправки данных задачи на сервер
	const handlePostTask = () => {
		const newErrors = {
			title: !formData.title,
			dateEnd: !formData.dateEnd,
		}

		// Если есть ошибки, не отправляем данные
		if (newErrors.title || newErrors.dateEnd) {
			setErrors(newErrors)
			return
		}

		const taskDataToSend = {
			...formData,
			dateCreate: getCurrentFormattedDate(),
			dateEnd: formatDate(formData.dateEnd),
		}

		if (isEditing) {
			dispatch(patchTask(taskDataToSend))
		} else {
			dispatch(postTask(taskDataToSend))
		}
		setOpen(false)
	}

	// Функция для получения текущей даты в формате "1 Февраля 2024"
	const getCurrentFormattedDate = () => formatDate(new Date())

	// Открытие модального окна для новой задачи
	const handleToggleButton = () => {
		setOpen(prev => !prev)
		setFormData({
			id: generateRandomId(),
			title: '',
			dateEnd: '',
			description: '',
			completed: false,
			dateCreate: getCurrentFormattedDate(),
		})
		setErrors({ title: false, dateEnd: false }) // Сброс ошибок
		setIsEditing(false)
	}

	// Обработчик кнопки редактирования
	const handleEditButton = task => {
		setFormData({
			...task,
			dateCreate: formatDate(task.dateCreate),
			dateEnd: formatDate(task.dateEnd),
		})
		setOpen(true)
		setIsEditing(true)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))

		// Сброс ошибки при вводе данных
		setErrors(prevErrors => ({
			...prevErrors,
			[name]: !value, // Если поле пустое, оставляем ошибку
		}))
	}

	AlertError(taskData.status)

	return (
		<div className={styles.todoList}>
			<div className={styles.titleContainer}>
				<h1 className={styles.title}>Создание и редактирование задач</h1>
			</div>
			<FilterMenu />
			<div className={styles.schedule}>
				<div className={`${styles.dayCard} ${styles.addCard}`}>
					<IconButton onClick={handleToggleButton} className={styles.addButton}>
						<AddIcon fontSize='large' />
					</IconButton>
				</div>
				{Array.isArray(taskData.items) &&
					taskData.items
						.slice()
						.reverse()
						.map(item => (
							<div key={item.id} className={styles.dayCard}>
								<div className={styles.dataCreate}>Создано: {item.dateCreate}</div>
								<h2 className={styles.dayTitle}>{item.title}</h2>
								<div className={styles.dataEnd}>Завершить: {item.dateEnd}</div>
								<div className={styles.taskDescription}>{item.description}</div>
								<div className={styles.footerCard}>
									<IconButton onClick={() => handleEditButton(item)} className={styles.editButton}>
										<EditIcon />
									</IconButton>
								</div>
							</div>
						))}
			</div>

			<Dialog open={open} onClose={handleToggleButton}>
				<DialogTitle>{isEditing ? 'Редактировать задачу' : 'Создать новую задачу'}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						label='Заголовок'
						name='title'
						fullWidth
						variant='outlined'
						value={formData.title}
						onChange={handleChange}
						error={errors.title}
						helperText={errors.title && 'Заголовок обязателен для заполнения'}
					/>
					<TextField
						margin='dense'
						name='dateEnd'
						fullWidth
						variant='outlined'
						type='date'
						value={formData.dateEnd}
						onChange={handleChange}
						error={errors.dateEnd}
						helperText={errors.dateEnd && 'Дата завершения обязательна для заполнения'}
					/>
					<TextField
						margin='dense'
						label='Описание'
						name='description'
						fullWidth
						variant='outlined'
						multiline
						rows={3}
						value={formData.description}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleToggleButton} color='primary'>
						Отмена
					</Button>
					<Button onClick={handlePostTask} color='primary'>
						{isEditing ? 'Сохранить изменения' : 'Создать'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
