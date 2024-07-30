import AppController from '@/components/AppController/AppController';
import FactoryTables from '@/components/FactoryTables/FactoryTables';
import FactoryTabs from '@/components/FactoryTabs/FactoryTabs';
import CreateProjectModal from '@/components/Modals/CreateProjectModal';

type HomeProps = {
	searchParams: {
		project: string;
	};
};

export default function Home({ searchParams: { project } }: HomeProps) {
	return (
		<div className="relative flex h-full w-full flex-col items-center justify-between">
			<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"></div>
			<CreateProjectModal />
			<AppController
				projectTitle={project}
				tables={<p>Tables</p>}
				factoryTabs={
					<FactoryTabs tables={<FactoryTables />} queries={<p>Queries</p>} schemas={<p>Schemas</p>} />
				}
			/>
		</div>
	);
}
