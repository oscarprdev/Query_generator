'use server';

import { auth } from '@/auth';
import { updateProjectQuery } from '@/services/queries/create-project.query';
import { revalidatePath } from 'next/cache';

interface UpdateProjectInput {
	projectId: string;
	title: string;
}

export const updateProject = async ({ projectId, title }: UpdateProjectInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return 'No se ha encontrado ningun usuario';

	await updateProjectQuery({ projectId, title });

	revalidatePath('/');
};
