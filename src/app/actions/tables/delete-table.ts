'use server';

import { auth } from '@/auth';
import { deleteTableQuery } from '@/services/queries/delete-table.query';
import { Databases } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface DeleteTableInput {
	tableId: string;
	type: Databases;
}

export const deleteTable = async ({ tableId, type }: DeleteTableInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return 'No se ha encontrado ningun usuario';

	await deleteTableQuery({ tableId, type });

	revalidatePath('/');
};
