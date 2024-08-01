import AppController from '@/components/AppController/AppController';
import FactoryQueries from '@/components/FactoryQueries/FactoryQueries';
import FactorySchemas from '@/components/FactorySchemas/FactorySchemas';
import FactoryTables from '@/components/FactoryTables/FactoryTables';
import FactoryTabs from '@/components/FactoryTabs/FactoryTabs';
import CreateProjectModal from '@/components/Modals/CreateProjectModal';
import TablesViewGrid, { TableViewGridSkeleton } from '@/components/TablesViewGrid/TablesViewGrid';
import { getProjectByTitleQuery } from '@/services/queries/get-project.query';
import { Suspense } from 'react';

type HomeProps = {
	searchParams: {
		project: string;
	};
};

export default async function Home({ searchParams: { project } }: HomeProps) {
	const projectResponse = await getProjectByTitleQuery({ title: project });

	return (
		<div className="relative flex h-full w-full flex-col items-center justify-between">
			<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"></div>
			<CreateProjectModal />
			<AppController
				projectTitle={project}
				projectType={projectResponse?.database}
				tables={
					<Suspense fallback={<TableViewGridSkeleton />}>
						<TablesViewGrid projectTitle={project} />
					</Suspense>
				}
				factoryTabs={
					<FactoryTabs
						tables={<FactoryTables project={projectResponse} isProjectSelected={Boolean(project)} />}
						queries={<FactoryQueries project={projectResponse} />}
						schemas={<FactorySchemas project={projectResponse} />}
					/>
				}
			/>
		</div>
	);
}
