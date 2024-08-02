import React, { startTransition, useEffect, useRef, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Databases } from '@prisma/client';
import QueryView from '../QueryView/QueryView';
import { cn } from '@/lib/utils';
import LoadingModalContent from './shared/LoadingModalContent';
import SuccessModalContent from './shared/SuccessModalContent';
import { readStreamableValue } from 'ai/rsc';
import { Button } from '../ui/button';
import { IconDots, IconSparkles } from '@tabler/icons-react';
import { generateSeed } from '@/app/actions/generate-seed';
import { createSeed } from '@/app/actions/create-seed';
import SchemaForm, { SchemaFormValues } from '../Forms/SchemaForm';

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
};

const DEFAULT_MODAL_STATE = { loading: false, success: false };

const GenerateSeedModalContent = ({ projectTitle, type }: GenerateSeedModalContentProps) => {
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
		const { output } = await generateSeed({
			projectTitle,
			type,
			table: values.table,
		}).finally(() => setSeed(''));

		for await (const delta of readStreamableValue(output)) {
			setSeed(currentSeed => `${currentSeed}${delta}`);
		}

		startTransition(() => {
			setPayload({ title: values.title, table: values.table });
			setFormSubmitting(false);
		});
	};

	const handleStoreQuery = async (code: string) => {
		if (!payload || !seed) return;

		setModalState({ success: false, loading: true });
		await createSeed({ ...payload, projectTitle, code });
		setModalState({ success: true, loading: false });
	};

	const handleReset = () => {
		setSeed('');
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]')}>
			{modalState.loading && !modalState.success ? (
				<LoadingModalContent text="Guardando semilla ..." />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text="Semilla guardada correctamente!" />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Genera tu propia semilla.</DialogTitle>
					</DialogHeader>
					{seed && <QueryView database={type} query={seed} codeRef={codeRef} />}
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
