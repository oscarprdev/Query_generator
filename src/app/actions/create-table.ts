'use server';

import { auth } from '@/auth';
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
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return 'No se ha encontrado ningun usuario';

	await createTableQuery(input);

	revalidatePath('/');
};
