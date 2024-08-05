import { formatDateTime } from '@/lib/dates';
import { Badge } from '../ui/badge';
import { Databases } from '@prisma/client';
import { capitalizeStr } from '@/lib/strings';
import ReviewSeedModal from '../Modals/ReviewSeedModal/ReviewSeedModal';

type SeedItemProps = {
	seedId: string;
	title: string;
	createdAt: Date;
	table: string;
	type: Databases;
};

const SeedItem = ({ seedId, title, table, createdAt, type }: SeedItemProps) => {
	return (
		<ReviewSeedModal seedId={seedId} type={type}>
			<li className="flex w-full animate-fade-up cursor-pointer flex-col items-start gap-1 rounded-md bg-zinc-800/50 px-3 py-3 duration-300 hover:bg-zinc-800">
				<p className="text-md text-zinc-400">{capitalizeStr(title)}</p>
				<div className="mt-2 flex w-full items-center justify-between">
					<div className="flex items-center gap-2">
						<Badge key={table} variant={'primary'} className="truncate">
							{table}
						</Badge>
					</div>
					<p className="text-xs text-zinc-500">{formatDateTime(createdAt)}</p>
				</div>
			</li>
		</ReviewSeedModal>
	);
};

export default SeedItem;
