'use client';

import React, { useContext, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import CreateProjectForm, { CreateProjectFormValues } from '../../Forms/CreateProjectForm';
import LoadingModalContent from '../shared/LoadingModalContent';
import SuccessModalContent from '../shared/SuccessModalContent';
import { useRouter } from 'next/navigation';
import { isError } from '@/lib/either';
import ErrorModalContent from '../shared/ErrorModalContent';
import { LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/constants/wordings';
import { OpenAiApiKeyContext } from '@/providers/OpenAiApiKey';
import { useCreateProject } from '@/hooks/useCreateProject';

type ModalContentState = {
	loading: boolean;
	success: boolean;
	error: string | null;
};

const DEFAULT_MODAL_STATE = { loading: false, success: false, error: null };

const CreateProjectModalContent = () => {
	const { createProject, isGenerating, tables } = useCreateProject();
	const { getApiKey } = useContext(OpenAiApiKeyContext);

	const [modalState, setModalState] = useState<ModalContentState>(DEFAULT_MODAL_STATE);

	const handleSubmit = async ({ title, database, project }: CreateProjectFormValues) => {
		if (!database) return;

		setModalState({ ...DEFAULT_MODAL_STATE, loading: true });

		const response = await createProject({ title, database, project, apiKey: getApiKey() });
		if (response && isError(response)) {
			setModalState({ ...DEFAULT_MODAL_STATE, error: response.error });
		}
		setModalState({ ...DEFAULT_MODAL_STATE, success: true });
	};

	return (
		<>
			{Object.values(modalState).some(val => Boolean(val)) ? (
				<DialogContent className={'sm:max-w-[280px]'}>
					{isGenerating ? (
						<LoadingModalContent
							text={`Generando proyecto con IA...  tablas creadas: ${tables ? tables.length : 0}`}
						/>
					) : modalState.loading ? (
						<LoadingModalContent text={LOADING_MESSAGES.CREATTING_PROJECT} />
					) : modalState.success ? (
						<SuccessModalContent text={SUCCESS_MESSAGES.CREATTING_PROJECT} />
					) : (
						modalState.error && <ErrorModalContent text={modalState.error} />
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
