'use client';

import React, { startTransition, useEffect, useRef, useState } from 'react';
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
import { Button } from '../ui/button';
import { IconDots, IconSparkles } from '@tabler/icons-react';

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
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);
	const [payload, setPayload] = useState<QueryPayload>();
	const [query, setQuery] = useState<string>('');

	const codeRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setQuery('');
		setPayload(undefined);
		setModalState(DEFAULT_MODAL_STATE);
	}, []);

	const handleSubmit = async (values: QueryFormValues) => {
		setFormSubmitting(true);
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

		startTransition(() => {
			setPayload({ title: values.title, tables: values.tables.join(', '), action: values.action });
			setFormSubmitting(false);
		});
	};

	const handleStoreQuery = async (code: string) => {
		if (!payload || !query) return;

		setModalState({ success: false, loading: true });
		await createQuery({ ...payload, projectTitle, code });
		setModalState({ success: true, loading: false });
	};

	const handleReset = () => {
		setQuery('');
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
					{query.length > 0 && <QueryView database={type} query={query} />}
					<QueryForm
						handleSubmit={handleSubmit}
						handleReset={handleReset}
						type={type}
						projectTitle={projectTitle}
						defaultValues={{ title: '', tables: [], filters: [], action: 'read' }}>
						{query.length === 0 ? (
							<Button disabled={formSubmitting} type="submit">
								{formSubmitting ? (
									<IconDots size={18} className="min-w-[100px] animate-pulse text-zinc-800" />
								) : (
									<>
										<IconSparkles size={20} className="mr-1 text-zinc-500" />
										Generar query
									</>
								)}
							</Button>
						) : (
							!query.includes('Error') && (
								<Button
									onClick={() =>
										codeRef.current?.textContent && handleStoreQuery(codeRef.current.textContent)
									}>
									Guardar query
								</Button>
							)
						)}
					</QueryForm>
				</>
			)}
		</DialogContent>
	);
};

export default GenerateQueryModalContent;
