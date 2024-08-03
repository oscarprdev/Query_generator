'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { deleteQueryQuery } from '@/services/queries/delete-query.query';
import { revalidatePath } from 'next/cache';

interface DeleteQueryInput {
	id: string;
}

export const deleteQuery = async ({ id }: DeleteQueryInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await deleteQueryQuery({ queryId: id });
	} catch (error) {
		console.log(error);
		return errorResponse(ERRORS_MESSAGES.DELETTING_QUERY);
	}

	revalidatePath('/');
};
