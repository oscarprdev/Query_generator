'use server';

import { auth } from '@/auth';
import { SALT } from '@/constants/envs';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { updateUserApiKeyQuery } from '@/services/queries/update-user-api-key.query';
import bcrypt from 'bcryptjs';

type UpdateApiKeyInput = {
	apikey: string;
};

export const updateApiKey = async ({ apikey }: UpdateApiKeyInput) => {
	const session = await auth();
	const user = session?.user;

	if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

	const apiKeyEncripted = await bcrypt.hash(apikey, SALT);

	await updateUserApiKeyQuery({ apiKey: apiKeyEncripted, userId: user.id });
};
