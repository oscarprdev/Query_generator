'use client';

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';
import LoadingModalContent from '../shared/LoadingModalContent';
import SuccessModalContent from '../shared/SuccessModalContent';
import { deleteProject } from '@/app/actions/projects/delete-project';
import { useRouter } from 'next/navigation';

type DeleteProjectModalContentProps = {
	projectId: string;
	title: string;
};

type ModalContentState = {
	loading: boolean;
	success: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false };

const DeleteProjectModalContent = ({ projectId, title }: DeleteProjectModalContentProps) => {
	const router = useRouter();
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);

	const handleRemoveTableClick = async () => {
		setModalState({ loading: true, success: false });
		await deleteProject({ projectId });
		setModalState({ loading: false, success: true });
		router.push('/');
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[425px]')}>
			{modalState.loading && !modalState.success ? (
				<LoadingModalContent text="Eliminando proyecto ..." />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text="Proyecto eliminado correctamente!" />
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
