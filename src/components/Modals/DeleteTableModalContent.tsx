'use client';

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import LoadingModalContent from './shared/LoadingModalContent';
import SuccessModalContent from './shared/SuccessModalContent';
import { cn } from '@/lib/utils';
import { deleteTable } from '@/app/actions/delete-table';
import { Button } from '../ui/button';
import { Databases } from '@prisma/client';

type DeleteTableModalContentProps = {
	tableId: string;
	type: Databases;
	title: string;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false };

const DeleteTableModalContent = ({ tableId, type, title }: DeleteTableModalContentProps) => {
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);

	const handleRemoveTableClick = async () => {
		setModalState({ loading: true, success: false });
		await deleteTable({ tableId, type });
		setModalState({ loading: false, success: true });
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[425px]')}>
			{modalState.loading && !modalState.success ? (
				<LoadingModalContent text="Creando proyecto ..." />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text="Poryecto creado correctamente!" />
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
					<Button className="mt-5" onClick={() => handleRemoveTableClick()}>
						Eliminar tabla
					</Button>
				</>
			)}
		</DialogContent>
	);
};

export default DeleteTableModalContent;
