'use server';

import { auth } from '@/auth';
import { deleteSeedQuery } from '@/services/queries/delete-seed.query';
import { revalidatePath } from 'next/cache';

interface DeleteSeedInput {
	id: string;
}

export const deleteSeed = async ({ id }: DeleteSeedInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	await deleteSeedQuery({ seedId: id });

	revalidatePath('/');
};
