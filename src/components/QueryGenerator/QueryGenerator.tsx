'use server';

import { getTablesListQuery } from '@/services/queries/get-tables-list.query';
import { openai } from '@ai-sdk/openai';
import { $Enums, Databases } from '@prisma/client';
import { streamUI } from 'ai/rsc';

type QueryGeneratorProps = {
	projectTitle: string;
	type: Databases;
	title: string;
	action: $Enums.QueryAction;
	tables: string[];
	filters: string[];
	prompt: string;
};

const QueryGenerator = async ({ projectTitle, type, title, action, tables, filters, prompt }: QueryGeneratorProps) => {
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

	// const result = await streamUI({
	// 	model: openai('gpt-4o'),
	// 	prompt: aIprompt,
	// 	text: ({ content }) => <p>{content.replaceAll('`', '')}</p>,
	// 	tools: {},
	// });
	// return result.value;

	return <p>{`SELECT * FROM Users WHERE id = "11"`}</p>;
};

export default QueryGenerator;
