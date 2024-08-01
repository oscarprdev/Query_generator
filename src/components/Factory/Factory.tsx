'use client';

import { cn } from '@/lib/utils';
import { Databases } from '@prisma/client';
import { IconBolt, IconChevronUp } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

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
			<header className="flex w-full items-center justify-between border-b border-border px-5 py-2">
				<div className="flex w-full items-center gap-3">
					<IconBolt size={20} className={cn(projectTitle ? 'text-secondary' : 'text-zinc-600')} />
					<div className="flex items-center gap-3">
						{projectTitle && (
							<>
								<p className="text-sm capitalize text-zinc-200">{projectTitle}</p>
								<span aria-hidden className="h-1 w-1 rounded-full bg-border" />
								<Badge className="capitalize">{projectType}</Badge>
							</>
						)}
					</div>
				</div>
				<Button
					variant={'none'}
					className="group grid place-items-center p-2 hover:cursor-pointer"
					onClick={() => toggleVisibility()}>
					<IconChevronUp
						size={18}
						className={cn(
							'text-zinc-400 duration-300 group-hover:text-zinc-100',
							isVisible ? 'rotate-180' : 'rotate-0'
						)}
					/>
				</Button>
			</header>
			<div className="relative grid h-full w-full place-items-center p-0">{children}</div>
		</section>
	);
};

export default Factory;
