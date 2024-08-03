'use server';

import { auth } from '@/auth';
import { getProjectByTitleQuery } from '@/services/queries/get-project.query';
import { revalidatePath } from 'next/cache';
import { createSeedQuery } from '@/services/queries/create-seed.query';
import { errorResponse } from '@/lib/either';
import { ERRORS_MESSAGES } from '@/constants/wordings';

type CreateSeedInput = {
	title: string;
	table: string;
	code: string;
	projectTitle: string;
};

export const createSeed = async ({ title, table, code, projectTitle }: CreateSeedInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		const project = await getProjectByTitleQuery({ title: projectTitle });
		if (!project) return errorResponse(ERRORS_MESSAGES.PROJECT_NOT_FOUND);

		await createSeedQuery({ title, table, code, projectId: project.id });
	} catch (error) {
		console.log(error);
		return errorResponse(ERRORS_MESSAGES.CREATING_SEEDS);
	}

	revalidatePath('/');
};
