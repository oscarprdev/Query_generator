'use server';

import { auth } from '@/auth';
import { updateSchemaQuery } from '@/services/queries/create-schema.query';
import { revalidatePath } from 'next/cache';

type UpdateSchemaInput = {
	code: string;
	id: string;
};

export const updateSchema = async ({ id, code }: UpdateSchemaInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	await updateSchemaQuery({ code, schemaId: id });

	revalidatePath('/');
};
