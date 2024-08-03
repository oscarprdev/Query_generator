import React, { startTransition, useContext, useEffect, useRef, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Databases } from '@prisma/client';
import QueryView from '../../QueryView/QueryView';
import { cn } from '@/lib/utils';
import { readStreamableValue } from 'ai/rsc';
import { Button } from '../../ui/button';
import { IconDots, IconSparkles } from '@tabler/icons-react';
import { generateSeed } from '@/app/actions/seeds/generate-seed';
import { createSeed } from '@/app/actions/seeds/create-seed';
import SchemaForm, { SchemaFormValues } from '../../Forms/SchemaForm';
import LoadingModalContent from '../shared/LoadingModalContent';
import SuccessModalContent from '../shared/SuccessModalContent';
import AccordionInfo from '@/components/AccordionInfo/AccordionInfo';
import { isError } from '@/lib/either';
import ErrorModalContent from '../shared/ErrorModalContent';
import { ERRORS_MESSAGES, LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/constants/wordings';
import { OpenAiApiKeyContext } from '@/providers/OpenAiApiKey';

type GenerateSeedModalContentProps = {
	projectTitle: string;
	type: Databases;
};

type SeedPayload = {
	title: string;
	table: string;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
	error: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false, error: false };

const GenerateSeedModalContent = ({ projectTitle, type }: GenerateSeedModalContentProps) => {
	const { getApiKey } = useContext(OpenAiApiKeyContext);

	const [formSubmitting, setFormSubmitting] = useState(false);
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);
	const [payload, setPayload] = useState<SeedPayload>();
	const [seed, setSeed] = useState<string>('');

	const codeRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setSeed('');
		setPayload(undefined);
		setModalState(DEFAULT_MODAL_STATE);
	}, []);

	const handleSubmit = async (values: SchemaFormValues) => {
		setFormSubmitting(true);
		const response = await generateSeed({
			projectTitle,
			type,
			table: values.table,
			apiKey: getApiKey(),
		}).finally(() => {
			setSeed('');
		});

		if (isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: true });
			return;
		}

		try {
			for await (const delta of readStreamableValue(response.success.output)) {
				setSeed(currentSeed => `${currentSeed}${delta}`);
			}
		} catch (error) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: true });
		}

		startTransition(() => {
			setPayload({ title: values.title, table: values.table });
			setFormSubmitting(false);
		});
	};

	const handleStoreQuery = async (code: string) => {
		if (!payload || !seed) return;

		setModalState({ ...DEFAULT_MODAL_STATE, loading: true });
		const response = await createSeed({ ...payload, projectTitle, code });
		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: true });
		}
		setModalState({ ...DEFAULT_MODAL_STATE, success: true });
	};

	const handleReset = () => {
		setSeed('');
	};

	return (
		<DialogContent
			className={cn(
				Object.values(modalState).some(val => Boolean(val)) ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]'
			)}>
			{modalState.loading && !modalState.success ? (
				<LoadingModalContent text={LOADING_MESSAGES.GENERATING_SEEDS} />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text={SUCCESS_MESSAGES.GENERATING_SEEDS} />
			) : modalState.error ? (
				<ErrorModalContent text={ERRORS_MESSAGES.GENERATING_SEEDS} />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Genera tu propia semilla.</DialogTitle>
					</DialogHeader>
					{seed ? (
						<QueryView database={type} query={seed} codeRef={codeRef} />
					) : (
						<AccordionInfo
							title="Que es una semilla?"
							description="En el contexto de una base de datos, una semilla (también conocida como “seed”) se refiere a los datos iniciales que se insertan en una tabla cuando se crea por primera vez"
						/>
					)}
					<SchemaForm
						handleSubmit={handleSubmit}
						handleReset={handleReset}
						projectTitle={projectTitle}
						defaultValues={{ title: '', table: '' }}>
						{seed.length === 0 ? (
							<Button disabled={formSubmitting} type="submit">
								{formSubmitting ? (
									<IconDots size={18} className="min-w-[100px] animate-pulse text-zinc-800" />
								) : (
									<>
										<IconSparkles size={20} className="mr-1 text-zinc-500" />
										Generar semilla
									</>
								)}
							</Button>
						) : (
							!seed.includes('Error') && (
								<Button
									onClick={() =>
										codeRef.current?.textContent && handleStoreQuery(codeRef.current.textContent)
									}>
									Guardar semilla
								</Button>
							)
						)}
					</SchemaForm>
				</>
			)}
		</DialogContent>
	);
};

export default GenerateSeedModalContent;
