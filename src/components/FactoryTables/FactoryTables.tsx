'use client';

import { Project } from '@prisma/client';
import CreateTableForm, { CreateTableFormValues } from '../Forms/CreateTableForm';
import { createTable } from '@/app/actions/create-table';

type FactoryTables = {
	project: Project | null;
	isProjectSelected: boolean;
};

const FactoryTables = ({ project, isProjectSelected }: FactoryTables) => {
	const handleSubmit = async (values: CreateTableFormValues) => {
		if (!project) return;

		await createTable({
			projectId: project.id,
			type: project.database,
			title: values.title,
			rows: values.rows,
		});
	};

	return (
		<div className="grid h-full w-full place-items-center">
			{project && isProjectSelected ? (
				<CreateTableForm handleSubmit={handleSubmit} type={project.database} />
			) : (
				<p className="text-xs text-zinc-400">Selecciona un proyecto para empezar</p>
			)}
		</div>
	);
};

export default FactoryTables;
