import { capitalizeStr } from '@/lib/strings';
import { Badge } from '../../ui/badge';
import { Query } from '@/app/actions/queries/get-query-by-id';

type ReviewQueryModalContentProps = {
	query: Query;
};

const ReviewQueryModalContent = ({ query }: ReviewQueryModalContentProps) => {
	return (
		<>
			<div className="flex items-center gap-2">
				<p className="text-md text-zinc-400">{capitalizeStr(query.title)}</p>
				<Badge variant={'primary'}>{query.action}</Badge>
				{query.tables.split(', ').map(table => (
					<Badge key={table} variant={'secondary'}>
						{table}
					</Badge>
				))}
			</div>
			<div className="border-l border-primary pl-2">
				<p className="text-sm text-zinc-400">{query.description}</p>
			</div>
		</>
	);
};

export default ReviewQueryModalContent;
