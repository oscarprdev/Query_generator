import prisma from '../db';

interface CreateSchemaQueryInput {
	projectId: string;
	title: string;
	table: string;
	code: string;
}

export const createSchemaQuery = async ({ projectId, title, table, code }: CreateSchemaQueryInput) => {
	await prisma.schema.create({
		data: {
			title,
			table,
			code,
			projectId,
		},
	});
};
