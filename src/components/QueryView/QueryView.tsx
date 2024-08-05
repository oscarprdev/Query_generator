'use client';

import { cn } from '@/lib/utils';
import { Databases } from '@prisma/client';
import { Badge } from '../ui/badge';
import QueryViewCopyIcon from '../QueryViewCopyIcon/QueryViewCopyIcon';

type QueryViewProps = {
	query: string;
	database: Databases;
	codeRef?: React.RefObject<HTMLElement>;
	handleEditCode?: () => void;
};

const QueryView = ({ codeRef, query, handleEditCode, database }: QueryViewProps) => {
	return (
		<pre
			aria-label="scroll"
			className={cn(
				'relative max-h-[200px] w-full overflow-x-hidden text-wrap rounded-lg border border-border bg-zinc-800/50 px-5 py-4 pt-6 text-xs shadow-md'
			)}>
			<code
				onInput={handleEditCode}
				ref={codeRef}
				contentEditable
				className="w-full max-w-[200px] text-zinc-300 outline-none">
				{query.replaceAll('`', '').replace('javascript', '').replace('sql', '')}
			</code>
			<QueryViewCopyIcon code={codeRef?.current?.textContent || ''} />
			{database === Databases.mongoDb ? (
				<Badge variant={'secondary'} className="absolute left-2 top-2 text-[0.6rem]">
					Javascript
				</Badge>
			) : (
				<Badge variant={'secondary'} className="absolute left-2 top-2 text-[0.6rem]">
					Sql
				</Badge>
			)}
		</pre>
	);
};

export default QueryView;
