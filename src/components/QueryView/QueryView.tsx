'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type QueryViewProps = {
	children: ReactNode;
};

const QueryView = ({ children }: QueryViewProps) => {
	const [content, setContent] = useState<ReactNode>(children);

	const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
		setContent(event.currentTarget.textContent);
	};

	return (
		<pre
			aria-label="scroll"
			className={cn('relative rounded-lg border border-border bg-zinc-800/50 p-5 text-xs shadow-md')}>
			<code onInput={handleInput} contentEditable className="max-h-[180px] w-full text-zinc-300 outline-none">
				{content}
			</code>
			<Button
				size={'sm'}
				variant={'primary'}
				className="absolute right-2 top-2 animate-fade-up-light text-xs opacity-0 delay-1000 duration-300">
				Guardar query
			</Button>
		</pre>
	);
};

export default QueryView;
