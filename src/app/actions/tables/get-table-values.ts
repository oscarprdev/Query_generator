'use server';

import { auth } from '@/auth';
import { getProjectByTitleQuery } from '@/services/queries/get-project.query';
import { getTableQuery } from '@/services/queries/get-table.query';
import { Databases } from '@prisma/client';

type GetTableValuesInput = {
	projectTitle: string;
	title: string;
	type: Databases;
};

export const getTableValues = async ({ projectTitle, title, type }: GetTableValuesInput) => {
	const session = await auth();
	const user = session?.user;

	if (!user) return null;

	const project = await getProjectByTitleQuery({ title: projectTitle });

	if (!project) return null;

	return await getTableQuery({ title, type, projectId: project?.id });
};
