'use server';

import { generateText } from 'ai';
import { auth } from '@/auth';
import { createOpenAI } from '@ai-sdk/openai';
import { revalidatePath } from 'next/cache';
import { updateQueryQuery } from '@/services/queries/create-query.query';
import { errorResponse } from '@/lib/either';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { OPENAI_API_KEY } from '@/constants/envs';
import { updateAiRequestsQuery } from '@/services/queries/update-ai-requests.query';

type UpdateQueryInput = {
	code: string;
	id: string;
	apiKey: string | null;
};

export const updateQuery = async ({ id, code, apiKey }: UpdateQueryInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		const openai = createOpenAI({
			compatibility: 'strict',
			apiKey: apiKey || OPENAI_API_KEY,
		});

		const { text: description } = await generateText({
			model: openai('gpt-4o'),
			prompt: `Describe cual es la funcion de esta query: ${code}.
	    Tu respuesto no debe ser mas larga de 200 caracteres.
	    Responde directamente a la pregunta sin aportar ningun contexto por tu parte.`,
		});

		await updateAiRequestsQuery({ userId: user.id });

		await updateQueryQuery({ code, description, queryId: id });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.UPDATING_QUERY);
	}

	revalidatePath('/');
};
