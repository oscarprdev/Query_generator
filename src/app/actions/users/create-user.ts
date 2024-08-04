'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { auth, signIn } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse, successResponse } from '@/lib/either';
import { createUserQuery } from '@/services/queries/create-user.query';

export const createUser = async () => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user) {
			const id = crypto.randomUUID().toString();
			await createUserQuery({ userId: id });
			await signIn('credentials', { id });

			return successResponse(id);
		}

		return successResponse(user.id);
	} catch (error) {
		if (!isRedirectError(error)) {
			console.error(error);
			return errorResponse(ERRORS_MESSAGES.CREATING_USER);
		}
	}
};
