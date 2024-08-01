'use client';

import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import QueryView from '../QueryView/QueryView';
import { startTransition, useEffect, useState } from 'react';
import LoadingModalContent from './shared/LoadingModalContent';
import { cn } from '@/lib/utils';
import ErrorModalContent from './shared/ErrorModalContent';
import { Badge } from '../ui/badge';
import SuccessModalContent from './shared/SuccessModalContent';
import { updateSchema } from '@/app/actions/update-schema';
import { Databases } from '@prisma/client';
import { getSchemaById } from '@/app/actions/get-schema-by-id';

type ReviewSchemaModalContentProps = {
	schemaId: string;
	type: Databases;
};

type Schema = {
	id: string;
	title: string;
	table: string;
	code: string;
	createdAt: Date;
	projectId: string;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false };

const ReviewSchemaModalContent = ({ schemaId, type }: ReviewSchemaModalContentProps) => {
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);
	const [schema, setSchema] = useState<Schema | null>(null);

	useEffect(() => {
		const handleSchema = async () => {
			setModalState({ ...modalState, loading: true });
			const schema = await getSchemaById({ schemaId });

			startTransition(() => {
				setSchema(schema);
				setModalState({ ...modalState, loading: false });
			});
		};

		handleSchema();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [schemaId]);

	const handleStoreSchema = async (code: string) => {
		setModalState({ success: false, loading: true });
		await updateSchema({ schemaId, code });
		setModalState({ success: true, loading: false });
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]')}>
			{modalState.loading && !schema ? (
				<LoadingModalContent text={'Obteniendo schema ...'} />
			) : modalState.loading && !modalState.success ? (
				<LoadingModalContent text={'Editando schema ...'} />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text="Schema editada correctamente!" />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Detalles de tu schema.</DialogTitle>
					</DialogHeader>
					{schema ? (
						<>
							<div className="flex items-center gap-2">
								<p className="text-md capitalize text-zinc-400">{schema.title}</p>
								<Badge variant={'primary'} className="capitalize">
									{schema.table}
								</Badge>
							</div>

							<QueryView
								error={false}
								database={type}
								query={schema.code}
								handleStoreQuery={handleStoreSchema}
								kind="edit"
							/>
						</>
					) : (
						<ErrorModalContent text="No se ha encontrado la query que buscabas, porfavor intentalo mas tarde." />
					)}
				</>
			)}
		</DialogContent>
	);
};

export default ReviewSchemaModalContent;
