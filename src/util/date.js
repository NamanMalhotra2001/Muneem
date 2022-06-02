const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function getFormattedDate(date) {
	return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}, ${
		days[date.getDay()]
	}`;
}

export function getFormattedDateTime(date) {
	return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}, ${
		days[date.getDay()]
	} - ${date.getHours()}:${date.getMinutes()}`;
}

export function getDateMinusDays(date, days) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
