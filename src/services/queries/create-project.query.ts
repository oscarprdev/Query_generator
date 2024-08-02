import { Databases } from '@prisma/client';
import prisma from '../db';

export interface CreateProjectQueryInput {
	ownerId: string;
	title: string;
	database: Databases;
}

export const createProjectQuery = async ({ ownerId, title, database }: CreateProjectQueryInput) => {
	await prisma.project.create({
		data: {
			ownerId,
			title,
			database,
		},
	});
};

interface UpdateProjectQueryInput {
	projectId: string;
	title: string;
}

export const updateProjectQuery = async ({ projectId, title }: UpdateProjectQueryInput) => {
	await prisma.project.update({
		where: { id: projectId },
		data: {
			title,
		},
	});
};
