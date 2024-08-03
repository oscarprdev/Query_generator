'use client';

import { Project } from '@prisma/client';
import ProjectSettingsForm, { ProjectSettingsFormValues } from '../Forms/ProjectSettingsForm';
import { updateProject } from '@/app/actions/projects/update-project';
import { useRouter } from 'next/navigation';
import DeleteProjectModal from '../Modals/DeleteProjectModal/DeleteProjectModal';
import ApiKeySettingsForm, { ApiKeySettingsFormValues } from '../Forms/ApiKeySettingsForm';
import { useContext } from 'react';
import { OpenAiApiKeyContext } from '@/providers/OpenAiApiKey';

type FactorySettingsProps = {
	project: Project | null;
};

const FactorySettings = ({ project }: FactorySettingsProps) => {
	const { handleApiKey } = useContext(OpenAiApiKeyContext);
	const router = useRouter();

	const handleUpdateProjectSubmit = async (values: ProjectSettingsFormValues) => {
		project && (await updateProject({ projectId: project.id, title: values.title }));

		router.push(`/?project=${values.title}`);
	};
	const handleApiKeySubmit = async (values: ApiKeySettingsFormValues) => {
		handleApiKey(values.apiKey);
	};

	return (
		<>
			{project && (
				<div className="flex h-[87%] w-full flex-col">
					<ProjectSettingsForm title={project.title} handleSubmit={handleUpdateProjectSubmit} />
					<ApiKeySettingsForm handleSubmit={handleApiKeySubmit} />
					<DeleteProjectModal projectId={project.id} title={project?.title} />
				</div>
			)}
		</>
	);
};

export default FactorySettings;
