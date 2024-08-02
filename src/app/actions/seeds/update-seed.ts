'use server';

import { auth } from '@/auth';
import { updateSeedQuery } from '@/services/queries/create-seed.query';
import { revalidatePath } from 'next/cache';

type UpdateSeedInput = {
	code: string;
	id: string;
};

export const updateSeed = async ({ id, code }: UpdateSeedInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	await updateSeedQuery({ code, seedId: id });

	revalidatePath('/');
};
