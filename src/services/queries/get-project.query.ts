import prisma from '../db';

interface GetProjectByTitleQueryInput {
	title?: string;
}

export const getProjectByTitleQuery = async ({ title }: GetProjectByTitleQueryInput) => {
	if (!title) return null;

	return await prisma.project.findFirst({
		where: {
			title,
		},
	});
};

interface GetProjectByTitleAndUserIdQueryInput {
	title?: string;
	userId?: string;
}

export const getProjectByTitleAndUserIdQuery = async ({ title, userId }: GetProjectByTitleAndUserIdQueryInput) => {
	if (!title || !userId) return null;

	return await prisma.project.findFirst({
		where: {
			title,
			ownerId: userId,
		},
	});
};
