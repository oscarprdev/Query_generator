import { $Enums, Databases } from '@prisma/client';
import prisma from '../db';

interface CreateTableQueryInput {
	projectId: string;
	type: Databases;
	title: string;
	rows: {
		name: string;
		value: string;
		type: $Enums.MongoType | $Enums.PostgresType;
		constraints: $Enums.MongoConstraint | $Enums.PostgreConstraint;
		reference: string;
	}[];
}

export const createTableQuery = async ({ projectId, type, title, rows }: CreateTableQueryInput) => {
	switch (type) {
		case Databases.mongoDb:
			return await prisma.mongoTable.create({
				data: {
					title,
					project: { connect: { id: projectId } },
					rows: {
						create: rows.map(row => ({
							name: row.name,
							value: row.value,
							reference: row.reference,
							type: row.type as $Enums.MongoType,
							constraints: row.constraints as $Enums.MongoConstraint,
						})),
					},
				},
			});
		case Databases.postgreSQL:
			return await prisma.postgreTable.create({
				data: {
					title,
					project: { connect: { id: projectId } },
					rows: {
						create: rows.map(row => ({
							name: row.name,
							value: row.value,
							reference: row.reference,
							type: row.type as $Enums.PostgresType,
							constraints: row.constraints as $Enums.PostgreConstraint,
						})),
					},
				},
			});
		default:
			break;
	}
};
