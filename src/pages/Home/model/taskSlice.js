import { createSlice } from '@reduxjs/toolkit'
import {
	fetchTask,
	postTask,
	patchTask,
	patchTaskDone,
	deleteTask,
	filterTaskTitle,
	filterTasksState,
	filterTasksOld,
} from '../../../app/axiosReqest'

const initialState = {
	taskData: {
		items: [],
		status: 'loading',
	},
	numPage: 1,
	totalPages: 1,
	updateFilter: 0,
	taskUpdate: 0,
	stateFilters: 'Сначала новые',
}

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		checkNumPage(state, action) {
			state.numPage = action.payload
		},
		setTotalPages(state, action) {
			state.totalPages = action.payload
		},
		UpdateFilter(state) {
			state.updateFilter++
		},
		changeFilters(state, action) {
			state.stateFilters = action.payload
		},
	},
	extraReducers: builder => {
		builder
			// Получение задач
			.addCase(fetchTask.pending, state => {
				state.taskData.status = 'loading'
			})
			.addCase(fetchTask.fulfilled, (state, action) => {
				state.taskData.items = action.payload
				state.taskData.status = 'loaded'
			})
			.addCase(fetchTask.rejected, state => {
				state.taskData.status = 'error'
			})
			// Добавление задачи
			.addCase(postTask.pending, state => {
				state.taskData.status = 'loading'
			})
			.addCase(postTask.fulfilled, (state, action) => {
				state.taskData.items.push(action.payload)
				state.taskUpdate++
				state.taskData.status = 'loaded'
			})
			.addCase(postTask.rejected, state => {
				state.taskData.status = 'error'
			})

			// Редактирование задачи
			.addCase(patchTask.pending, state => {
				state.taskData.status = 'loading'
			})
			.addCase(patchTask.fulfilled, (state, action) => {
				const index = state.taskData.items.findIndex(task => task.id === action.payload.id)
				if (index !== -1) {
					state.taskData.items[index] = action.payload
				}
				state.taskUpdate++
				state.taskData.status = 'loaded'
			})
			.addCase(patchTask.rejected, state => {
				state.taskData.status = 'error'
			})

			// Отметка выполнения задачи
			.addCase(patchTaskDone.pending, state => {
				state.taskData.status = 'loading'
			})
			.addCase(patchTaskDone.fulfilled, (state, action) => {
				const index = state.taskData.items.findIndex(task => task.id === action.payload.id)
				if (index !== -1) {
					state.taskData.items[index] = action.payload
				}
				state.taskData.status = 'loaded'
			})
			.addCase(patchTaskDone.rejected, state => {
				state.taskData.status = 'error'
			})

			// Удаление задачи
			.addCase(deleteTask.pending, state => {
				state.taskData.status = 'delete'
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.taskData.items = state.taskData.items.filter(task => task.id !== action.meta.arg)
			})
			.addCase(deleteTask.rejected, state => {
				state.taskData.status = 'error'
			})
			// Фильтрация по заголовку
			.addCase(filterTaskTitle.pending, state => {
				state.taskData.status = 'loading'
			})
			.addCase(filterTaskTitle.fulfilled, (state, action) => {
				state.taskData.items = action.payload
				state.taskData.status = 'loaded'
			})
			.addCase(filterTaskTitle.rejected, state => {
				state.taskData.status = 'error'
			})
			// Фильтрация по состоянию
			.addCase(filterTasksState.pending, state => {
				state.taskData.status = 'loading'
			})
			.addCase(filterTasksState.fulfilled, (state, action) => {
				state.taskData.items = action.payload
				state.taskData.status = 'loaded'
			})
			.addCase(filterTasksState.rejected, state => {
				state.taskData.status = 'error'
			})
			// Фильтрация сначала старые
			.addCase(filterTasksOld.pending, state => {
				state.taskData.status = 'loading'
			})
			.addCase(filterTasksOld.fulfilled, (state, action) => {
				state.taskData.items = action.payload
				state.taskData.status = 'loaded'
			})
			.addCase(filterTasksOld.rejected, state => {
				state.taskData.status = 'error'
			})
	},
})

export const { checkNumPage, setTotalPages, UpdateFilter, changeFilters } = taskSlice.actions

export const taskReducer = taskSlice.reducer
