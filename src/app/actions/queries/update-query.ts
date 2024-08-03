'use server';

import { generateText } from 'ai';
import { auth } from '@/auth';
import { openai } from '@ai-sdk/openai';
import { revalidatePath } from 'next/cache';
import { updateQueryQuery } from '@/services/queries/create-query.query';
import { errorResponse } from '@/lib/either';
import { ERRORS_MESSAGES } from '@/constants/wordings';

type UpdateQueryInput = {
	code: string;
	id: string;
};

export const updateQuery = async ({ id, code }: UpdateQueryInput) => {
	try {
		const session = await auth();
		const userId = session?.user;

		if (!userId) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		const { text: description } = await generateText({
			model: openai('gpt-4o'),
			prompt: `Describe cual es la funcion de esta query: ${code}.
	    Tu respuesto no debe ser mas larga de 200 caracteres.
	    Responde directamente a la pregunta sin aportar ningun contexto por tu parte.`,
		});

		await updateQueryQuery({ code, description, queryId: id });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.UPDATING_QUERY);
	}

	revalidatePath('/');
};
