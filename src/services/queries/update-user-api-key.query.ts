import prisma from '../db';

interface UpdateUserApiKeyQueryInput {
	apiKey: string;
	userId: string;
}

export const updateUserApiKeyQuery = async ({ apiKey, userId }: UpdateUserApiKeyQueryInput) => {
	await prisma.users.update({ where: { id: userId }, data: { apiKey } });
};
