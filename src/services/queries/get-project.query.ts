import prisma from '../db';

interface GetProjectsQueryInput {
	ownerId?: string;
}

export const getProjectsQuery = async ({ ownerId }: GetProjectsQueryInput) => {
	if (!ownerId) return null;

	return await prisma.project.findMany({
		where: {
			ownerId,
		},
	});
};
