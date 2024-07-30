import { Databases } from '@prisma/client';
import prisma from '../db';

export interface CreateProjectQueryInput {
	ownerId: string;
	title: string;
	database: Databases;
}

export const createProjectQuery = async ({ ownerId, title, database }: CreateProjectQueryInput) => {
	try {
		console.log(ownerId, database);
		await prisma.project.create({
			data: {
				ownerId,
				title,
				database,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
