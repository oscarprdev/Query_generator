import prisma from '../db';

interface CreateUserQueryInput {
	userId: string;
}

export const createUserQuery = async ({ userId }: CreateUserQueryInput) => {
	await prisma.users.create({
		data: {
			id: userId,
		},
	});
};
