'use client';

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';
import LoadingModalContent from '../shared/LoadingModalContent';
import SuccessModalContent from '../shared/SuccessModalContent';
import { deleteProject } from '@/app/actions/projects/delete-project';
import { useRouter } from 'next/navigation';
import { isError } from '@/lib/either';
import ErrorModalContent from '../shared/ErrorModalContent';
import { ERRORS_MESSAGES, LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/constants/wordings';

type DeleteProjectModalContentProps = {
	projectId: string;
	title: string;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
	error: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false, error: false };

const DeleteProjectModalContent = ({ projectId, title }: DeleteProjectModalContentProps) => {
	const router = useRouter();
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);

	const handleRemoveTableClick = async () => {
		setModalState({ ...DEFAULT_MODAL_STATE, loading: true });
		const response = await deleteProject({ projectId });
		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: true });
			return;
		}
		setModalState({ ...DEFAULT_MODAL_STATE, success: true });
		router.push('/');
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[425px]')}>
			{modalState.loading ? (
				<LoadingModalContent text={LOADING_MESSAGES.DELETTING_PROJECT} />
			) : modalState.success ? (
				<SuccessModalContent text={SUCCESS_MESSAGES.DELETTING_PROJECT} />
			) : modalState.error ? (
				<ErrorModalContent text={ERRORS_MESSAGES.DELETTING_PROJECT} />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Eliminar proyecto</DialogTitle>
					</DialogHeader>
					<p className="text-pretty text-center text-sm text-zinc-500">
						Estas seguro que quieres eliminar el proyecto{' '}
						<span className="font-bold text-primary">{title}</span> junto con todas las queries, schemas y
						semillas generadas?
					</p>
					<p className="text-center text-sm text-zinc-400">La accion es irreversible.</p>
					<Button className="mt-5" variant={'destructive'} onClick={() => handleRemoveTableClick()}>
						Eliminar proyecto
					</Button>
				</>
			)}
		</DialogContent>
	);
};

export default DeleteProjectModalContent;
