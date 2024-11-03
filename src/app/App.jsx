import { Routes, Route } from 'react-router-dom'

import TaskManager from '../pages/TaskManager'
import { Home } from '../pages/Home'
import { Header } from '../widgets/Header'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/TaskManager' element={<TaskManager />} />
			</Routes>
		</>
	)
}

export default App
