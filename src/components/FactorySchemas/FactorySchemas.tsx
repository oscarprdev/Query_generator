'use server';

import { getSchemasListQuery } from '@/services/queries/get-schemas-list';
import { Project } from '@prisma/client';
import SchemaItem from '../SchemaItem/SchemaItem';
import GenerateSchemaModal from '../Modals/GenerateSchemaModal/GenerateSchemaModal';

type FactorySchemasProps = {
	project: Project | null;
};

const FactorySchemas = async ({ project }: FactorySchemasProps) => {
	const schemas = await getSchemasListQuery({ projectId: project?.id });

	return (
		<>
			{schemas.length > 0 && project ? (
				<ul
					aria-label="scroll"
					className="-mt-2 mb-5 grid h-[80%] w-full auto-rows-min grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 overflow-x-hidden overflow-y-scroll">
					{schemas.map(schema => (
						<SchemaItem
							key={schema.id}
							type={project.database}
							schemaId={schema.id}
							title={schema.title}
							table={schema.table}
							createdAt={schema.createdAt}
						/>
					))}
				</ul>
			) : project ? (
				<p className="text-center text-xs text-zinc-400">No hay ningun schema generado todavia.</p>
			) : (
				<p className="text-center text-xs text-zinc-400">Selecciona un proyecto para empezar.</p>
			)}

			{project && <GenerateSchemaModal projectTitle={project.title} type={project.database} />}
		</>
	);
};

export default FactorySchemas;
