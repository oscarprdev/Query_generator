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
