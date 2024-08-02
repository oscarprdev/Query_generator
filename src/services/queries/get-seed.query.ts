import prisma from '../db';

interface GetSeedByIdQueryInput {
	seedId: string;
}

export const getSeedByIdQuery = async ({ seedId }: GetSeedByIdQueryInput) => {
	console.log(seedId);
	return await prisma.seed.findFirst({ where: { id: seedId } });
};

interface GetSeedsListQueryInput {
	projectId?: string;
}

export const getSeedsListQuery = async ({ projectId }: GetSeedsListQueryInput) => {
	if (!projectId) return [];

	return await prisma.seed.findMany({
		where: { projectId },
		orderBy: {
			createdAt: 'desc',
		},
	});
};
