import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TablesViewProps = {
	projectTitle: string;
	isVisible: boolean;
	children: ReactNode;
};

const TablesView = ({ projectTitle, isVisible, children }: TablesViewProps) => {
	return (
		<section className={cn('h-full border border-red-500 duration-300', isVisible ? 'w-[700px]' : 'w-[70vw]')}>
			{children}
		</section>
	);
};

export default TablesView;
