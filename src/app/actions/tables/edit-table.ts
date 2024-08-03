'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { editTableQuery } from '@/services/queries/edit-table.query';
import { $Enums, Databases } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface EditTableInput {
	tableId: string;
	type: Databases;
	title: string;
	rows: {
		id?: string;
		name: string;
		value: string;
		reference: string;
		type: $Enums.MongoType | $Enums.PostgresType;
		constraints: $Enums.MongoConstraint | $Enums.PostgreConstraint;
	}[];
}

export const editTable = async (input: EditTableInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await editTableQuery(input);

		revalidatePath('/');
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.EDITTING_TABLE);
	}
};
