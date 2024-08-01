import { QueryAction } from '@prisma/client';
import { Badge } from '../ui/badge';
import ReviewQueryModal from '../Modals/ReviewQueryModal';
import { formatDateTime } from '@/lib/dates';

type QueryItemProps = {
	queryId: string;
	title: string;
	action: QueryAction;
	description: string;
	createdAt: Date;
};

const QueryItem = ({ queryId, title, description, action, createdAt }: QueryItemProps) => {
	return (
		<ReviewQueryModal queryId={queryId}>
			<li className="flex w-full animate-fade-up cursor-pointer flex-col gap-1 rounded-md bg-zinc-800/50 px-3 py-3 duration-300 hover:bg-zinc-800">
				<p className="text-md text-zinc-400">{title}</p>
				<p className="truncate text-sm text-zinc-500">{description}</p>
				<div className="mt-2 flex w-full items-center justify-between">
					<div className="flex items-center gap-2">
						<Badge variant={'primary'} className="capitalize">
							{action}
						</Badge>
					</div>
					<p className="text-xs text-zinc-500">{formatDateTime(createdAt)}</p>
				</div>
			</li>
		</ReviewQueryModal>
	);
};

export default QueryItem;
