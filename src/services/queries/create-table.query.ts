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
		constraint: $Enums.MongoConstraint | $Enums.PostgreConstraint;
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
							type: row.type as $Enums.MongoType,
							constraints: row.constraint as $Enums.MongoConstraint,
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
							type: row.type as $Enums.PostgresType,
							constraints: row.constraint as $Enums.PostgreConstraint,
						})),
					},
				},
			});
		default:
			break;
	}
};
