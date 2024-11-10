import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import styles from './ui/Header.module.scss'

import Container from '@mui/material/Container'

export const Header = () => {
	const location = useLocation()

	const getBackgroundColor = () => {
		switch (location.pathname) {
			case '/':
				return '#97cba9'
			case '/TaskManager':
				return '#dde0ab'
			default:
				return '#f4d799'
		}
	}

	return (
		<div className={styles.root} style={{ backgroundColor: getBackgroundColor() }}>
			<Container maxWidth='lg' sx={{ marginLeft: 'unset' }}>
				<div className={styles.inner}>
					<Link className={styles.logo} to='/'>
						<div>Задачи</div>
					</Link>
					<Link className={styles.logo} to='/TaskManager'>
						<div>Менеджер задач</div>
					</Link>
				</div>
			</Container>
		</div>
	)
}
