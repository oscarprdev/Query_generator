import React, { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Databases } from '@prisma/client';
import QueryView from '../QueryView/QueryView';
import { cn } from '@/lib/utils';
import LoadingModalContent from './shared/LoadingModalContent';
import SuccessModalContent from './shared/SuccessModalContent';
import { generateSchema } from '@/app/actions/generate-schema';
import { createSchema } from '@/app/actions/create-schema';
import SchemaForm, { SchemaFormValues } from '../Forms/SchemaForm';
import { readStreamableValue } from 'ai/rsc';

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
};

const DEFAULT_MODAL_STATE = { loading: false, success: false };

const GenerateSchemaModalContent = ({ projectTitle, type }: GenerateSchemaModalContentProps) => {
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);
	const [payload, setPayload] = useState<SchemaPayload>();
	const [schema, setSchema] = useState<string>('');

	useEffect(() => {
		setSchema('');
		setPayload(undefined);
		setModalState(DEFAULT_MODAL_STATE);
	}, []);

	const handleSubmit = async (values: SchemaFormValues) => {
		setSchema('');

		const { output } = await generateSchema({
			projectTitle,
			type,
			table: values.table,
		}).finally(() => setSchema(''));

		for await (const delta of readStreamableValue(output)) {
			setSchema(currentSchema => `${currentSchema}${delta}`);
		}

		setPayload({ title: values.title, table: values.table });
	};

	const handleStoreQuery = async (code: string) => {
		if (!payload || !schema) return;

		setModalState({ success: false, loading: true });
		await createSchema({ ...payload, projectTitle, code });
		setModalState({ success: true, loading: false });
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]')}>
			{modalState.loading && !modalState.success ? (
				<LoadingModalContent text="Guardando schema ..." />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text="Schema guardado correctamente!" />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Genera tu propio schema.</DialogTitle>
					</DialogHeader>
					{schema && (
						<QueryView
							database={type}
							error={schema.includes('Error')}
							query={schema}
							handleStoreQuery={handleStoreQuery}
							kind="create"
						/>
					)}
					<SchemaForm
						handleSubmit={handleSubmit}
						projectTitle={projectTitle}
						reset={false}
						defaultValues={{ title: '', table: '' }}
						submitLabel="Generar schema"
					/>
				</>
			)}
		</DialogContent>
	);
};

export default GenerateSchemaModalContent;
