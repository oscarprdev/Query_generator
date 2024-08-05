'use server';

import { auth } from '@/auth';
import { updateAiRequestsQuery } from '@/services/queries/update-ai-requests.query';

export const updateAiRequests = async () => {
	const session = await auth();
	const user = session?.user;

	if (!user || !user.id) return null;

	await updateAiRequestsQuery({ userId: user.id });
};
