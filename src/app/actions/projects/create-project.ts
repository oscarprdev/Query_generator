'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { createProjectQuery } from '@/services/queries/create-project.query';
import { getProjectListQuery } from '@/services/queries/get-project-list.query';
import { Databases } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface CreateProjectInput {
	title: string;
	database: Databases;
}

export const createProject = async ({ title, database }: CreateProjectInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse({ message: ERRORS_MESSAGES.USER_NOT_AUTH });

		await createProjectQuery({ ownerId: user.id, title, database });
	} catch (error) {
		console.error(error);
		errorResponse({ message: ERRORS_MESSAGES.CREATING_PROJECT });
	}

	revalidatePath('/');
};
