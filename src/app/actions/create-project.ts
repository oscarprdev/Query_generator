'use server';

import { auth } from '@/auth';
import { createProjectQuery } from '@/services/queries/create-project.query';
import { Databases } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface CreateProjectInput {
	title: string;
	database: Databases;
}

export const createProject = async ({ title, database }: CreateProjectInput) => {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) return 'No se ha encontrado ningun usuario';

	await createProjectQuery({ ownerId: userId, title, database });

	revalidatePath('/');
};
