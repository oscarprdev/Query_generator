import { Badge } from '../ui/badge';
import { Query } from '@/app/actions/get-query-by-id';

type ReviewQueryModalContentProps = {
	query: Query;
};

const ReviewQueryModalContent = ({ query }: ReviewQueryModalContentProps) => {
	return (
		<>
			<div className="flex items-center gap-2">
				<p className="text-md capitalize text-zinc-400">{query.title}</p>
				<Badge variant={'primary'} className="capitalize">
					{query.action}
				</Badge>
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
