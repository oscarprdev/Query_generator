import { getQueriesQuery } from '@/services/queries/get-queries.query';
import { Project } from '@prisma/client';
import QueryItem from '../QueryItem/QueryItem';
import ReviewQueryModal from '../Modals/ReviewQueryModal';
import GenerateQueryModal from '../Modals/GenerateQueryModal';

type FactoryQueries = {
	project: Project | null;
};

const FactoryQueries = async ({ project }: FactoryQueries) => {
	const queries = await getQueriesQuery({ projectId: project?.id });

	return (
		<div className="grid h-full w-full place-items-center">
			<ul aria-label="scroll" className="flex h-[52vh] w-full flex-col gap-1 overflow-x-hidden overflow-y-scroll">
				{queries.length > 0 ? (
					queries.map(query => (
						<QueryItem
							key={query.id}
							queryId={query.id}
							title={query.title}
							action={query.action}
							description={query.description}
							createdAt={query.createdAt}
							tables={query.tables}
						/>
					))
				) : project ? (
					<p className="text-center text-xs text-zinc-400">No hay ninguna query generada todavia.</p>
				) : (
					<p className="text-center text-xs text-zinc-400">Selecciona un proyecto para empezar</p>
				)}
			</ul>
			{project && <GenerateQueryModal projectTitle={project.title} type={project.database} />}
		</div>
	);
};

export default FactoryQueries;
