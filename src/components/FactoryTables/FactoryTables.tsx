'use client';

import { Project } from '@prisma/client';
import CreateTableForm, { CreateTableFormValues } from '../Forms/CreateTableForm';
import { createTable } from '@/app/actions/create-table';

type FactoryTables = {
	project: Project | null;
};

const FactoryTables = ({ project }: FactoryTables) => {
	const handleSubmit = async (values: CreateTableFormValues) => {
		if (!project) return;

		await createTable({
			projectId: project.id,
			type: project.database,
			title: values.title,
			rows: values.rows,
		});
	};

	return <div>{project && <CreateTableForm handleSubmit={handleSubmit} type={project.database} />}</div>;
};

export default FactoryTables;
