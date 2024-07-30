import prisma from '../db';

interface GetProjectListQueryInput {
	ownerId?: string;
}

export const getProjectListQuery = async ({ ownerId }: GetProjectListQueryInput) => {
	if (!ownerId) return null;

	return await prisma.project.findMany({
		where: {
			ownerId,
		},
	});
};
