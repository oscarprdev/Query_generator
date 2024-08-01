import { QueryAction } from '@prisma/client';
import prisma from '../db';

interface GetQueriesQueryInput {
	projectId?: string;
}

export const getQueriesQuery = async ({ projectId }: GetQueriesQueryInput) => {
	if (!projectId) return [];

	return await prisma.query.findMany({
		where: {
			projectId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

interface GetQueryByIdQueryInput {
	queryId: string;
}

export const getQueryByIdQuery = async ({ queryId }: GetQueryByIdQueryInput) => {
	return await prisma.query.findFirst({ where: { id: queryId } });
};
