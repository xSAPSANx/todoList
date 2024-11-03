import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MainProviders } from './src/app/providers'
import { BrowserRouter } from 'react-router-dom'
import 'normalize.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<MainProviders />
		</BrowserRouter>
	</StrictMode>
)
