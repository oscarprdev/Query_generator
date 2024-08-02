'use client';

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import CreateProjectForm, { CreateProjectFormValues } from '../../Forms/CreateProjectForm';
import { createProject } from '@/app/actions/projects/create-project';

import { cn } from '@/lib/utils';
import LoadingModalContent from '../shared/LoadingModalContent';
import SuccessModalContent from '../shared/SuccessModalContent';
import { useRouter } from 'next/navigation';

const DEFAULT_MODAL_STATE = { loading: false, success: false };

type ModalContentState = {
	loading: boolean;
	success: boolean;
};

const CreateProjectModalContent = () => {
	const router = useRouter();
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);

	const handleSubmit = async ({ title, database }: CreateProjectFormValues) => {
		if (!database) return;

		setModalState({ loading: true, success: false });
		await createProject({ title, database });
		setModalState({ loading: false, success: true });

		router.push(`/?project=${title}`);
	};

	return (
		<DialogContent
			className={cn(modalState.success || modalState.loading ? 'sm:max-w-[280px]' : 'sm:max-w-[425px]')}>
			{modalState.loading && !modalState.success ? (
				<LoadingModalContent text="Creando proyecto ..." />
			) : modalState.success && !modalState.loading ? (
				<SuccessModalContent text="Proyecto creado correctamente!" />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Vamos a crear tu proyecto!</DialogTitle>
					</DialogHeader>
					<CreateProjectForm handleSubmit={handleSubmit} />
				</>
			)}
		</DialogContent>
	);
};

export default CreateProjectModalContent;
