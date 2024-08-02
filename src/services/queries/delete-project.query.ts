import prisma from '../db';

interface DeleteProjectQueryInput {
	projectId: string;
}

export const deleteProjectQuery = async ({ projectId }: DeleteProjectQueryInput) => {
	await prisma.project.delete({ where: { id: projectId } });
};
