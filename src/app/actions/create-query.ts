'use server';

import { generateText } from 'ai';
import { auth } from '@/auth';
import { QueryAction } from '@prisma/client';
import { openai } from '@ai-sdk/openai';
import { ReactNode } from 'react';
import { getProjectByTitleQuery } from '@/services/queries/get-project.query';
import { createQueryQuery } from '@/services/queries/create-query.query';
import { revalidatePath } from 'next/cache';

type CreateQueryInput = {
	title: string;
	tables: string;
	action: QueryAction;
	code: ReactNode;
	projectTitle: string;
};

export const createQuery = async ({ title, tables, action, code, projectTitle }: CreateQueryInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return null;

	const codeParsed = JSON.stringify(code);

	const { text } = await generateText({
		model: openai('gpt-4o'),
		prompt: `Describe cual es la funcion de esta query: ${codeParsed}. 
        Tu respuesto no debe ser mas larga de 200 caracteres. 
        Responde directamente a la pregunta sin aportar ningun contexto por tu parte.`,
	});

	const project = await getProjectByTitleQuery({ title: projectTitle });
	if (!project) return null;

	await createQueryQuery({ title, tables, action, code: codeParsed, description: text, projectId: project.id });

	revalidatePath('/');
};
