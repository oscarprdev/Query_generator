'use client';

import { cn } from '@/lib/utils';
import { Databases } from '@prisma/client';
import { IconBolt, IconChevronUp } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Badge } from '../ui/badge';

type FactoryProps = {
	projectTitle?: string;
	projectType?: Databases;
	isVisible: boolean;
	toggleVisibility(): void;
	children: ReactNode;
};

const Factory = ({ isVisible, projectTitle, projectType, toggleVisibility, children }: FactoryProps) => {
	return (
		<section
			className={cn(
				'absolute bottom-0 right-5 flex w-[700px] flex-col rounded-t-xl border border-border bg-background shadow-md duration-300',
				isVisible ? 'h-[78vh]' : 'h-[60px]'
			)}>
			<header className="flex w-full items-center justify-between border-b border-border p-5">
				<div className="flex w-full items-center gap-3">
					<IconBolt size={20} className="text-secondary" />
					<div className="flex items-center gap-3">
						<p className="text-md text-zinc-300">Factoria</p>
						{projectTitle && (
							<>
								<span aria-hidden className="h-1 w-1 rounded-full bg-border" />
								<p className="text-sm capitalize text-zinc-400">{projectTitle}</p>
								<span aria-hidden className="h-1 w-1 rounded-full bg-border" />
								<Badge>{projectType}</Badge>
							</>
						)}
					</div>
				</div>
				<IconChevronUp
					onClick={() => toggleVisibility()}
					size={18}
					className={cn('duration-300', isVisible ? 'rotate-180' : 'rotate-0')}
				/>
			</header>
			<div className="grid h-full w-full place-items-center p-0">{children}</div>
		</section>
	);
};

export default Factory;
