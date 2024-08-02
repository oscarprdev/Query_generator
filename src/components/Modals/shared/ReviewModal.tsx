'use client';

import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import QueryView from '../../QueryView/QueryView';
import { ReactNode, startTransition, useEffect, useRef, useState } from 'react';
import { Databases } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';
import { Query } from '@/app/actions/queries/get-query-by-id';
import { Schema } from '@/app/actions/schemas/get-schema-by-id';
import { capitalizeStr } from '@/lib/strings';
import { Seed } from '@/app/actions/seeds/get-seed-by-id';
import LoadingModalContent from './LoadingModalContent';
import SuccessModalContent from './SuccessModalContent';
import ErrorModalContent from './ErrorModalContent';

export type ModalEntity = Query | Schema | Seed;

type ReviewModalProps = {
	queryId: string;
	type: Databases;
	children: ReactNode;
	getCode: (id: string) => Promise<ModalEntity | null>;
	updateCode: (input: { id: string; code: string }) => Promise<null | undefined>;
	deleteCode: (input: { id: string }) => Promise<null | undefined>;
	setModalContent: (input: ModalEntity) => void;
	labels: {
		onOpen: string;
		loading: string;
		deleting: string;
		success: string;
		deleted: string;
		error: string;
		submitButton: string;
		deleteButton: string;
		title: string;
	};
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
	deletting: boolean;
	deleted: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false, deletting: false, deleted: false };

const ReviewModal = ({
	queryId,
	type,
	children,
	getCode,
	updateCode,
	deleteCode,
	setModalContent,
	labels,
}: ReviewModalProps) => {
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
		setModalState({ ...DEFAULT_MODAL_STATE, loading: true });
		await updateCode({ id: queryId, code });
		setModalState({ ...DEFAULT_MODAL_STATE, success: true });
	};

	const handleDeleteQuery = async () => {
		setModalState({ ...DEFAULT_MODAL_STATE, deletting: true });
		await deleteCode({ id: queryId });
		setModalState({ ...DEFAULT_MODAL_STATE, deleted: true });
	};

	return (
		<DialogContent
			className={cn(
				Object.values(DEFAULT_MODAL_STATE).some(value => Boolean(value))
					? 'sm:max-w-[280px]'
					: 'sm:max-w-[625px]'
			)}>
			{modalState.loading && !query ? (
				<LoadingModalContent text={labels.onOpen} />
			) : modalState.loading && !modalState.success ? (
				<LoadingModalContent text={labels.loading} />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text={labels.success} />
			) : modalState.deletting ? (
				<LoadingModalContent text={labels.deleting} />
			) : modalState.deleted ? (
				<SuccessModalContent text={labels.deleted} />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>{capitalizeStr(labels.title)}</DialogTitle>
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
					<div className="ml-auto flex items-center gap-2">
						<Button variant={'none'} onClick={handleDeleteQuery}>
							{labels.deleteButton}
						</Button>
						<Button
							disabled={!isCodeDirty}
							onClick={() =>
								codeRef.current?.textContent && handleStoreQuery(codeRef.current.textContent)
							}>
							{labels.submitButton}
						</Button>
					</div>
				</>
			)}
		</DialogContent>
	);
};

export default ReviewModal;
