export const formatDate = dateString => {
	const months = [
		'Января',
		'Февраля',
		'Марта',
		'Апреля',
		'Мая',
		'Июня',
		'Июля',
		'Августа',
		'Сентября',
		'Октября',
		'Ноября',
		'Декабря',
	]
	const date = new Date(dateString)
	const day = date.getDate()
	const month = months[date.getMonth()]
	const year = date.getFullYear()
	return `${day} ${month} ${year}`
}
