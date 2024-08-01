import { getSchemasListQuery } from '@/services/queries/get-schemas-list';
import { Project } from '@prisma/client';
import SchemaItem from '../SchemaItem/SchemaItem';

type FactorySchemasProps = {
	project: Project | null;
};

const FactorySchemas = async ({ project }: FactorySchemasProps) => {
	const schemas = await getSchemasListQuery({ projectId: project?.id });

	return (
		<div className="grid h-full w-full place-items-center">
			<ul
				aria-label="scroll"
				className="-mt-5 mb-5 flex h-[52vh] w-full flex-col gap-1 overflow-x-hidden overflow-y-scroll">
				{schemas.length > 0 ? (
					schemas.map(schema => (
						<SchemaItem
							key={schema.id}
							schemaId={schema.id}
							title={schema.title}
							tables={schema.tables}
							createdAt={schema.createdAt}
						/>
					))
				) : project ? (
					<p className="text-center text-xs text-zinc-400">No hay ningun schema generado todavia.</p>
				) : (
					<p className="text-center text-xs text-zinc-400">Selecciona un proyecto para empezar.</p>
				)}
			</ul>
			{/* {project && <GenerateQueryModal projectTitle={project.title} type={project.database} />} */}
		</div>
	);
};

export default FactorySchemas;
