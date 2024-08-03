'use server';

import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { updateSeedQuery } from '@/services/queries/create-seed.query';
import { revalidatePath } from 'next/cache';

type UpdateSeedInput = {
	code: string;
	id: string;
};

export const updateSeed = async ({ id, code }: UpdateSeedInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		await updateSeedQuery({ code, seedId: id });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.UPDATING_SEED);
	}

	revalidatePath('/');
};
