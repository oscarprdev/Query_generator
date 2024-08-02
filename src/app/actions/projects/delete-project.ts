'use server';

import { auth } from '@/auth';
import { deleteProjectQuery } from '@/services/queries/delete-project.query';
import { Databases } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface DeleteProjectInput {
	projectId: string;
}

export const deleteProject = async ({ projectId }: DeleteProjectInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return 'No se ha encontrado ningun usuario';

	await deleteProjectQuery({ projectId });

	revalidatePath('/');
};
