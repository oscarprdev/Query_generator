'use client';

import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import QueryView from '../QueryView/QueryView';
import { ReactNode, startTransition, useEffect, useRef, useState } from 'react';
import { Databases } from '@prisma/client';
import LoadingModalContent from './shared/LoadingModalContent';
import { cn } from '@/lib/utils';
import ErrorModalContent from './shared/ErrorModalContent';
import SuccessModalContent from './shared/SuccessModalContent';
import { Button } from '../ui/button';
import { Query } from '@/app/actions/get-query-by-id';
import { Schema } from '@/app/actions/get-schema-by-id';

export type ModalEntity = Query | Schema;

type ReviewModalProps = {
	queryId: string;
	type: Databases;
	children: ReactNode;
	getCode: (id: string) => Promise<ModalEntity | Schema | null>;
	updateCode: (input: { id: string; code: string }) => Promise<null | undefined>;
	setModalContent: (input: ModalEntity | Schema) => void;
	labels: {
		onOpen: string;
		loading: string;
		success: string;
		error: string;
		submitButton: string;
		title: string;
	};
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false };

const ReviewModal = ({ queryId, type, children, getCode, updateCode, setModalContent, labels }: ReviewModalProps) => {
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);
	const [query, setQuery] = useState<string>();
	const [isCodeDirty, setIsCodeDirty] = useState(false);

	const codeRef = useRef<HTMLElement>(null);

	const handleEditCode = () => setIsCodeDirty(true);

	useEffect(() => {
		const handleQuery = async () => {
			setModalState({ ...modalState, loading: true });
			const query = await getCode(queryId);

			startTransition(() => {
				query && setModalContent(query);
				setQuery(query?.code);
				setModalState({ ...modalState, loading: false });
			});
		};

		handleQuery();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryId]);

	const handleStoreQuery = async (code: string) => {
		setModalState({ success: false, loading: true });
		await updateCode({ id: queryId, code });
		setModalState({ success: true, loading: false });
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]')}>
			{modalState.loading && !query ? (
				<LoadingModalContent text={labels.onOpen} />
			) : modalState.loading && !modalState.success ? (
				<LoadingModalContent text={labels.loading} />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text={labels.success} />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>{labels.title}</DialogTitle>
					</DialogHeader>
					{query ? (
						<>
							{children}
							<QueryView
								database={type}
								query={query}
								codeRef={codeRef}
								handleEditCode={handleEditCode}
							/>
						</>
					) : (
						<ErrorModalContent text={labels.error} />
					)}
					<Button
						className="ml-auto"
						disabled={!isCodeDirty}
						onClick={() => codeRef.current?.textContent && handleStoreQuery(codeRef.current.textContent)}>
						{labels.submitButton}
					</Button>
				</>
			)}
		</DialogContent>
	);
};

export default ReviewModal;
