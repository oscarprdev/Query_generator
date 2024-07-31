import { Databases } from '@prisma/client';
import prisma from '../db';

interface DeleteTableQueryInput {
	tableId: string;
	type: Databases;
}

export const deleteTableQuery = async ({ tableId, type }: DeleteTableQueryInput) => {
	switch (type) {
		case Databases.mongoDb:
			await prisma.mongoTable.delete({ where: { id: tableId } });
			break;
		case Databases.postgreSQL:
			await prisma.postgreTable.delete({ where: { id: tableId } });
			break;
		default:
			break;
	}
};
