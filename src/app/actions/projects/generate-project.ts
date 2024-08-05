'use server';

import { errorResponse, isError } from '@/lib/either';
import { getAiRequests } from '../shared/get-ai-requests';
import { createOpenAI } from '@ai-sdk/openai';

type GenerateProjectInput = {
	project: string;
	userId: string;
	apiKey: string | null;
};

export const generateProject = async ({ project, userId, apiKey }: GenerateProjectInput) => {
	const aiResponse = await getAiRequests({ apiKey });
	if (isError(aiResponse)) return errorResponse(aiResponse.error);

	const openai = createOpenAI({
		compatibility: 'strict',
		apiKey: aiResponse.success || '',
	});

    
};
