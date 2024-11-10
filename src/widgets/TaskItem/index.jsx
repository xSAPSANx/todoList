/* eslint-disable react/prop-types */
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { formatDate } from '../../features/formatDate'
import styles from './ui/taskItem.module.scss'

export const TaskDayHome = ({ item, setFormData, setErrors, setOpen, setIsEditing }) => {
	const handleEditButton = task => {
		setFormData({
			...task,
			dateCreate: formatDate(task.dateCreate),
			dateEnd: formatDate(task.dateEnd),
		})
		setErrors({ title: false, dateEnd: false })
		setOpen(true)
		setIsEditing(true)
	}
	return (
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
	)
}
