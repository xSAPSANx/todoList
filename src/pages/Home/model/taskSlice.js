import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTask = createAsyncThunk('task/fetchTask', async () => {
	const { data } = await axios.get('http://localhost:3000/task')
	return data
})

// export const postProjects = createAsyncThunk('projects/postProjects', async updatedData => {
// 	const { data } = await axios.post('http://localhost:3000/projects', updatedData)
// 	return data
// })

// export const patchProjects = createAsyncThunk('projects/patchProjects', async updatedData => {
// 	const { data } = await axios.patch(`http://localhost:3000/projects/${updatedData.id}`, updatedData)
// 	return data
// })

// export const deleteProjects = createAsyncThunk('projects/deleteProjects', async id => {
// 	const { data } = await axios.delete(`http://localhost:3000/projects/${id}`)
// 	return data
// })

const initialState = {
	taskData: {
		items: [],
		status: 'loading',
	},
	taskUpdate: {
		value: 0,
	},
	projectClickID: {
		id: 0,
	},
}

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		increment(state) {
			state.projectsUpdate.value++
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
			//получение проектов
			.addCase(fetchTask.pending, state => {
				state.taskData.items = []
				state.taskData.status = 'loading'
			})
			.addCase(fetchTask.fulfilled, (state, action) => {
				state.taskData.items = action.payload
				state.taskData.status = 'loaded'
			})
			.addCase(fetchTask.rejected, state => {
				state.taskData.items = []
				state.taskData.status = 'error'
			})
		// //добавление проекта
		// .addCase(postProjects.pending, state => {
		// 	state.projectsOld.items = []
		// 	state.projectsOld.status = 'loading'
		// })
		// .addCase(postProjects.fulfilled, (state, action) => {
		// 	state.projectsOld.items = action.payload
		// 	state.projectsOld.status = 'loaded'
		// })
		// .addCase(postProjects.rejected, state => {
		// 	state.projectsOld.items = []
		// 	state.projectsOld.status = 'error'
		// })
		// //редактирование проекта
		// .addCase(patchProjects.pending, state => {
		// 	state.projectsOld.items = []
		// 	state.projectsOld.status = 'loading'
		// })
		// .addCase(patchProjects.fulfilled, (state, action) => {
		// 	state.projectsOld.items = action.payload
		// 	state.projectsUpdate.value++
		// 	state.projectsOld.status = 'loaded'
		// })
		// .addCase(patchProjects.rejected, state => {
		// 	state.projectsOld.items = []
		// 	state.projectsOld.status = 'error'
		// })
		// //удаление проекта
		// .addCase(deleteProjects.pending, state => {
		// 	state.projectsUpdate.value++
		// 	state.projectsOld.status = 'delete'
		// })
		// .addCase(deleteProjects.rejected, state => {
		// 	state.projectsOld.items = []
		// 	state.projectsOld.status = 'error delete'
		// })
	},
})

export const { increment, tabProjectHidden, projectClickID } = taskSlice.actions

export const taskReducer = taskSlice.reducer
