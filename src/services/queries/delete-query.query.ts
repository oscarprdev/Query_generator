import prisma from '../db';

interface DeleteQueryQueryInput {
	queryId: string;
}

export const deleteQueryQuery = async ({ queryId }: DeleteQueryQueryInput) => {
	await prisma.query.delete({ where: { id: queryId } });
};
