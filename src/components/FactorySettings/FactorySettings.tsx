'use client';

import { Project } from '@prisma/client';
import ProjectSettingsForm, { ProjectSettingsFormValues } from '../Forms/ProjectSettingsForm';
import { updateProject } from '@/app/actions/projects/update-project';
import { useRouter } from 'next/navigation';
import DeleteTableModal from '../Modals/DeleteTableModal/DeleteTableModal';
import DeleteProjectModal from '../Modals/DeleteProjectModal/DeleteProjectModal';
import ApiKeySettingsForm, { ApiKeySettingsFormValues } from '../Forms/ApiKeySettingsForm';
import { updateApiKey } from '@/app/actions/users/update-api-key';
import { isError } from '@/lib/either';
import { toast } from '../ui/use-toast';

type FactorySettingsProps = {
	project: Project | null;
};

const FactorySettings = ({ project }: FactorySettingsProps) => {
	const router = useRouter();

	const handleUpdateProjectSubmit = async (values: ProjectSettingsFormValues) => {
		project && (await updateProject({ projectId: project.id, title: values.title }));

		router.push(`/?project=${values.title}`);
	};
	const handleApiKeySubmit = async (values: ApiKeySettingsFormValues) => {
		const response = await updateApiKey({ apikey: values.apiKey });
		if (response && isError(response)) {
			toast({
				variant: 'destructive',
				description: response.error,
			});
		}
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
