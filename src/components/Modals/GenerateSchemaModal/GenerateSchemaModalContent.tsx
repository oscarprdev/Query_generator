import React, { startTransition, useContext, useEffect, useRef, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Databases } from '@prisma/client';
import QueryView from '../../QueryView/QueryView';
import { cn } from '@/lib/utils';
import { generateSchema } from '@/app/actions/schemas/generate-schema';
import { createSchema } from '@/app/actions/schemas/create-schema';
import SchemaForm, { SchemaFormValues } from '../../Forms/SchemaForm';
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

type GenerateSchemaModalContentProps = {
	projectTitle: string;
	type: Databases;
};

type SchemaPayload = {
	title: string;
	table: string;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
	error: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false, error: false };

const GenerateSchemaModalContent = ({ projectTitle, type }: GenerateSchemaModalContentProps) => {
	const { getApiKey } = useContext(OpenAiApiKeyContext);

	const [formSubmitting, setFormSubmitting] = useState(false);
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);
	const [payload, setPayload] = useState<SchemaPayload>();
	const [schema, setSchema] = useState<string>('');

	const codeRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setSchema('');
		setPayload(undefined);
		setModalState(DEFAULT_MODAL_STATE);
	}, []);

	const handleSubmit = async (values: SchemaFormValues) => {
		setFormSubmitting(true);
		const response = await generateSchema({
			projectTitle,
			type,
			table: values.table,
			apiKey: getApiKey(),
		}).finally(() => {
			if (schema.length === 0) {
				setModalState({ ...DEFAULT_MODAL_STATE, error: true });
				return;
			}

			setSchema('');
		});

		if (isError(response)) {
			setSchema(response.error);
			return;
		}

		for await (const delta of readStreamableValue(response.success.output)) {
			if (delta?.length === 0) {
				setModalState({ ...DEFAULT_MODAL_STATE, error: true });
			}

			setSchema(currentSchema => `${currentSchema}${delta}`);
		}

		startTransition(() => {
			setPayload({ title: values.title, table: values.table });
			setFormSubmitting(false);
		});
	};

	const handleStoreQuery = async (code: string) => {
		if (!payload || !schema) return;

		setModalState({ ...DEFAULT_MODAL_STATE, loading: true });
		const response = await createSchema({ ...payload, projectTitle, code });
		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: true });
		}
		setModalState({ ...DEFAULT_MODAL_STATE, success: true });
	};

	const handleReset = () => {
		setSchema('');
	};

	return (
		<DialogContent
			className={cn(
				Object.values(modalState).some(val => Boolean(val)) ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]'
			)}>
			{modalState.loading && !modalState.success ? (
				<LoadingModalContent text={LOADING_MESSAGES.GENERATING_SCHEMAS} />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text={SUCCESS_MESSAGES.GENERATING_SCHEMAS} />
			) : modalState.error ? (
				<ErrorModalContent text={ERRORS_MESSAGES.GENERATING_SCHEMAS} />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Genera tu propio schema.</DialogTitle>
					</DialogHeader>
					{schema ? (
						<QueryView database={type} query={schema} codeRef={codeRef} />
					) : (
						<AccordionInfo
							title="Que es un esquema?"
							description="Un esquema de una tabla en una base de datos es la definición de la estructura de la tabla. Por ejemplo, los nombres de los campos, los tipos o las relaciones entre distintos campos"
						/>
					)}
					<SchemaForm
						handleSubmit={handleSubmit}
						handleReset={handleReset}
						projectTitle={projectTitle}
						defaultValues={{ title: '', table: '' }}>
						{schema.length === 0 ? (
							<Button disabled={formSubmitting} type="submit">
								{formSubmitting ? (
									<IconDots size={18} className="min-w-[100px] animate-pulse text-zinc-800" />
								) : (
									<>
										<IconSparkles size={20} className="mr-1 text-zinc-500" />
										Generar schema
									</>
								)}
							</Button>
						) : (
							!schema.includes('Error') && (
								<Button
									onClick={() =>
										codeRef.current?.textContent && handleStoreQuery(codeRef.current.textContent)
									}>
									Guardar schema
								</Button>
							)
						)}
					</SchemaForm>
				</>
			)}
		</DialogContent>
	);
};

export default GenerateSchemaModalContent;
