'use client';

import { cn } from '@/lib/utils';
import { IconBolt, IconChevronUp } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';

type FactoryProps = {
	projectTitle: string;
	children: ReactNode;
};

const Factory = ({ projectTitle, children }: FactoryProps) => {
	const [isVisible, setIsVisible] = useState(true);

	return (
		<section
			className={cn(
				'absolute bottom-0 right-5 flex w-1/2 max-w-[500px] flex-col rounded-t-xl border border-border bg-background shadow-md duration-300',
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
								<p className="text-sm capitalize text-zinc-500">{projectTitle}</p>
							</>
						)}
					</div>
				</div>
				<IconChevronUp
					onClick={() => setIsVisible(!isVisible)}
					size={18}
					className={cn('duration-300', isVisible ? 'rotate-180' : 'rotate-0')}
				/>
			</header>
			<div className="grid h-full w-full place-items-center p-0">{children}</div>
		</section>
	);
};

export default Factory;
