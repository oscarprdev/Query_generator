'use client';

import React, { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import QueryForm, { QueryFormValues } from '../Forms/QueryForm';
import QueryGenerator from '../QueryGenerator/QueryGenerator';
import { Databases, QueryAction } from '@prisma/client';
import QueryView from '../QueryView/QueryView';
import { createQuery } from '@/app/actions/create-query';
import { cn } from '@/lib/utils';
import LoadingModalContent from './shared/LoadingModalContent';
import SuccessModalContent from './shared/SuccessModalContent';

type GenerateQueryModalContentProps = {
	projectTitle: string;
	type: Databases;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
};

type QueryPayload = {
	title: string;
	tables: string;
	action: QueryAction;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false };

const GenerateQueryModalContent = ({ projectTitle, type }: GenerateQueryModalContentProps) => {
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);
	const [payload, setPayload] = useState<QueryPayload>();
	const [component, setComponent] = useState<React.ReactNode>();

	useEffect(() => {
		setComponent(null);
		setPayload(undefined);
		setModalState(DEFAULT_MODAL_STATE);
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

		setPayload({ title: values.title, tables: values.tables.join(', '), action: values.action });
	};

	const handleStoreQuery = async () => {
		if (!payload || !component) return;

		setModalState({ success: false, loading: true });
		await createQuery({ ...payload, projectTitle, code: component });
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
						<DialogTitle>Genera tu propia query!</DialogTitle>
					</DialogHeader>
					{component && <QueryView handleStoreQuery={handleStoreQuery}>{component}</QueryView>}
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
