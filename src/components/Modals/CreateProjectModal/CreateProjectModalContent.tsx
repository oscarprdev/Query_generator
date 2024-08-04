'use client';

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import CreateProjectForm, { CreateProjectFormValues } from '../../Forms/CreateProjectForm';
import { createProject } from '@/app/actions/projects/create-project';

import LoadingModalContent from '../shared/LoadingModalContent';
import SuccessModalContent from '../shared/SuccessModalContent';
import { useRouter } from 'next/navigation';
import { isError } from '@/lib/either';
import ErrorModalContent from '../shared/ErrorModalContent';
import { ERRORS_MESSAGES, LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/constants/wordings';

type ModalContentState = {
	loading: boolean;
	success: boolean;
	error: boolean;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false, error: false };

const CreateProjectModalContent = () => {
	const router = useRouter();
	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);

	const handleSubmit = async ({ title, database }: CreateProjectFormValues) => {
		if (!database) return;

		setModalState({ ...DEFAULT_MODAL_STATE, loading: true });
		const response = await createProject({ title, database });
		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: true });
		}
		setModalState({ ...DEFAULT_MODAL_STATE, success: true });

		router.push(`/?project=${title}`);
	};

	return (
		<>
			{Object.values(modalState).some(val => Boolean(val)) ? (
				<DialogContent className={'sm:max-w-[280px]'}>
					{modalState.loading ? (
						<LoadingModalContent text={LOADING_MESSAGES.CREATTING_PROJECT} />
					) : modalState.success ? (
						<SuccessModalContent text={SUCCESS_MESSAGES.CREATTING_PROJECT} />
					) : (
						<ErrorModalContent text={ERRORS_MESSAGES.CREATING_PROJECT} />
					)}
				</DialogContent>
			) : (
				<DialogContent className={'sm:max-w-[425px]'}>
					<DialogHeader>
						<DialogTitle>Vamos a crear tu proyecto!</DialogTitle>
					</DialogHeader>
					<CreateProjectForm handleSubmit={handleSubmit} />
				</DialogContent>
			)}
		</>
	);
};

export default CreateProjectModalContent;
