'use server';

import { auth } from '@/auth';
import { OPENAI_API_KEY } from '@/constants/envs';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse, successResponse } from '@/lib/either';
import { getTablesListQuery } from '@/services/queries/get-tables-list.query';
import { createOpenAI } from '@ai-sdk/openai';
import { Databases } from '@prisma/client';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

type GenerateSeedInput = {
	projectTitle: string;
	type: Databases;
	table: string;
	apiKey: string | null;
};

export const generateSeed = async ({ projectTitle, table, type, apiKey }: GenerateSeedInput) => {
	try {
		const session = await auth();
		const user = session?.user;

		if (!user) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);

		const tablesResponse = await getTablesListQuery({ title: projectTitle });
		const tableSelected = tablesResponse.filter(tab => tab.title.toLowerCase() === table.toLowerCase());

		const prompt: string = `
        Your role is to be an experienced backend developer with a huge expertise in generating queries for ${type} database.
        So based on the table rows: ${JSON.stringify(tableSelected[0].rows)} I want you to provide the seed for the database: ${type}
        with each field following the table ${tableSelected[0].title}, with its types, constraints and defaultValues.

        The seed provided must have maximum 5 items, fullfilled with randomized data according to the fields provided above.
        The data provided must be as much realistic as possible, avoiding generic values, so the data provided could be based on real databases.

        Your response will be injected directly into a <code/> html tag. So your response must be only the code to create the seed asked.
		Not provide any context, no comments nor extra information, just stick to the current prompt.
		The language used to generate the schema will be SQL if the table type is PostgreSQL and in case of MongoDb the language will be Javascript with ES Modules.
    `;

		const openai = createOpenAI({
			compatibility: 'strict',
			apiKey: apiKey || OPENAI_API_KEY,
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
				return errorResponse(ERRORS_MESSAGES.GENERATING_SEEDS);
			}
		})();

		return successResponse({ output: stream.value });
	} catch (error) {
		console.error(error);
		return errorResponse(ERRORS_MESSAGES.GENERATING_SEEDS);
	}
};
