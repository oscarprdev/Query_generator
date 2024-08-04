'use server';

import { auth } from '@/auth';
import { getTablesListQuery } from '@/services/queries/get-tables-list.query';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { createOpenAI } from '@ai-sdk/openai';
import { Databases } from '@prisma/client';
import { OPENAI_API_KEY } from '@/constants/envs';
import { errorResponse, isError, successResponse } from '@/lib/either';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { getAiRequests } from '../shared/get-ai-requests';
import { updateAiRequestsQuery } from '@/services/queries/update-ai-requests.query';

type GenerateSchemaInput = {
	projectTitle: string;
	type: Databases;
	table: string;
	apiKey: string | null;
};

export const generateSchema = async ({ projectTitle, table, type, apiKey }: GenerateSchemaInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		const aiResponse = await getAiRequests({ apiKey });
		if (isError(aiResponse)) return errorResponse(aiResponse.error);

		const tablesResponse = await getTablesListQuery({ title: projectTitle, ownerId: user.id });
		const tableSelected = tablesResponse.filter(tab => tab.title.toLowerCase() === table.toLowerCase());

		const prompt: string = `
        Your role is to be an experienced backend developer with a huge expertise in generating queries for ${type} database.
        So based on the table rows: ${JSON.stringify(tableSelected[0].rows)} I want you to provide the schema for the database: ${type}
        with each field following the table ${tableSelected[0].title}, with its types, constraints and defaultValues.

        Your response will be injected directly into a <code/> html tag. So your response must be only the schema needed.
		Not provide any context, no comments nor extra information, just stick to the current prompt.
		The language used to generate the schema will be SQL if the table type is PostgreSQL and in case of MongoDb the language will be Javascript with ES Modules.
    `;

		const openai = createOpenAI({
			compatibility: 'strict',
			apiKey: aiResponse.success || '',
		});

		const stream = createStreamableValue('');

		(async () => {
			try {
				const { textStream } = await streamText({
					model: openai('gpt-4o'),
					prompt,
				});

				for await (const delta of textStream) {
					stream.update(delta);
				}

				stream.done();
			} catch (error) {
				stream.error(ERRORS_MESSAGES.GENERATING_SCHEMAS);
			}
		})();

		await updateAiRequestsQuery({ userId: user.id });

		return successResponse({ output: stream.value });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.GENERATING_SCHEMAS);
	}
};
