'use server';

import { generateText } from 'ai';
import { auth } from '@/auth';
import { QueryAction } from '@prisma/client';
import { createOpenAI } from '@ai-sdk/openai';
import { getProjectByTitleQuery } from '@/services/queries/get-project.query';
import { createQueryQuery } from '@/services/queries/create-query.query';
import { revalidatePath } from 'next/cache';
import { OPENAI_API_KEY } from '@/constants/envs';
import { errorResponse } from '@/lib/either';
import { ERRORS_MESSAGES } from '@/constants/wordings';

type CreateQueryInput = {
	title: string;
	tables: string;
	action: QueryAction;
	code: string;
	projectTitle: string;
	apiKey: string | null;
};

export const createQuery = async ({ title, tables, action, code, projectTitle, apiKey }: CreateQueryInput) => {
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

		const project = await getProjectByTitleQuery({ title: projectTitle });
		if (!project) return errorResponse(ERRORS_MESSAGES.PROJECT_NOT_FOUND);

		await createQueryQuery({ title, tables, action, code, description, projectId: project.id });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.CREATING_QUERIES);
	}

	revalidatePath('/');
};
