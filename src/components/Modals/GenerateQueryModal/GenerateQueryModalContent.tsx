'use client';

import React, { startTransition, useContext, useEffect, useRef, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import QueryForm, { QueryFormValues } from '../../Forms/QueryForm';
import { Databases, QueryAction } from '@prisma/client';
import QueryView from '../../QueryView/QueryView';
import { createQuery } from '@/app/actions/queries/create-query';
import { cn } from '@/lib/utils';
import { generateQuery } from '@/app/actions/queries/generate-query';
import { readStreamableValue } from 'ai/rsc';
import { Button } from '../../ui/button';
import { IconDots, IconSparkles } from '@tabler/icons-react';
import LoadingModalContent from '../shared/LoadingModalContent';
import SuccessModalContent from '../shared/SuccessModalContent';
import AccordionInfo from '@/components/AccordionInfo/AccordionInfo';
import { isError } from '@/lib/either';
import ErrorModalContent from '../shared/ErrorModalContent';
import { ERRORS_MESSAGES, LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/constants/wordings';
import { OpenAiApiKeyContext } from '@/providers/OpenAiApiKey';

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
	error: string | null;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false, error: null };

export const maxDuration = 30;

const GenerateQueryModalContent = ({ projectTitle, type }: GenerateQueryModalContentProps) => {
	const { getApiKey } = useContext(OpenAiApiKeyContext);

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
		const response = await generateQuery({
			projectTitle,
			type,
			title: values.title,
			action: values.action,
			filters: values.filters,
			tables: values.tables,
			prompt: values.prompt || '',
			apiKey: getApiKey(),
		}).finally(() => {
			setQuery('');
		});

		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: response.error });
			return;
		}

		try {
			for await (const delta of readStreamableValue(response.success.output)) {
				setQuery(currentQuery => `${currentQuery}${delta}`);
			}
		} catch (error) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: error as string });
			return;
		}

		startTransition(() => {
			setPayload({ title: values.title, tables: values.tables.join(', '), action: values.action });
			setFormSubmitting(false);
		});
	};

	const handleStoreQuery = async (code: string) => {
		if (!payload || !query) return;

		setModalState({ ...DEFAULT_MODAL_STATE, loading: true });
		const response = await createQuery({ ...payload, projectTitle, code, apiKey: getApiKey() });
		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: response.error });
		}
		setModalState({ ...DEFAULT_MODAL_STATE, success: true });
	};

	const handleReset = () => {
		setQuery('');
	};

	return (
		<DialogContent
			className={cn(
				Object.values(modalState).some(val => Boolean(val)) ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]'
			)}>
			{modalState.loading ? (
				<LoadingModalContent text={LOADING_MESSAGES.GENERATING_QUERYS} />
			) : modalState.success ? (
				<SuccessModalContent text={SUCCESS_MESSAGES.GENERATING_QUERYS} />
			) : modalState.error ? (
				<ErrorModalContent text={modalState.error} />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Genera tu propia query</DialogTitle>
					</DialogHeader>
					{query.length > 0 ? (
						<QueryView database={type} query={query} codeRef={codeRef} />
					) : (
						<AccordionInfo
							title="Que es una query?"
							description="Una Query o consulta es una solicitud específica para recuperar información de una base de datos. Se utiliza para seleccionar, filtrar y organizar datos de manera efectiva"
						/>
					)}
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
									type="button"
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
