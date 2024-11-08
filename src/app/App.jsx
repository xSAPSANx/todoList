import { Routes, Route } from 'react-router-dom'

import TaskManager from '../pages/TaskManager'
import { Home } from '../pages/Home'
import { Header } from '../widgets/Header'
import { NotFound } from '../pages/notFoundPage'
import { Pagination } from '../widgets/pagination'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/TaskManager' element={<TaskManager />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Pagination />
		</>
	)
}

export default App
