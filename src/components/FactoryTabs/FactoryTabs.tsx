import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FactoryTables from '../FactoryTables/FactoryTables';

const FactoryTabs = () => {
	return (
		<Tabs defaultValue="tables" className="h-full w-full">
			<TabsList className="w-full gap-8">
				<TabsTrigger value="tables">Tablas</TabsTrigger>
				<TabsTrigger value="queries">Querys</TabsTrigger>
				<TabsTrigger value="schemas">Esquemas</TabsTrigger>
			</TabsList>
			<TabsContent value="tables">
				<FactoryTables />
			</TabsContent>
			<TabsContent value="queries"></TabsContent>
			<TabsContent value="schemas"></TabsContent>
		</Tabs>
	);
};

export default FactoryTabs;
