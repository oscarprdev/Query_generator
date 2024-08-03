'use client';

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { cn } from '@/lib/utils';
import { deleteTable } from '@/app/actions/tables/delete-table';
import { Button } from '../../ui/button';
import { Databases } from '@prisma/client';
import LoadingModalContent from '../shared/LoadingModalContent';
import SuccessModalContent from '../shared/SuccessModalContent';
import { isError } from '@/lib/either';
import ErrorModalContent from '../shared/ErrorModalContent';
import { ERRORS_MESSAGES, LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/constants/wordings';

type DeleteTableModalContentProps = {
	tableId: string;
	type: Databases;
	title: string;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
	error: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false, error: false };

const DeleteTableModalContent = ({ tableId, type, title }: DeleteTableModalContentProps) => {
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);

	const handleRemoveTableClick = async () => {
		setModalState({ ...DEFAULT_MODAL_STATE, loading: true });
		const response = await deleteTable({ tableId, type });
		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: true });
			return;
		}
		setModalState({ ...DEFAULT_MODAL_STATE, success: true });
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[425px]')}>
			{modalState.loading ? (
				<LoadingModalContent text={LOADING_MESSAGES.DELETTING_TABLE} />
			) : modalState.success ? (
				<SuccessModalContent text={SUCCESS_MESSAGES.DELETTING_TABLE} />
			) : modalState.error ? (
				<ErrorModalContent text={ERRORS_MESSAGES.DELETTING_TABLE} />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Eliminar tabla</DialogTitle>
					</DialogHeader>
					<p className="text-center text-sm text-zinc-500">
						Estas seguro que quieres eliminar la tabla{' '}
						<span className="font-bold text-primary">{title}</span>?
					</p>
					<p className="text-center text-sm text-zinc-400">La accion es irreversible.</p>
					<Button variant={'destructive'} className="mt-5" onClick={() => handleRemoveTableClick()}>
						Eliminar tabla
					</Button>
				</>
			)}
		</DialogContent>
	);
};

export default DeleteTableModalContent;
