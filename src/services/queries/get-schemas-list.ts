import prisma from '../db';

interface GetSchemasListQueryInput {
	projectId?: string;
}

export const getSchemasListQuery = async ({ projectId }: GetSchemasListQueryInput) => {
	if (!projectId) return [];

	return await prisma.schema.findMany({
		where: { projectId },
		orderBy: {
			createdAt: 'desc',
		},
	});
};

interface GetSchemaByIdQueryInput {
	schemaId: string;
}

export const getSchemaByIdQuery = async ({ schemaId }: GetSchemaByIdQueryInput) => {
	return await prisma.schema.findFirst({ where: { id: schemaId } });
};
