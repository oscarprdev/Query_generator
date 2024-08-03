'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { deleteProjectQuery } from '@/services/queries/delete-project.query';
import { revalidatePath } from 'next/cache';

interface DeleteProjectInput {
	projectId: string;
}

export const deleteProject = async ({ projectId }: DeleteProjectInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await deleteProjectQuery({ projectId });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.DELETTING_PROJECT);
	}

	revalidatePath('/');
};
