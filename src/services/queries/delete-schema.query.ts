import prisma from '../db';

interface DeleteSchemaQueryInput {
	schemaId: string;
}

export const deleteSchemaQuery = async ({ schemaId }: DeleteSchemaQueryInput) => {
	await prisma.schema.delete({ where: { id: schemaId } });
};
