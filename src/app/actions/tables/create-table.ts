'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { createTableQuery } from '@/services/queries/create-table.query';
import { $Enums, Databases } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface CreateTableInput {
	projectId: string;
	type: Databases;
	title: string;
	rows: {
		name: string;
		value: string;
		reference: string;
		type: $Enums.MongoType | $Enums.PostgresType;
		constraints: $Enums.MongoConstraint | $Enums.PostgreConstraint;
	}[];
}

export const createTable = async (input: CreateTableInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await createTableQuery(input);
	} catch (error) {
		return errorResponse(ERRORS_MESSAGES.CREATING_TABLES);
	}

	revalidatePath('/');
};
