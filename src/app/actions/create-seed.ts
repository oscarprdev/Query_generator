'use server';

import { auth } from '@/auth';
import { getProjectByTitleQuery } from '@/services/queries/get-project.query';
import { revalidatePath } from 'next/cache';
import { createSeedQuery } from '@/services/queries/create-seed.query';

type CreateSeedInput = {
	title: string;
	table: string;
	code: string;
	projectTitle: string;
};

export const createSeed = async ({ title, table, code, projectTitle }: CreateSeedInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	const project = await getProjectByTitleQuery({ title: projectTitle });
	if (!project) return null;

	await createSeedQuery({ title, table, code, projectId: project.id });

	revalidatePath('/');
};
