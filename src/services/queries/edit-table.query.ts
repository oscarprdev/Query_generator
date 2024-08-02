import { $Enums, Databases } from '@prisma/client';
import prisma from '../db';

interface EditTableQueryInput {
	type: Databases;
	tableId: string;
	title: string;
	rows: {
		id?: string;
		name: string;
		value: string;
		reference: string;
		type: $Enums.MongoType | $Enums.PostgresType;
		constraints: $Enums.MongoConstraint | $Enums.PostgreConstraint;
	}[];
}

export const editTableQuery = async ({ tableId, type, title, rows }: EditTableQueryInput) => {
	switch (type) {
		case Databases.mongoDb:
			return await prisma.$transaction(async prisma => {
				for (const row of rows) {
					await prisma.mongoRow.upsert({
						where: { id: row.id || '' },
						update: {
							name: row.name,
							value: row.value,
							reference: row.reference,
							type: row.type as $Enums.MongoType,
							constraints: row.constraints as $Enums.MongoConstraint,
						},
						create: {
							name: row.name,
							value: row.value,
							reference: row.reference,
							type: row.type as $Enums.MongoType,
							constraints: row.constraints as $Enums.MongoConstraint,
							table: { connect: { id: tableId } },
						},
					});
				}

				return await prisma.mongoTable.update({
					where: { id: tableId },
					data: {
						title,
					},
				});
			});
		case Databases.postgreSQL:
			return await prisma.$transaction(async prisma => {
				for (const row of rows) {
					await prisma.postgreRow.upsert({
						where: { id: row.id || '' },
						update: {
							name: row.name,
							value: row.value,
							reference: row.reference,
							type: row.type as $Enums.PostgresType,
							constraints: row.constraints as $Enums.PostgreConstraint,
						},
						create: {
							name: row.name,
							value: row.value,
							reference: row.reference,
							type: row.type as $Enums.PostgresType,
							constraints: row.constraints as $Enums.PostgreConstraint,
							table: { connect: { id: tableId } },
						},
					});
				}

				return await prisma.postgreTable.update({
					where: { id: tableId },
					data: {
						title,
					},
				});
			});
		default:
			break;
	}
};
