'use server';

import { getQueryByIdQuery } from '@/services/queries/get-queries.query';

type GetQueryById = {
	queryId: string;
};

export const getQueryById = async ({ queryId }: GetQueryById) => {
	return await getQueryByIdQuery({ queryId });
};
