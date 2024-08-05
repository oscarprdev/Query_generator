import { Databases } from '@prisma/client';
import prisma from '../db';

interface GetTablesListQueryInput {
	title?: string;
	ownerId: string;
}

export const getTablesListQuery = async ({ title, ownerId }: GetTablesListQueryInput) => {
	if (!title) return [];

	const project = await prisma.project.findFirst({ where: { title, ownerId } });

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
					createdAt: 'desc',
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
					createdAt: 'desc',
				},
			});
		default:
			return [];
	}
};
