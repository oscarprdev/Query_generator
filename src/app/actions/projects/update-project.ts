'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { updateProjectQuery } from '@/services/queries/create-project.query';
import { revalidatePath } from 'next/cache';

interface UpdateProjectInput {
	projectId: string;
	title: string;
}

export const updateProject = async ({ projectId, title }: UpdateProjectInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await updateProjectQuery({ projectId, title });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.UPDATING_PROJECT);
	}

	revalidatePath('/');
};
