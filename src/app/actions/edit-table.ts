'use server';

import { auth } from '@/auth';
import { editTableQuery } from '@/services/queries/edit-table.query';
import { $Enums, Databases } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface EditTableInput {
	tableId: string;
	type: Databases;
	title: string;
	rows: {
		id?: string;
		name: string;
		value: string;
		reference: string;
		type: $Enums.MongoType | $Enums.PostgresType;
		constraints: $Enums.MongoConstraint | $Enums.PostgreConstraint;
	}[];
}

export const editTable = async (input: EditTableInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return 'No se ha encontrado ningun usuario';

	await editTableQuery(input);

	revalidatePath('/');
};
