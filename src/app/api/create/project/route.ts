import { RowInput } from '@/app/actions/tables/create-table';
import { auth } from '@/auth';
import { ERRORS_MESSAGES } from '@/constants/wordings';
import { generateProject } from '@/lib/ai';
import { errorResponse, isError } from '@/lib/either';
import { createProjectQuery } from '@/services/queries/create-project.query';
import { createTableQuery } from '@/services/queries/create-table.query';
import { Databases } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface CreateProjectInput {
	title: string;
	database: Databases;
	project?: string;
	apiKey: string | null;
}
export async function POST(request: NextRequest) {
	try {
		const { title, database, project, apiKey }: CreateProjectInput = await request.json();

		const session = await auth();
		const user = session?.user;

		if (!user || !user.id) return errorResponse(ERRORS_MESSAGES.USER_NOT_AUTH);
		if (project) {
			const response = await generateProject({ project, database, userId: user.id, apiKey });
			if (response && isError(response)) {
				return errorResponse(response.error);
			}

			const tables = response.success.tables;
			const projectCreated = await createProjectQuery({ ownerId: user.id, title, database });

			await Promise.all(
				tables.map(table =>
					createTableQuery({
						projectId: projectCreated.id,
						title: table.title,
						type: database,
						rows: table.rows as RowInput[],
					})
				)
			);

			return NextResponse.json({ status: 201 });
		}

		await createProjectQuery({ ownerId: user.id, title, database });

		return NextResponse.json({ status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText: ERRORS_MESSAGES.CREATING_PROJECT,
			}
		);
	}
}
