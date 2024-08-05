import { createGeneratedProject } from '@/app/actions/projects/create-generated-project';
import { createSingleProject } from '@/app/actions/projects/create-project';
import { generateProject } from '@/app/actions/projects/generate-project';
import { RowInput } from '@/app/actions/tables/create-table';
import { errorResponse, isError } from '@/lib/either';
import { Databases } from '@prisma/client';

interface CreateProjectInput {
	title: string;
	database: Databases;
	project?: string;
	apiKey: string | null;
}

export const useCreateProject = () => {
	const createProject = async ({ title, database, project, apiKey }: CreateProjectInput) => {
		if (!project) {
			await createSingleProject({ title, database });
			return;
		}

		if (project) {
			const response = await generateProject({ project, database, apiKey });
			if (response && isError(response)) {
				return errorResponse(response.error);
			}

			await createGeneratedProject({
				title,
				database,
				tables: response.success.tables.map(tab => ({ title: tab.title, rows: tab.rows as RowInput[] })),
			});
		}
	};

	return { createProject };
};
