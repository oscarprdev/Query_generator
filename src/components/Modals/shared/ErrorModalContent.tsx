import { IconAlertTriangle } from '@tabler/icons-react';

type ErrorModalContentProps = {
	text: string;
};

const ErrorModalContent = ({ text }: ErrorModalContentProps) => {
	return (
		<div className="grid h-full w-full place-items-center">
			<IconAlertTriangle size={52} stroke={1} className="text-red-500" />
			<p className="text-center text-sm text-red-500">{text}</p>
		</div>
	);
};

export default ErrorModalContent;
