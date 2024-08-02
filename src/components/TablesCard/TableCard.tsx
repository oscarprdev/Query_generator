import { $Enums, Databases } from '@prisma/client';
import { Badge } from '../ui/badge';
import TableCardDropdownController from '../TableCardDropdownController/TableCardDropdownController';
import { FOREIGN_KEY, PRIMARY_KEY, sortRows } from './utils/sort-rows';

export type Row = {
	id: string;
	name: string;
	value: string;
	reference: string;
	type: $Enums.PostgresType | $Enums.MongoType;
	constraints: $Enums.PostgreConstraint | $Enums.MongoConstraint;
	tableId: string;
};

type TableCardProps = {
	tableId: string;
	projectTitle: string;
	type: Databases;
	title: string;
	rows: Row[];
};

const TableCard = ({ tableId, title, rows, type, projectTitle }: TableCardProps) => {
	return (
		<article className="flex h-fit max-w-[300px] flex-col rounded-lg border border-border bg-background shadow-lg">
			<div className="bg- relative grid w-full place-items-center border-b border-border bg-emerald-900/10 p-2">
				<p className="text-sm text-zinc-200">{title}</p>
				<div className="absolute right-1 top-0">
					<TableCardDropdownController
						tableId={tableId}
						type={type}
						title={title}
						rows={rows}
						projectTitle={projectTitle}
					/>
				</div>
			</div>
			<ul className="flex w-full flex-col gap-1">
				{sortRows(rows).map(row => (
					<li
						key={row.name}
						className="flex w-full items-center gap-2 border-b border-border px-5 py-3 font-light last-of-type:border-none">
						<p className="text-sm capitalize">{row.name}</p>
						<p className="text-xs capitalize text-zinc-400">{row.type}</p>
						{row.constraints === PRIMARY_KEY ? (
							<Badge className="ml-auto text-xs">Pk</Badge>
						) : row.constraints === FOREIGN_KEY ? (
							<Badge variant={'secondary'} className="ml-auto text-xs">
								Foreign key
							</Badge>
						) : (
							<p className="ml-auto text-xs capitalize text-zinc-400">{row.constraints}</p>
						)}
					</li>
				))}
			</ul>
		</article>
	);
};

export const TableCardSkeleton = () => {
	return (
		<article className="flex h-fit max-w-[300px] flex-col rounded-lg border border-border bg-background shadow-lg">
			<div className="relative grid w-full place-items-center border-b border-border bg-emerald-900/10 p-2">
				<div className="mr-auto w-3/4 animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
				<div className="absolute right-1 top-1 rounded-md bg-zinc-800/70 p-3"></div>
			</div>
			<ul className="flex w-full flex-col gap-1">
				<li className="flex w-full items-center gap-2 border-b border-border px-3 py-3 last-of-type:border-none">
					<div className="w-full animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
					<div className="w-full animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
					<div className="ml-6 w-1/4 animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
				</li>
				<li className="flex w-full items-center gap-2 border-b border-border px-3 py-3 last-of-type:border-none">
					<div className="w-full animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
					<div className="w-full animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
					<div className="ml-6 w-1/4 animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
				</li>
				<li className="flex w-full items-center gap-2 border-b border-border px-3 py-3 last-of-type:border-none">
					<div className="w-full animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
					<div className="w-full animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
					<div className="ml-6 w-1/4 animate-pulse rounded-md bg-zinc-700/50 px-4 py-3"></div>
				</li>
			</ul>
		</article>
	);
};

export default TableCard;
