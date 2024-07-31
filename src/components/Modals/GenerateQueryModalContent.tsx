'use client';

import React, { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import QueryForm, { QueryFormValues } from '../Forms/QueryForm';
import QueryGenerator from '../QueryGenerator/QueryGenerator';
import { Databases } from '@prisma/client';
import QueryView from '../QueryView/QueryView';

type GenerateQueryModalContentProps = {
	projectTitle: string;
	type: Databases;
};

const GenerateQueryModalContent = ({ projectTitle, type }: GenerateQueryModalContentProps) => {
	const [component, setComponent] = useState<React.ReactNode>();

	useEffect(() => {
		setComponent(null);
	}, []);

	const handleSubmit = async (values: QueryFormValues) => {
		setComponent(
			await QueryGenerator({
				projectTitle,
				type,
				title: values.title,
				action: values.action,
				filters: values.filters,
				tables: values.tables,
				prompt: values.prompt || '',
			})
		);
	};

	return (
		<DialogContent className="sm:max-w-[625px]">
			<DialogHeader>
				<DialogTitle>Genera tu propia query!</DialogTitle>
			</DialogHeader>
			{component && <QueryView>{component}</QueryView>}
			<QueryForm
				handleSubmit={handleSubmit}
				type={type}
				projectTitle={projectTitle}
				reset={false}
				defaultValues={{ title: '', tables: [], filters: [], action: 'read' }}
				submitLabel="Generar query"
			/>
		</DialogContent>
	);
};

export default GenerateQueryModalContent;
