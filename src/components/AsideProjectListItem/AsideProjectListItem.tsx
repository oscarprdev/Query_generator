'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type AsideProjectListItemProps = {
	title: string;
};

const AsideProjectListItem = ({ title }: AsideProjectListItemProps) => {
	const searchParams = useSearchParams();
	const currentProject = searchParams.get('project');

	const isSelected = currentProject === title;

	return (
		<Link
			data-testid={`aside-project-${title}`}
			href={`?project=${title}`}
			className={cn(
				isSelected
					? 'rounded-l-none rounded-r-md border-l border-primary bg-zinc-800/50 text-zinc-300'
					: 'rounded-md border-l border-transparent text-zinc-400',
				'px-4 py-2 text-sm font-light capitalize duration-300 first-of-type:mt-3 hover:bg-zinc-800'
			)}>
			{title}
		</Link>
	);
};

export default AsideProjectListItem;
