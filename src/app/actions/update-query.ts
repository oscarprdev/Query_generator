'use server';

import { generateText } from 'ai';
import { auth } from '@/auth';
import { openai } from '@ai-sdk/openai';
import { revalidatePath } from 'next/cache';
import { updateQueryQuery } from '@/services/queries/create-query.query';

type UpdateQueryInput = {
	code: string;
	queryId: string;
};

export const updateQuery = async ({ queryId, code }: UpdateQueryInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	const { text: description } = await generateText({
		model: openai('gpt-4o'),
		prompt: `Describe cual es la funcion de esta query: ${code}.
	    Tu respuesto no debe ser mas larga de 200 caracteres.
	    Responde directamente a la pregunta sin aportar ningun contexto por tu parte.`,
	});

	await updateQueryQuery({ code, description, queryId });

	revalidatePath('/');
};
