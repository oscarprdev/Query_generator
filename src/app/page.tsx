import { auth } from '@/auth';
import AppController from '@/components/AppController/AppController';
import FactoryQueries from '@/components/FactoryQueries/FactoryQueries';
import FactorySchemas from '@/components/FactorySchemas/FactorySchemas';
import FactorySeed from '@/components/FactorySeed/FactorySeed';
import FactorySettings from '@/components/FactorySettings/FactorySettings';
import FactoryTables from '@/components/FactoryTables/FactoryTables';
import FactoryTabs from '@/components/FactoryTabs/FactoryTabs';
import CreateProjectModal from '@/components/Modals/CreateProjectModal/CreateProjectModal';
import TablesViewGrid, { TableViewGridSkeleton } from '@/components/TablesViewGrid/TablesViewGrid';
import { getProjectByTitleAndUserIdQuery } from '@/services/queries/get-project.query';
import { Suspense } from 'react';

type HomeProps = {
	searchParams: {
		project: string;
	};
};

export default async function Home({ searchParams: { project } }: HomeProps) {
	const session = await auth();
	const projectResponse = await getProjectByTitleAndUserIdQuery({ title: project, userId: session?.user?.id });

	return (
		<div className="relative flex h-full w-full flex-col items-center justify-between">
			<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"></div>
			<CreateProjectModal />
			<AppController
				projectTitle={projectResponse?.title}
				projectType={projectResponse?.database}
				tables={
					<Suspense fallback={<TableViewGridSkeleton />}>
						<TablesViewGrid projectTitle={projectResponse?.title} />
					</Suspense>
				}
				factoryTabs={
					<FactoryTabs
						tables={
							<FactoryTables
								project={projectResponse}
								isProjectSelected={Boolean(projectResponse?.title)}
							/>
						}
						queries={<FactoryQueries project={projectResponse} />}
						schemas={<FactorySchemas project={projectResponse} />}
						seeds={<FactorySeed project={projectResponse} />}
						settings={<FactorySettings project={projectResponse} />}
					/>
				}
			/>
		</div>
	);
}
