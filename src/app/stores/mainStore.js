import { configureStore } from '@reduxjs/toolkit'
import { taskReducer } from '../../pages/Home/model/taskSlice'

export const mainStore = configureStore({
	reducer: {
		task: taskReducer,
	},
})
