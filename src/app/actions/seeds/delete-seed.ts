'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { deleteSeedQuery } from '@/services/queries/delete-seed.query';
import { revalidatePath } from 'next/cache';

interface DeleteSeedInput {
	id: string;
}

export const deleteSeed = async ({ id }: DeleteSeedInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await deleteSeedQuery({ seedId: id });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.DELETTING_SEED);
	}

	revalidatePath('/');
};
