/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'

import { postTask, patchTask } from '../../app/axiosReqest'
import { formatDate } from '../../features/formatDate'
import { changeFilters, UpdateFilter } from '../../pages/Home/model/taskSlice'

export const TaskFormDialog = ({
	open,
	setOpen,
	setFormData,
	formData,
	isEditing,
	handleToggleButton,
	errors,
	setErrors,
}) => {
	const dispatch = useDispatch()
	const handlePostTask = () => {
		const newErrors = {
			title: !formData.title || formData.title.trim() === '',
			dateEnd: !formData.dateEnd || formData.dateEnd === 'Invalid Date' || formData.dateEnd === 'NaN undefined NaN',
		}

		if (newErrors.title || newErrors.dateEnd) {
			setErrors(newErrors)
			return
		}
		const getCurrentFormattedDate = () => formatDate(new Date())
		const taskDataToSend = {
			...formData,
			dateCreate: getCurrentFormattedDate(),
			createdAt: isEditing ? formData.createdAt : new Date().toISOString(),
			dateEnd: formatDate(formData.dateEnd),
		}

		if (isEditing) {
			dispatch(patchTask(taskDataToSend))
		} else {
			dispatch(postTask(taskDataToSend))
		}
		setOpen(false)
		dispatch(changeFilters('Сначала новые'))
		dispatch(UpdateFilter())
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))

		setErrors(prevErrors => ({
			...prevErrors,
			[name]: !value || value === 'Invalid Date',
		}))
	}
	return (
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
	)
}
