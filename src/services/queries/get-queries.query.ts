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
