'use client';

import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import QueryView from '../QueryView/QueryView';
import { startTransition, useEffect, useState } from 'react';
import { $Enums } from '@prisma/client';
import { getQueryById } from '@/app/actions/get-query-by-id';
import LoadingModalContent from './shared/LoadingModalContent';
import { cn } from '@/lib/utils';
import ErrorModalContent from './shared/ErrorModalContent';
import { Badge } from '../ui/badge';
import { updateQuery } from '@/app/actions/update-query';
import SuccessModalContent from './shared/SuccessModalContent';

type ReviewQueryModalContentProps = {
	queryId: string;
};

type Query = {
	id: string;
	title: string;
	description: string;
	tables: string;
	action: $Enums.QueryAction;
	code: string;
	createdAt: Date;
	projectId: string;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false };

const ReviewQueryModalContent = ({ queryId }: ReviewQueryModalContentProps) => {
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);
	const [query, setQuery] = useState<Query | null>(null);

	useEffect(() => {
		const handleQuery = async () => {
			setModalState({ ...modalState, loading: true });
			const query = await getQueryById({ queryId });

			startTransition(() => {
				setQuery(query);
				setModalState({ ...modalState, loading: false });
			});
		};

		handleQuery();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryId]);

	const handleStoreQuery = async (code: string) => {
		setModalState({ success: false, loading: true });
		await updateQuery({ queryId, code });
		setModalState({ success: true, loading: false });
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]')}>
			{modalState.loading && !modalState.success ? (
				<LoadingModalContent text="Editando query ..." />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text="Query editada correctamente!" />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Detalles de tu query.</DialogTitle>
					</DialogHeader>
					{query ? (
						<>
							{query && (
								<QueryView
									query={query.code}
									handleStoreQuery={handleStoreQuery}
									buttonLabel="Editar query"
								/>
							)}
							<div className="flex items-center gap-2">
								<p className="text-md capitalize text-zinc-400">{query.title}</p>
								<Badge className="capitalize">{query.action}</Badge>
							</div>
							<div className="border-l border-secondary pl-2">
								<p className="text-sm text-zinc-400">{query.description}</p>
							</div>
						</>
					) : (
						<ErrorModalContent text="No se ha encontrado la query que buscabas, porfavor intentalo mas tarde." />
					)}
				</>
			)}
		</DialogContent>
	);
};

export default ReviewQueryModalContent;
