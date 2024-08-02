import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';
import { IconTable, IconBolt, IconFile3d, IconSeeding, IconSettings } from '@tabler/icons-react';

type FactoryTabsProps = {
	tables: ReactNode;
	queries: ReactNode;
	schemas: ReactNode;
	seeds: ReactNode;
	settings: ReactNode;
};

const FactoryTabs = ({ tables, queries, schemas, seeds, settings }: FactoryTabsProps) => {
	return (
		<Tabs defaultValue="tables" className="h-full w-full">
			<TabsList className="w-full gap-8">
				<TabsTrigger value="tables" className="flex items-center gap-2">
					<IconTable size={16} />
					Tablas
				</TabsTrigger>
				<TabsTrigger value="queries" className="flex items-center gap-2">
					<IconBolt size={18} />
					Querys
				</TabsTrigger>
				<TabsTrigger value="schemas" className="flex items-center gap-2">
					<IconFile3d size={18} />
					Esquemas
				</TabsTrigger>
				<TabsTrigger value="seeds" className="flex items-center gap-2">
					<IconSeeding size={18} />
					Semillas
				</TabsTrigger>
				<TabsTrigger value="settings" className="flex items-center gap-2">
					<IconSettings size={18} />
					Ajustes
				</TabsTrigger>
			</TabsList>
			<TabsContent value="tables">{tables}</TabsContent>
			<TabsContent value="queries">{queries}</TabsContent>
			<TabsContent value="schemas">{schemas}</TabsContent>
			<TabsContent value="seeds">{seeds}</TabsContent>
			<TabsContent value="settings">{settings}</TabsContent>
		</Tabs>
	);
};

export default FactoryTabs;
