'use server';

import { auth, signIn } from '@/auth';
import { createUserQuery } from '@/services/queries/create-user.query';

export const createUser = async () => {
	const session = await auth();
	const user = session?.user;

	if (!user) {
		const id = crypto.randomUUID().toString();
		await createUserQuery({ userId: id });
		await signIn('credentials', { id });

		return id;
	}

	return user.id;
};
