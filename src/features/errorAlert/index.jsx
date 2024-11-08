import { useEffect } from 'react'

export const AlertError = status => {
	useEffect(() => {
		if (status === 'error') {
			const userConfirmed = window.confirm('Произошла ошибка получения данных. Перезагрузить страницу?')
			if (userConfirmed) {
				window.location.reload()
			}
		}
	}, [status])
}
