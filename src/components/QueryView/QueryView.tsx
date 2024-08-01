'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { IconSparkles } from '@tabler/icons-react';
import { Databases } from '@prisma/client';
import { Badge } from '../ui/badge';

type QueryViewProps = {
	handleStoreQuery: (value: string) => Promise<void>;
	query: string;
	kind: 'edit' | 'create';
	error: boolean;
	database: Databases;
};

const QueryView = ({ handleStoreQuery, query, kind, error, database }: QueryViewProps) => {
	const codeRef = useRef<HTMLElement>(null);

	return (
		<pre
			aria-label="scroll"
			className={cn(
				'relative max-h-[200px] w-full overflow-x-hidden text-wrap rounded-lg border border-border bg-zinc-800/50 p-5 pt-10 text-xs shadow-md'
			)}>
			<code ref={codeRef} contentEditable className="w-full max-w-[200px] pt-10 text-zinc-300 outline-none">
				{query.replaceAll('`', '').replace('javascript', '').replace('sql', '')}
			</code>
			{database === Databases.mongoDb ? (
				<Badge variant={'secondary'} className="absolute left-2 top-2 text-xs font-light">
					Javascript
				</Badge>
			) : (
				<Badge variant={'secondary'} className="absolute left-2 top-2 text-xs font-light">
					Sql
				</Badge>
			)}
			{!error && (
				<Button
					onClick={() => codeRef.current?.textContent && handleStoreQuery(codeRef.current.textContent)}
					size={'sm'}
					variant={kind === 'create' ? 'primary' : 'default'}
					className={cn(
						kind === 'create' && 'animate-fade-up-light opacity-0 delay-1000 duration-300',
						'absolute right-2 top-2 max-w-[200px] text-xs'
					)}>
					Guardar query
				</Button>
			)}
		</pre>
	);
};

export default QueryView;
