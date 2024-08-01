'use server';

import { getSchemaByIdQuery } from '@/services/queries/get-schemas-list';

type GetSchemaByIdInput = {
	schemaId: string;
};

export const getSchemaById = async ({ schemaId }: GetSchemaByIdInput) => {
	return await getSchemaByIdQuery({ schemaId });
};
