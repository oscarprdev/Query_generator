'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { deleteTableQuery } from '@/services/queries/delete-table.query';
import { Databases } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface DeleteTableInput {
	tableId: string;
	type: Databases;
}

export const deleteTable = async ({ tableId, type }: DeleteTableInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await deleteTableQuery({ tableId, type });
	} catch (error) {
		return errorResponse(ERRORS_MESSAGES.DELETTING_TABLE);
	}

	revalidatePath('/');
};
