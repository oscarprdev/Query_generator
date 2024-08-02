import { getTablesListQuery } from '@/services/queries/get-tables-list.query';
import TableCard, { TableCardSkeleton } from '../TablesCard/TableCard';
import { getProjectByTitleQuery } from '@/services/queries/get-project.query';

type TablesViewGridProps = {
	projectTitle?: string;
};

const TablesViewGrid = async ({ projectTitle }: TablesViewGridProps) => {
	const [project, tables] = await Promise.all([
		getProjectByTitleQuery({ title: projectTitle }),
		getTablesListQuery({ title: projectTitle }),
	]);

	return (
		<div
			aria-label="scroll"
			className="grid h-[90vh] w-full auto-rows-min grid-cols-[repeat(auto-fill,minmax(250px,250px))] gap-5 overflow-x-hidden overflow-y-scroll p-10">
			{project &&
				tables.length > 0 &&
				tables.map(table => (
					<TableCard
						key={table.id}
						tableId={table.id}
						title={table.title}
						rows={table.rows}
						type={project?.database}
					/>
				))}
		</div>
	);
};

export const TableViewGridSkeleton = () => {
	return (
		<div
			aria-label="scroll"
			className="grid h-[90vh] w-full grid-cols-[repeat(auto-fill,minmax(250px,250px))] gap-5 overflow-x-hidden overflow-y-scroll p-10">
			<TableCardSkeleton />
			<TableCardSkeleton />
			<TableCardSkeleton />
		</div>
	);
};
export default TablesViewGrid;
