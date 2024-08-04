import { ERRORS_MESSAGES } from '@/constants/wordings';
import prisma from '../db';

interface UpdateAiRequestsQueryInput {
	userId: string;
}

export const updateAiRequestsQuery = async ({ userId }: UpdateAiRequestsQueryInput) => {
	const user = await prisma.users.findFirst({ where: { id: userId } });

	if (!user) {
		throw new Error(ERRORS_MESSAGES.USER_NOT_AUTH);
	}

	await prisma.users.update({
		where: {
			id: userId,
		},
		data: {
			aiRequests: user.aiRequests - 1,
		},
	});
};
