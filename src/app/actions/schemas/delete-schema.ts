'use server';

import { auth } from '@/auth';
import { deleteSchemaQuery } from '@/services/queries/delete-schema.query';
import { revalidatePath } from 'next/cache';

interface DeleteSchemaInput {
	id: string;
}

export const deleteSchema = async ({ id }: DeleteSchemaInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	await deleteSchemaQuery({ schemaId: id });

	revalidatePath('/');
};
