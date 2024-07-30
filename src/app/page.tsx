import Factory from '@/components/Factory/Factory';
import FactoryTabs from '@/components/FactoryTabs/FactoryTabs';
import CreateProjectModal from '@/components/Modals/CreateProjectModal';
import TablesView from '@/components/TablesView/TablesView';

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
			<div className="flex h-full w-full items-center">
				<TablesView projectTitle={project} />
				<Factory projectTitle={project}>
					{project ? (
						<FactoryTabs />
					) : (
						<p className="text-xs text-zinc-500">Selecciona un proyecto primero.</p>
					)}
				</Factory>
			</div>
		</div>
	);
}
