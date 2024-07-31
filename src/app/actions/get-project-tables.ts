'use server';

import { auth } from '@/auth';
import { getTablesListQuery } from '@/services/queries/get-tables-list.query';

type GetProjectTablesInput = {
	projectTitle: string;
};

export const getProjectTables = async ({ projectTitle }: GetProjectTablesInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	return getTablesListQuery({ title: projectTitle });
};
