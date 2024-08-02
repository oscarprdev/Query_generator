'use server';

import { auth } from '@/auth';
import { getTablesListQuery } from '@/services/queries/get-tables-list.query';
import { openai } from '@ai-sdk/openai';
import { Databases } from '@prisma/client';
import { streamText } from 'ai';
import { createStreamableValue, StreamableValue } from 'ai/rsc';

type GenerateSeedInput = {
	projectTitle: string;
	type: Databases;
	table: string;
};

export const generateSeed = async ({ projectTitle, table, type }: GenerateSeedInput) => {
	const session = await auth();
	const userId = session?.user?.name;

	if (!userId) return { output: 'Usuario no autorizado' as StreamableValue<string, any> };

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

	const stream = createStreamableValue('');

	(async () => {
		const { textStream } = await streamText({
			model: openai('gpt-4o'),
			prompt,
		});

		for await (const delta of textStream) {
			stream.update(delta);
		}

		stream.done();
	})();

	return { output: stream.value };
};
