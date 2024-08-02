import prisma from '../db';

interface DeleteSeedQueryInput {
	seedId: string;
}

export const deleteSeedQuery = async ({ seedId }: DeleteSeedQueryInput) => {
	await prisma.seed.delete({ where: { id: seedId } });
};
