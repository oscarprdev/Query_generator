'use client';

import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import QueryView from '../QueryView/QueryView';
import { useEffect, useState } from 'react';
import { $Enums } from '@prisma/client';
import { getQueryById } from '@/app/actions/get-query-by-id';

type ReviewQueryModalContentProps = {
	queryId: string;
};

type Query = {
	id: string;
	title: string;
	description: string;
	tables: string;
	action: $Enums.QueryAction;
	code: string;
	createdAt: Date;
	projectId: string;
};

const ReviewQueryModalContent = ({ queryId }: ReviewQueryModalContentProps) => {
	const [query, setQuery] = useState<Query | null>(null);

	useEffect(() => {
		const handleQuery = async () => {
			const query = await getQueryById({ queryId });

			setQuery(query);
		};

		handleQuery();
	}, [queryId]);

	const handleStoreQuery = async (code: string) => {
		console.log(code);
	};

	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Detalles de tu query!</DialogTitle>
			</DialogHeader>
			<QueryView props={{ handleStoreQuery, content: query?.code }}>
				<QueryView.EditQueryCTA />
			</QueryView>
		</DialogContent>
	);
};

export default ReviewQueryModalContent;
