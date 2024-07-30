import { getTablesListQuery } from '@/services/queries/get-tables-list.query';

type TablesViewGridProps = {
	projectTitle?: string;
};

const TablesViewGrid = async ({ projectTitle }: TablesViewGridProps) => {
	const tables = await getTablesListQuery({ title: projectTitle });

	console.log(tables);
	return <div className="grid h-full w-full grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"></div>;
};

export default TablesViewGrid;
