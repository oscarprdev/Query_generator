import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TablesViewProps = {
	isVisible: boolean;
	children: ReactNode;
};

const TablesView = ({ isVisible, children }: TablesViewProps) => {
	return <section className={cn('h-full duration-300', isVisible ? 'w-[580px]' : 'w-[70vw]')}>{children}</section>;
};

export default TablesView;
