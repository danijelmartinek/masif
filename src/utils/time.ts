import moment from 'moment';

const humanFormat = (dateString: string) => {
	const dateNow = new Date();

	if (moment(dateNow).format('YYYY') === moment(dateString).format('YYYY')) {
		if (
			moment(dateNow).format('MMMM D') ===
			moment(dateString).format('MMMM D')
		) {
			return 'Today';
		} else if (
			moment(dateNow).subtract(1, 'days').format('MMMM D') ===
			moment(dateString).format('MMMM D')
		) {
			return 'Yesterday';
		} else {
			return moment(dateString).format('MMMM D');
		}
	} else {
		return moment(dateString).format('MMMM D, YYYY');
	}
};

export { humanFormat };
