'use server';

import { auth } from '@/auth';
import { getProjectByTitleQuery } from '@/services/queries/get-project.query';
import { revalidatePath } from 'next/cache';
import { createSchemaQuery } from '@/services/queries/create-schema.query';

type CreateSchemaInput = {
	title: string;
	table: string;
	code: string;
	projectTitle: string;
};

export const createSchema = async ({ title, table, code, projectTitle }: CreateSchemaInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	const project = await getProjectByTitleQuery({ title: projectTitle });
	if (!project) return null;

	await createSchemaQuery({ title, table, code, projectId: project.id });

	revalidatePath('/');
};
