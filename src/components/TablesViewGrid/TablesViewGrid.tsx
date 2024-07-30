import { getTablesListQuery } from '@/services/queries/get-tables-list.query';
import TableCard from '../TablesCard/TableCard';

type TablesViewGridProps = {
	projectTitle?: string;
};

const TablesViewGrid = async ({ projectTitle }: TablesViewGridProps) => {
	const tables = await getTablesListQuery({ title: projectTitle });

	return (
		<div
			aria-label="scroll"
			className="grid h-[90vh] w-full grid-cols-[repeat(auto-fill,minmax(250px,250px))] gap-5 overflow-x-hidden overflow-y-scroll p-10">
			{tables.map(table => (
				<TableCard key={table.id} title={table.title} rows={table.rows} />
			))}
		</div>
	);
};

export default TablesViewGrid;
