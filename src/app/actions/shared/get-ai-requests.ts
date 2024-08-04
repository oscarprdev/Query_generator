'use server';

import { auth } from '@/auth';
import { OPENAI_API_KEY } from '@/constants/envs';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse, successResponse } from '@/lib/either';
import { getAIrequestsQuery } from '@/services/queries/get-user.query';

type GetAiRequestsInput = {
	apiKey: string | null;
};

export const getAiRequests = async ({ apiKey }: GetAiRequestsInput) => {
	const session = await auth();
	const user = session?.user;

	if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

	const response = await getAIrequestsQuery({ userId: user.id });
	if (!response) {
		return errorResponse(ERRORS_MESSAGES.AI_REQUESTS);
	} else if (response.aiRequests === 0 && !apiKey) {
		return errorResponse(ERRORS_MESSAGES.AI_REQUESTS_NOT_ENOUGH);
	} else if (response.aiRequests > 0 && !apiKey) {
		return successResponse(OPENAI_API_KEY);
	} else {
		return successResponse(apiKey);
	}
};
