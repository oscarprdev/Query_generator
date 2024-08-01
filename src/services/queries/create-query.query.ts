import { QueryAction } from '@prisma/client';
import prisma from '../db';

interface CreateQueryQueryInput {
	title: string;
	tables: string;
	action: QueryAction;
	code: string;
	description: string;
	projectId: string;
}

export const createQueryQuery = async ({
	title,
	tables,
	action,
	code,
	description,
	projectId,
}: CreateQueryQueryInput) => {
	await prisma.query.create({
		data: {
			title,
			tables,
			action,
			code,
			description,
			projectId,
		},
	});
};

interface UpdateQueryQueryInput {
	queryId: string;
	code: string;
	description: string;
}

export const updateQueryQuery = async ({ queryId, code, description }: UpdateQueryQueryInput) => {
	await prisma.query.update({
		where: { id: queryId },
		data: {
			code,
			description,
		},
	});
};
