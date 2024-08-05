'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { createProjectQuery } from '@/services/queries/create-project.query';
import { createTableQuery } from '@/services/queries/create-table.query';
import { Databases } from '@prisma/client';
import { RowInput } from '../tables/create-table';
import { revalidatePath } from 'next/cache';

export type TableInput = {
	title: string;
	rows: RowInput[];
};

interface CreateGeneratedProjectInput {
	title: string;
	database: Databases;
	tables: TableInput[];
}

export const createGeneratedProject = async ({ title, database, tables }: CreateGeneratedProjectInput) => {
	const session = await auth();
	const user = session?.user;

	if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

	const projectCreated = await createProjectQuery({ ownerId: user.id, title, database });

	const uniqueTables = Array.from(new Set(tables));

	await Promise.all(
		uniqueTables.map(table =>
			createTableQuery({
				projectId: projectCreated.id,
				title: table.title,
				type: database,
				rows: table.rows.map(row => ({ ...row, value: `${row.value}` })),
			})
		)
	);

	revalidatePath('/');
};
