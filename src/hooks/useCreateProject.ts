import { API_URL } from '@/constants/envs';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { errorResponse } from '@/lib/either';
import { Databases } from '@prisma/client';

interface CreateProjectInput {
	title: string;
	database: Databases;
	project?: string;
	apiKey: string | null;
}

export const useCreateProject = () => {
	const createProject = async (input: CreateProjectInput) => {
		try {
			const response = await fetch(`${API_URL}/api/create/project`, {
				method: 'POST',
				body: JSON.stringify(input),
			});

			const jsonResponse = await response.json();
			console.log(jsonResponse);
		} catch (error) {
			console.error(error);
			return errorResponse(ERRORS_MESSAGES.CREATING_PROJECT);
		}
	};

	return { createProject };
};
