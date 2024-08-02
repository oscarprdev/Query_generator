'use server';

import { getQueryByIdQuery } from '@/services/queries/get-queries.query';
import { $Enums } from '@prisma/client';

type GetQueryById = {
	id: string;
};

export type Query = {
	id: string;
	title: string;
	description: string;
	tables: string;
	action: $Enums.QueryAction;
	code: string;
	createdAt: Date;
	projectId: string;
};

export const getQueryById = async ({ id }: GetQueryById): Promise<Query | null> => {
	const query = await getQueryByIdQuery({ queryId: id });

	if (!query) return null;

	return query satisfies Query;
};
