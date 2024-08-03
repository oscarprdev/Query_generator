'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { updateSchemaQuery } from '@/services/queries/create-schema.query';
import { revalidatePath } from 'next/cache';

type UpdateSchemaInput = {
	code: string;
	id: string;
};

export const updateSchema = async ({ id, code }: UpdateSchemaInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await updateSchemaQuery({ code, schemaId: id });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.UPDATING_SCHEMA);
	}

	revalidatePath('/');
};
