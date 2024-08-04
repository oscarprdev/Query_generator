'use server';

import { auth } from '@/auth';
import { getTablesListQuery } from '@/services/queries/get-tables-list.query';

type GetProjectTablesInput = {
	projectTitle: string;
};

export const getProjectTables = async ({ projectTitle }: GetProjectTablesInput) => {
	const session = await auth();
	const user = session?.user;

	if (!user || !user.id) return null;

	return await getTablesListQuery({ title: projectTitle, ownerId: user.id });
};
