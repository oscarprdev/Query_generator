'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse, isError } from '@/lib/either';
import { createProjectQuery } from '@/services/queries/create-project.query';
import { getProjectListQuery } from '@/services/queries/get-project-list.query';
import { Databases } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { generateProject } from './generate-project';

interface CreateProjectInput {
	title: string;
	database: Databases;
	project?: string;
	apiKey: string | null;
}

export const createProject = async ({ title, database, project, apiKey }: CreateProjectInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);
		if (project) {
			const response = await generateProject({ project, userId: user.id, apiKey });
			if (response && isError(response)) {
				return errorResponse(response.error);
			}
		}

		await createProjectQuery({ ownerId: user.id, title, database });
	} catch (error) {
		console.error(error);
		errorResponse(ERRORS_MESSAGES.CREATING_PROJECT);
	}

	revalidatePath('/');
};
