/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'

import styles from './ui/index.module.scss'
import { deleteTask, patchTaskDone } from '../../pages/Home/model/taskSlice'

export const TaskCard = ({ item }) => {
	const dispatch = useDispatch()
	const [isCompleted, setIsCompleted] = useState(item.completed)

	const toggleCompleted = () => {
		// Создаем обновленный объект задачи
		const updatedTask = {
			...item,
			completed: !isCompleted,
		}

		dispatch(patchTaskDone(updatedTask))
		setIsCompleted(prev => !prev)
	}

	const handleDelete = () => {
		const deleteConfirmed = window.confirm(`Удалить задачу: ${item.title}`)
		if (deleteConfirmed) {
			dispatch(deleteTask(item.id))
		}
	}

	return (
		<div className={styles.dayCard}>
			<div className={styles.dataCreate}>Создано: {item.dateCreate}</div>
			<h2 className={styles.dayTitle}>{item.title}</h2>
			<div className={styles.dataEnd}>Завершить: {item.dateEnd}</div>
			<div className={styles.taskDescription}>{item.description}</div>
			<div className={styles.footerCard}>
				<IconButton onClick={toggleCompleted} className={styles.circleButton}>
					{isCompleted && <CheckIcon />}
				</IconButton>
				<IconButton onClick={handleDelete} className={styles.deleteButton}>
					<DeleteIcon />
				</IconButton>
			</div>
		</div>
	)
}
