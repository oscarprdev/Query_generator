'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useDebouncedCallback } from 'use-debounce';

type QueryViewProps = {
	handleStoreQuery: (code: string) => Promise<void>;
	content: ReactNode;
	editedContent?: string | null;
};

const QueryViewContext = createContext<QueryViewProps | null>(null);

const useQueryViewContext = () => {
	const context = useContext(QueryViewContext);
	if (!context) throw new Error('useQueryViewContext must be used within a QueryView');

	return context;
};

const QueryView = ({
	children,
	props: { content, handleStoreQuery },
}: {
	children: ReactNode;
	props: QueryViewProps;
}) => {
	const [editedContent, setEditedContent] = useState<string | null>(null);

	const handleEditCode = useDebouncedCallback((event: React.FormEvent<HTMLElement>) => {
		const target = event.target;
		if (target instanceof HTMLElement) {
			setEditedContent(target.textContent);
		}
	}, 400);

	return (
		<QueryViewContext.Provider value={{ handleStoreQuery, content, editedContent }}>
			<pre
				aria-label="scroll"
				className={cn('relative rounded-lg border border-border bg-zinc-800/50 p-5 text-xs shadow-md')}>
				<code
					onInput={e => handleEditCode(e)}
					contentEditable
					className="max-h-[180px] w-full text-zinc-300 outline-none">
					{content}
				</code>
				{children}
			</pre>
		</QueryViewContext.Provider>
	);
};

QueryView.CreateQueryCTA = function CreateQueryCTA() {
	const { handleStoreQuery, editedContent } = useQueryViewContext();

	return (
		<Button
			onClick={() => handleStoreQuery(JSON.stringify(editedContent))}
			size={'sm'}
			variant={'primary'}
			className="absolute right-2 top-2 animate-fade-up-light text-xs opacity-0 delay-1000 duration-300">
			Guardar query
		</Button>
	);
};

QueryView.EditQueryCTA = function EditQueryCTA() {
	const { handleStoreQuery, editedContent } = useQueryViewContext();

	return (
		<Button
			onClick={() => handleStoreQuery(JSON.stringify(editedContent))}
			size={'sm'}
			className="absolute right-2 top-2 animate-fade-up-light text-xs opacity-0 delay-1000 duration-300">
			Editar query
		</Button>
	);
};

export default QueryView;
