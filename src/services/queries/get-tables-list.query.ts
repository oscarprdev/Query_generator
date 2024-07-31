import { Databases } from '@prisma/client';
import prisma from '../db';

interface GetTablesListQueryInput {
	title?: string;
}

export const getTablesListQuery = async ({ title }: GetTablesListQueryInput) => {
	if (!title) return [];

	const project = await prisma.project.findUnique({ where: { title } });

	const database = project?.database;

	switch (database) {
		case Databases.postgreSQL:
			return await prisma.postgreTable.findMany({
				where: {
					projectId: project?.id,
				},
				include: {
					rows: true,
				},
				orderBy: {
					createdAt: 'asc',
				},
			});
		case Databases.mongoDb:
			return await prisma.mongoTable.findMany({
				where: {
					projectId: project?.id,
				},
				include: {
					rows: true,
				},
				orderBy: {
					createdAt: 'asc',
				},
			});
		default:
			return [];
	}
};
