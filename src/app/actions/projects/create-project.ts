'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { createProjectQuery } from '@/services/queries/create-project.query';
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

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		console.log(user.id);

		await createProjectQuery({ ownerId: user.id, title, database });
	} catch (error) {
		console.error(error);
		errorResponse(ERRORS_MESSAGES.CREATING_PROJECT);
	}

	revalidatePath('/');
};
