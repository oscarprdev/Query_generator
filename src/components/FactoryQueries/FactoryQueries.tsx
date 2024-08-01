import { getQueriesQuery } from '@/services/queries/get-queries.query';
import { Project } from '@prisma/client';
import QueryItem from '../QueryItem/QueryItem';
import GenerateQueryModal from '../Modals/GenerateQueryModal';

type FactoryQueriesProps = {
	project: Project | null;
};

const FactoryQueries = async ({ project }: FactoryQueriesProps) => {
	const queries = await getQueriesQuery({ projectId: project?.id });

	return (
		<>
			{queries.length > 0 && project ? (
				<ul
					aria-label="scroll"
					className="-mt-5 mb-5 grid h-[67%] w-full auto-rows-[100px] grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 overflow-x-hidden overflow-y-scroll">
					{queries.map(query => (
						<QueryItem
							key={query.id}
							type={project.database}
							queryId={query.id}
							title={query.title}
							action={query.action}
							description={query.description}
							createdAt={query.createdAt}
						/>
					))}
				</ul>
			) : project ? (
				<p className="text-center text-xs text-zinc-400">No hay ninguna query generada todavia.</p>
			) : (
				<p className="text-center text-xs text-zinc-400">Selecciona un proyecto para empezar</p>
			)}

			{project && <GenerateQueryModal projectTitle={project.title} type={project.database} />}
		</>
	);
};

export default FactoryQueries;
