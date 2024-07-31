import { Databases } from '@prisma/client';
import prisma from '../db';

interface GetTableQuery {
	title: string;
	type: Databases;
}

export const getTableQuery = async ({ title, type }: GetTableQuery) => {
	switch (type) {
		case Databases.mongoDb:
			return await prisma.mongoTable.findFirst({ where: { title }, include: { rows: true } });
		case Databases.postgreSQL:
			return await prisma.postgreTable.findFirst({ where: { title }, include: { rows: true } });
		default:
			return null;
	}
};
