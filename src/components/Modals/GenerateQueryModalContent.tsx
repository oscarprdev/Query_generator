'use client';

import React, { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import QueryForm, { QueryFormValues } from '../Forms/QueryForm';
import { Databases, QueryAction } from '@prisma/client';
import QueryView from '../QueryView/QueryView';
import { createQuery } from '@/app/actions/create-query';
import { cn } from '@/lib/utils';
import LoadingModalContent from './shared/LoadingModalContent';
import SuccessModalContent from './shared/SuccessModalContent';
import { generateQuery } from '@/app/actions/generate-query';
import { readStreamableValue } from 'ai/rsc';

type GenerateQueryModalContentProps = {
	projectTitle: string;
	type: Databases;
};

type QueryPayload = {
	title: string;
	tables: string;
	action: QueryAction;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false };

export const maxDuration = 30;

const GenerateQueryModalContent = ({ projectTitle, type }: GenerateQueryModalContentProps) => {
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);
	const [payload, setPayload] = useState<QueryPayload>();
	const [query, setQuery] = useState<string>('');

	useEffect(() => {
		setQuery('');
		setPayload(undefined);
		setModalState(DEFAULT_MODAL_STATE);
	}, []);

	const handleSubmit = async (values: QueryFormValues) => {
		const { output } = await generateQuery({
			projectTitle,
			type,
			title: values.title,
			action: values.action,
			filters: values.filters,
			tables: values.tables,
			prompt: values.prompt || '',
		}).finally(() => setQuery(''));

		for await (const delta of readStreamableValue(output)) {
			setQuery(currentQuery => `${currentQuery}${delta}`);
		}

		setPayload({ title: values.title, tables: values.tables.join(', '), action: values.action });
	};

	const handleStoreQuery = async (code: string) => {
		if (!payload || !query) return;

		setModalState({ success: false, loading: true });
		await createQuery({ ...payload, projectTitle, code });
		setModalState({ success: true, loading: false });
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]')}>
			{modalState.loading && !modalState.success ? (
				<LoadingModalContent text="Guardando query ..." />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text="Query guardada correctamente!" />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Genera tu propia query</DialogTitle>
					</DialogHeader>
					{query.length > 0 && (
						<QueryView
							database={type}
							error={query.includes('Error')}
							query={query}
							handleStoreQuery={handleStoreQuery}
							kind="create"
						/>
					)}
					<QueryForm
						handleSubmit={handleSubmit}
						type={type}
						projectTitle={projectTitle}
						reset={false}
						defaultValues={{ title: '', tables: [], filters: [], action: 'read' }}
						submitLabel="Generar query"
					/>
				</>
			)}
		</DialogContent>
	);
};

export default GenerateQueryModalContent;
