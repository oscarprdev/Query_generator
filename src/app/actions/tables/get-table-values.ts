'use server';

import { auth } from '@/auth';
import { getTableQuery } from '@/services/queries/get-table.query';
import { Databases } from '@prisma/client';

type GetTableValuesInput = {
	title: string;
	type: Databases;
};

export const getTableValues = async ({ title, type }: GetTableValuesInput) => {
	const session = await auth();
	const user = session?.user;

	if (!user) return null;

	return await getTableQuery({ title, type });
};
