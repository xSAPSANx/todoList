import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTask = createAsyncThunk('task/fetchTask', async () => {
	const { data } = await axios.get('http://localhost:3000/task')
	return data
})

export const postTask = createAsyncThunk('task/postTask', async updatedData => {
	const { data } = await axios.post('http://localhost:3000/task', updatedData)
	return data
})

export const patchTask = createAsyncThunk('task/patchTask', async updatedData => {
	const { data } = await axios.patch(`http://localhost:3000/task/${updatedData.id}`, updatedData)
	return data
})

export const patchTaskDone = createAsyncThunk('task/patchTaskDone', async updatedData => {
	const { data } = await axios.patch(`http://localhost:3000/task/${updatedData.id}`, updatedData)
	return data
})

export const deleteTask = createAsyncThunk('task/deleteTask', async id => {
	const { data } = await axios.delete(`http://localhost:3000/task/${id}`)
	return data
})

// Фильтрация
export const filterTaskTitle = createAsyncThunk('task/filterTaskTitle', async text => {
	const { data } = await axios.get(`http://localhost:3000/task?title_like=${text}`)
	return data
})

export const filterTasksState = createAsyncThunk('task/filterTasksState', async state => {
	const { data } = await axios.get(`http://localhost:3000/task?completed_like=${state}`)
	return data
})

export const filterTasksOld = createAsyncThunk('task/filterTasksOld', async () => {
	const { data } = await axios.get('http://localhost:3000/task?_sort=dateCreate&_order=desc')
	return data
})

const initialState = {
	taskData: {
		items: [],
		status: 'loading',
	},
	taskUpdate: {
		value: 0,
	},
	taskClickID: {
		id: 0,
	},
}

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		increment(state) {
			state.taskUpdate.value++
		},
		tabProjectHidden(state, action) {
			state.ProjectHidden.value = action.payload
		},
		projectClickID(state, action) {
			state.projectClickID.id = action.payload
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
				state.taskUpdate.value++
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
				state.taskUpdate.value++
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

export const { increment, tabProjectHidden, projectClickID } = taskSlice.actions

export const taskReducer = taskSlice.reducer
