'use client';

import { Project } from '@prisma/client';
import ProjectSettingsForm, { ProjectSettingsFormValues } from '../Forms/ProjectSettingsForm';
import { updateProject } from '@/app/actions/projects/update-project';
import { useRouter } from 'next/navigation';

type FactorySettingsProps = {
	project: Project | null;
};

const FactorySettings = ({ project }: FactorySettingsProps) => {
	const router = useRouter();

	const handleUpdateProjectSubmit = async (values: ProjectSettingsFormValues) => {
		project && (await updateProject({ projectId: project.id, title: values.title }));

		router.push(`/?project=${values.title}`);
	};

	return (
		<div className="flex h-full w-full flex-col">
			{project && <ProjectSettingsForm title={project.title} handleSubmit={handleUpdateProjectSubmit} />}
		</div>
	);
};

export default FactorySettings;
