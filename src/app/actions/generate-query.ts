'use server';

import { getTablesListQuery } from '@/services/queries/get-tables-list.query';
import { $Enums, Databases } from '@prisma/client';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

type GenerateQueryInput = {
	projectTitle: string;
	type: Databases;
	title: string;
	action: $Enums.QueryAction;
	tables: string[];
	filters: string[];
	prompt: string;
};

export const generateQuery = async ({
	projectTitle,
	type,
	title,
	action,
	tables,
	filters,
	prompt,
}: GenerateQueryInput) => {
	const tablesResponse = await getTablesListQuery({ title: projectTitle });

	const aIprompt: string = `
	    Your role is to be an experienced backend developer with a huge expertise in generating queries for ${type} database.
	    So based on these tables: ${JSON.stringify(tablesResponse)} I need you to provide the query needed to ${action} the information
	    coming from the tables: ${tables.join(', ')} filtered by the values: ${filters.join(', ')}. In addition, take into account that I want also
	    ${prompt}.

	    Your response will be injected directly into a <code/> html tag. So your response must be only the query needed.
		Not provide any context or extra information, just stick to the current prompt.
		The language used to generate the query will be SQL if the table type is PostgreSQL and in case of MongoDb the language will be Javascript
	`;

	const stream = createStreamableValue('');

	(async () => {
		const { textStream } = await streamText({
			model: openai('gpt-4o'),
			prompt: aIprompt,
		});

		for await (const delta of textStream) {
			stream.update(delta);
		}

		stream.done();
	})();

	return { output: stream.value };
};
