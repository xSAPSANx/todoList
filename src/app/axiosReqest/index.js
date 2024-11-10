import axios from 'axios'
import { setTotalPages } from '../../pages/Home/model/taskSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'

function calcNumPage(response, dispatch) {
	const totalCount = parseInt(response.headers['x-total-count'], 10)
	const pageCount = Math.ceil(totalCount / 15)
	dispatch(setTotalPages(pageCount))
}

export const fetchTask = createAsyncThunk('task/fetchTask', async (numPage, thunkAPI) => {
	const response = await axios.get(`http://localhost:3000/task?_sort=createdAt&_order=desc&_page=${numPage}&_limit=15`)
	calcNumPage(response, thunkAPI.dispatch)

	return response.data
})

export const postTask = createAsyncThunk('task/postTask', async updatedData => {
	const { data } = await axios.post('http://localhost:3000/task', updatedData)
	return data
})

//Создание,изменение,удаление

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

export const filterTaskTitle = createAsyncThunk('task/filterTaskTitle', async ({ text, numPage }, thunkAPI) => {
	const response = await axios.get(`http://localhost:3000/task?title_like=${text}&_page=${numPage}&_limit=15`)
	calcNumPage(response, thunkAPI.dispatch)
	return response.data
})

export const filterTasksState = createAsyncThunk('task/filterTasksState', async ({ state, numPage }, thunkAPI) => {
	const response = await axios.get(
		`http://localhost:3000/task?_sort=createdAt&_order=desc&completed_like=${state}&_page=${numPage}&_limit=15`
	)
	calcNumPage(response, thunkAPI.dispatch)
	return response.data
})

export const filterTasksOld = createAsyncThunk('task/filterTasksOld', async (numPage, thunkAPI) => {
	const response = await axios.get(`http://localhost:3000/task?_sort=createdAt&_order=asc&_page=${numPage}&_limit=15`)
	calcNumPage(response, thunkAPI.dispatch)
	return response.data
})
