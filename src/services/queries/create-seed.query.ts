import prisma from '../db';

interface CreateSeedQueryInput {
	projectId: string;
	title: string;
	table: string;
	code: string;
}

export const createSeedQuery = async ({ projectId, title, table, code }: CreateSeedQueryInput) => {
	await prisma.seed.create({
		data: {
			title,
			table,
			code,
			projectId,
		},
	});
};

interface UpdateSeedQueryInput {
	seedId: string;
	code: string;
}

export const updateSeedQuery = async ({ seedId, code }: UpdateSeedQueryInput) => {
	await prisma.seed.update({
		where: { id: seedId },
		data: {
			code,
		},
	});
};
