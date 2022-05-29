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