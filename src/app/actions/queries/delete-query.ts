'use server';

import { auth } from '@/auth';
import { deleteQueryQuery } from '@/services/queries/delete-query.query';
import { revalidatePath } from 'next/cache';

interface DeleteQueryInput {
	id: string;
}

export const deleteQuery = async ({ id }: DeleteQueryInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	await deleteQueryQuery({ queryId: id });

	revalidatePath('/');
};
