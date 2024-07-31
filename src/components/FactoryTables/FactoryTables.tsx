'use client';

import { Project } from '@prisma/client';
import TableForm, { TableFormValues } from '../Forms/TableForm';
import { createTable } from '@/app/actions/create-table';

type FactoryTables = {
	project: Project | null;
	isProjectSelected: boolean;
};

const FactoryTables = ({ project, isProjectSelected }: FactoryTables) => {
	const handleSubmit = async (values: TableFormValues) => {
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
				<TableForm
					handleSubmit={handleSubmit}
					type={project.database}
					defaultValues={{ title: '', rows: [{ name: '', value: '', type: 'any', constraints: 'any' }] }}
					submitLabel="Crear tabla"
				/>
			) : (
				<p className="text-xs text-zinc-400">Selecciona un proyecto para empezar</p>
			)}
		</div>
	);
};

export default FactoryTables;
