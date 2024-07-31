import { $Enums, Databases } from '@prisma/client';
import { Badge } from '../ui/badge';
import TableCardDropdownController from '../TableCardDropdownController/TableCardDropdownController';

export type Row = {
	id: string;
	name: string;
	value: string;
	type: $Enums.PostgresType | $Enums.MongoType;
	constraints: $Enums.PostgreConstraint | $Enums.MongoConstraint;
	tableId: string;
};

type TableCardProps = {
	tableId: string;
	type: Databases;
	title: string;
	rows: Row[];
};

const TableCard = ({ tableId, title, rows, type }: TableCardProps) => {
	return (
		<article className="flex h-fit max-w-[300px] flex-col rounded-lg border border-border bg-background shadow-lg">
			<div className="bg- relative grid w-full place-items-center border-b border-border bg-emerald-900/10 p-2">
				<p className="text-sm text-zinc-200">{title}</p>
				<div className="absolute right-1 top-0">
					<TableCardDropdownController tableId={tableId} type={type} title={title} rows={rows} />
				</div>
			</div>
			<ul className="flex w-full flex-col gap-1">
				{rows
					.sort((a, b) => (a.constraints === 'primaryKey' ? -1 : b.constraints === 'primaryKey' ? 1 : 0))
					.map(row => (
						<li
							key={row.name}
							className="flex w-full items-center gap-2 border-b border-border px-5 py-3 font-light last-of-type:border-none">
							<p className="text-sm capitalize">{row.name}</p>
							<p className="text-xs capitalize text-zinc-400">{row.type}</p>
							{row.constraints !== 'primaryKey' ? (
								<p className="ml-auto text-xs capitalize text-zinc-400">{row.constraints}</p>
							) : (
								<Badge className="ml-auto text-xs">Pk</Badge>
							)}
						</li>
					))}
			</ul>
		</article>
	);
};

export default TableCard;
