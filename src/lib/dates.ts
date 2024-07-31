import { formatDistance, format } from 'date-fns';

export const formatDistanceTime = (from: Date) => {
	const now = new Date();
	return formatDistance(from, now, {
		addSuffix: true,
	});
};

export const formatDateTime = (from: Date) => {
	return format(from, 'dd/MM/yyyy');
};
