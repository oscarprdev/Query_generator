import { IconLoader2 } from '@tabler/icons-react';

type LoadingModalContentProps = {
	text: string;
};

const LoadingModalContent = ({ text }: LoadingModalContentProps) => {
	return (
		<div data-testid="loading-modal" className="grid h-full w-full place-items-center">
			<IconLoader2 size={52} stroke={1} className="animate-spin text-zinc-400" />
			<p className="mt-2 text-center text-sm text-zinc-400">{text}</p>
		</div>
	);
};

export default LoadingModalContent;
