import { Databases } from '@prisma/client';
import prisma from '../db';

interface GetTableQuery {
	title: string;
	type: Databases;
	projectId: string;
}

export const getTableQuery = async ({ title, type, projectId }: GetTableQuery) => {
	switch (type) {
		case Databases.mongoDb:
			return await prisma.mongoTable.findFirst({ where: { title, projectId }, include: { rows: true } });
		case Databases.postgreSQL:
			return await prisma.postgreTable.findFirst({ where: { title, projectId }, include: { rows: true } });
		default:
			return null;
	}
};
