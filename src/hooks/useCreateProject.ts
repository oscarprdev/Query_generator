import { createGeneratedProject, TableInput } from '@/app/actions/projects/create-generated-project';
import { createSingleProject } from '@/app/actions/projects/create-project';
import { generateProject } from '@/app/actions/projects/generate-project';
import { RowInput } from '@/app/actions/tables/create-table';
import { errorResponse, isError } from '@/lib/either';
import { Databases } from '@prisma/client';
import { readStreamableValue } from 'ai/rsc';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CreateProjectInput {
	title: string;
	database: Databases;
	project?: string;
	apiKey: string | null;
}

export const useCreateProject = () => {
	const router = useRouter();
	const [data, setData] = useState({ isFinished: false, title: '', database: '' });
	const [isGenerating, setIsGenerating] = useState(false);
	const [tables, setTables] = useState<TableInput[]>([]);

	const createProject = async ({ title, database, project, apiKey }: CreateProjectInput) => {
		setData({ ...data, isFinished: false });

		if (!project) {
			await createSingleProject({ title, database });
			return;
		}

		setIsGenerating(true);
		const response = await generateProject({ project, database, apiKey });

		if (response && isError(response)) {
			setIsGenerating(false);
			return errorResponse(response.error);
		}

		for await (const delta of readStreamableValue(response.success)) {
			setTables(delta.tables);
		}

		setData({ isFinished: true, title, database });
	};

	useEffect(() => {
		const handleGeneration = async (tables: TableInput[]) => {
			setIsGenerating(false);
			await createGeneratedProject({
				title: data.title,
				database: data.database as Databases,
				tables: tables.map(tab => ({ title: tab.title, rows: tab.rows as RowInput[] })),
			});

			setTables([]);

			router.push(`/?project=${data.title}`);
		};

		if (data.isFinished && tables.length > 0) {
			handleGeneration(tables);
		}
	}, [tables, data]);

	return { createProject, isGenerating };
};
