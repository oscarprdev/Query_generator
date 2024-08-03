'use client';

import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import QueryView from '../../QueryView/QueryView';
import { ReactNode, startTransition, useContext, useEffect, useRef, useState } from 'react';
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
import { Either, isError } from '@/lib/either';
import { OpenAiApiKeyContext } from '@/providers/OpenAiApiKey';

export type ModalEntity = Query | Schema | Seed;

type ReviewModalProps = {
	queryId: string;
	type: Databases;
	children: ReactNode;
	getCode: (id: string) => Promise<ModalEntity | null>;
	updateCode: (input: {
		id: string;
		code: string;
		apiKey: string | null;
	}) => Promise<Either<string, never> | undefined>;
	deleteCode: (input: { id: string }) => Promise<Either<string, never> | undefined>;
	setModalContent: (input: ModalEntity) => void;
	labels: {
		onOpen: string;
		loading: string;
		deleting: string;
		success: string;
		deleted: string;
		error: string;
		errorUpdatting: string;
		errorDeletting: string;
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
	errorDeletting: boolean;
	errorUpdatting: boolean;
};

const DEFAULT_MODAL_STATE = {
	loading: false,
	success: false,
	deletting: false,
	deleted: false,
	errorUpdatting: false,
	errorDeletting: false,
};

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
	const { getApiKey } = useContext(OpenAiApiKeyContext);

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
		const response = await updateCode({ id: queryId, code, apiKey: getApiKey() });
		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, errorUpdatting: true });
			return;
		}
		setModalState({ ...DEFAULT_MODAL_STATE, success: true });
	};

	const handleDeleteQuery = async () => {
		setModalState({ ...DEFAULT_MODAL_STATE, deletting: true });
		const response = await deleteCode({ id: queryId });
		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, errorDeletting: true });
			return;
		}
		setModalState({ ...DEFAULT_MODAL_STATE, deleted: true });
	};

	return (
		<DialogContent
			className={cn(
				Object.values(modalState).some(value => Boolean(value)) ? 'sm:max-w-[280px]' : 'sm:max-w-[625px]'
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
			) : modalState.errorUpdatting ? (
				<ErrorModalContent text={labels.errorUpdatting} />
			) : modalState.errorDeletting ? (
				<ErrorModalContent text={labels.errorDeletting} />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>{capitalizeStr(labels.title)}</DialogTitle>
					</DialogHeader>
					{query && (
						<>
							{children}
							<QueryView
								database={type}
								query={query}
								codeRef={codeRef}
								handleEditCode={handleEditCode}
							/>
						</>
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
