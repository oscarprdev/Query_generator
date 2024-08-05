'use server';

import { errorResponse, isError, successResponse } from '@/lib/either';
import { getAiRequests } from '../shared/get-ai-requests';
import { createOpenAI } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';
import { $Enums, Databases } from '@prisma/client';
import { createStreamableValue } from 'ai/rsc';
import { ERRORS_MESSAGES } from '@/constants/wordings';

type GenerateProjectInput = {
	project: string;
	database: Databases;
	apiKey: string | null;
};

export const generateProject = async ({ project, database, apiKey }: GenerateProjectInput) => {
	try {
		const aiResponse = await getAiRequests({ apiKey });
		if (isError(aiResponse)) return errorResponse(aiResponse.error);

		const openai = createOpenAI({
			compatibility: 'strict',
			apiKey: aiResponse.success || '',
		});

		let tables;
		switch (database) {
			case Databases.mongoDb:
				tables = z.array(
					z.object({
						title: z.string(),
						rows: z.array(
							z.object({
								name: z.string(),
								value: z.string(),
								reference: z.string(),
								type: z.enum(Object.values($Enums.MongoType) as [string, ...string[]]),
								constraints: z.enum(Object.values($Enums.MongoConstraint) as [string, ...string[]]),
							})
						),
					})
				);
				break;
			case Databases.postgreSQL:
				tables = z.array(
					z.object({
						title: z.string(),
						rows: z.array(
							z.object({
								name: z.string(),
								value: z.string(),
								reference: z.string(),
								type: z.enum(Object.values($Enums.PostgresType) as [string, ...string[]]),
								constraints: z.enum(Object.values($Enums.PostgreConstraint) as [string, ...string[]]),
							})
						),
					})
				);
				break;
			default:
				break;
		}

		if (!tables) throw new Error('El tipo de base de datos no es valido');

		const stream = createStreamableValue();
		(async () => {
			try {
				const { partialObjectStream } = await streamObject({
					model: openai('gpt-4o'),
					schema: z.object({
						tables,
					}),
					prompt: ` 
			Your role is to be an experienced backend developer with a huge expertise in generating queries for ${database} database.
			Based on this JSON file: ${project} I want you to provide the tables and rows that you can detect on the file. 
			It is mandatory to follow the structured data needed on the output based strictly on the JSON file provided.
            The rows value is just used as reference, the number of tables must be the same as the tables array length.
			Regarding the table title, provide an appropiate table title based on the JSON data for each table provided.
			`,
				});

				for await (const partialObject of partialObjectStream) {
					stream.update(partialObject);
				}

				stream.done();
			} catch (error) {
				stream.error(ERRORS_MESSAGES.GENERATING_PROJECT);
			}
		})();

		return successResponse(stream.value);
	} catch (error) {
		return errorResponse(error as string);
	}
};
