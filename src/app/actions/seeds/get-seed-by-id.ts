'use server';

import { getSeedByIdQuery } from '@/services/queries/get-seed.query';

type GetSeedByIdInput = {
	id: string;
};

export type Seed = {
	id: string;
	title: string;
	table: string;
	code: string;
	createdAt: Date;
	projectId: string;
};

export const getSeedById = async ({ id }: GetSeedByIdInput) => {
	const seed = await getSeedByIdQuery({ seedId: id });

	if (!seed) return null;

	return seed satisfies Seed;
};
