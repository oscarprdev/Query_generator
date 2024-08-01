'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useDebouncedCallback } from 'use-debounce';

type QueryViewProps = {
	handleStoreQuery: (value: string) => Promise<void>;
	query: string;
	kind: 'edit' | 'create';
};

const QueryView = ({ handleStoreQuery, query, kind }: QueryViewProps) => {
	const [editedContent, setEditedContent] = useState<string>(query);

	const handleEditCode = useDebouncedCallback((event: React.FormEvent<HTMLElement>) => {
		const target = event.target;
		if (target instanceof HTMLElement) {
			target.textContent && setEditedContent(target.textContent);
		}
	}, 600);

	return (
		<pre
			aria-label="scroll"
			className={cn('relative w-full rounded-lg border border-border bg-zinc-800/50 p-5 text-xs shadow-md')}>
			<code
				onInput={e => handleEditCode(e)}
				contentEditable
				className="max-h-[180px] w-full text-zinc-300 outline-none">
				{query}
			</code>
			<Button
				onClick={() => handleStoreQuery(editedContent)}
				size={'sm'}
				variant={kind === 'create' ? 'primary' : 'default'}
				className={cn(
					kind === 'create' ? 'top-2 animate-fade-up-light opacity-0 delay-1000 duration-300' : 'bottom-2',
					'absolute right-2 text-xs'
				)}>
				{kind === 'create' ? 'Crear query' : 'Editar query'}
			</Button>
		</pre>
	);
};

export default QueryView;
