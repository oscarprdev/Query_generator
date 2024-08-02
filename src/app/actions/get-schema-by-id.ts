'use server';

import { getSchemaByIdQuery } from '@/services/queries/get-schemas-list';

type GetSchemaByIdInput = {
	id: string;
};

export type Schema = {
	id: string;
	title: string;
	table: string;
	code: string;
	createdAt: Date;
	projectId: string;
};

export const getSchemaById = async ({ id }: GetSchemaByIdInput) => {
	const schema = await getSchemaByIdQuery({ schemaId: id });

	if (!schema) return null;

	return schema satisfies Schema;
};
