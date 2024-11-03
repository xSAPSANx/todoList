import { Link } from 'react-router-dom'
import styles from './ui/Header.module.scss'

import Container from '@mui/material/Container'

export const Header = () => {
	return (
		<div className={styles.root}>
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
