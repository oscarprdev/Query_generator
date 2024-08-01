import { IconCircleCheck } from '@tabler/icons-react';

type SuccessModalContentProps = {
	text: string;
};

const SuccessModalContent = ({ text }: SuccessModalContentProps) => {
	return (
		<div className="grid h-full w-full place-items-center">
			<IconCircleCheck size={52} stroke={1} className="text-primary" />
			<p className="mt-2 text-center text-sm text-primary">{text}</p>
		</div>
	);
};

export default SuccessModalContent;
