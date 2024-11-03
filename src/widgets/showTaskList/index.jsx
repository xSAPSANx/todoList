import { useDispatch, useSelector } from 'react-redux'
import { fetchTask } from '../../pages/Home/model/taskSlice'
import { useEffect } from 'react'

import './ui/showTaskList.scss'

export const TodoList = () => {
	const dispatch = useDispatch()
	const { taskData } = useSelector(state => state.task)

	useEffect(() => {
		dispatch(fetchTask())
	}, [])

	return (
		<div className='todo-list'>
			<h1 className='title'>Список задач</h1>
			<div className='schedule'>
				{taskData.items.map(item => (
					<div key={item.id} className='day-card'>
						<h2 className='day-title'>{item.title}</h2>
						<h2 className='data'>{item.data}</h2>
						<div className='task-description'>{item.description}</div>
						{item.completed ? <div className='task-done completed'></div> : <div className='task-done'></div>}
					</div>
				))}
			</div>
		</div>
	)
}
