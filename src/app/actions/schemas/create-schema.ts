'use server';

import { auth } from '@/auth';
import { getProjectByTitleQuery } from '@/services/queries/get-project.query';
import { revalidatePath } from 'next/cache';
import { createSchemaQuery } from '@/services/queries/create-schema.query';
import { errorResponse } from '@/lib/either';
import { ERRORS_MESSAGES } from '@/constants/wordings';

type CreateSchemaInput = {
	title: string;
	table: string;
	code: string;
	projectTitle: string;
};

export const createSchema = async ({ title, table, code, projectTitle }: CreateSchemaInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		const project = await getProjectByTitleQuery({ title: projectTitle });
		if (!project) return errorResponse(ERRORS_MESSAGES.PROJECT_NOT_FOUND);

		await createSchemaQuery({ title, table, code, projectId: project.id });

		revalidatePath('/');
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.CREATING_SCHEMAS);
	}
};
