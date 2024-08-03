'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { deleteSchemaQuery } from '@/services/queries/delete-schema.query';
import { revalidatePath } from 'next/cache';

interface DeleteSchemaInput {
	id: string;
}

export const deleteSchema = async ({ id }: DeleteSchemaInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await deleteSchemaQuery({ schemaId: id });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.DELETTING_SCHEMA);
	}

	revalidatePath('/');
};
