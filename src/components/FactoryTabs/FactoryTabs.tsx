import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';

type FactoryTabsProps = {
	tables: ReactNode;
	queries: ReactNode;
	schemas: ReactNode;
};

const FactoryTabs = ({ tables, queries, schemas }: FactoryTabsProps) => {
	return (
		<Tabs defaultValue="tables" className="h-full w-full">
			<TabsList className="w-full gap-8">
				<TabsTrigger value="tables">Tablas</TabsTrigger>
				<TabsTrigger value="queries">Querys</TabsTrigger>
				<TabsTrigger value="schemas">Esquemas</TabsTrigger>
			</TabsList>
			<TabsContent value="tables">{tables}</TabsContent>
			<TabsContent value="queries">{queries}</TabsContent>
			<TabsContent value="schemas">{schemas}</TabsContent>
		</Tabs>
	);
};

export default FactoryTabs;
