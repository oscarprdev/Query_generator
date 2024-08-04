import prisma from '../db';

interface GetUserQueryInput {
	userId: string;
}

export const getUserQuery = async ({ userId }: GetUserQueryInput) => {
	return await prisma.users.findFirst({ where: { id: userId } });
};

export const getAIrequestsQuery = async ({ userId }: GetUserQueryInput) => {
	return await prisma.users.findFirst({
		where: { id: userId },
		select: {
			aiRequests: true,
		},
	});
};
