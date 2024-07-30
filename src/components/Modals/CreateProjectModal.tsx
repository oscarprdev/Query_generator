'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import CreateProjectForm, { CreateProjectFormValues } from '../Form/CreateProjectForm';
import { useRef } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { createProject } from '@/app/actions/create-project';

const CreateProjectModal = () => {
	const dialogTrigger = useRef<HTMLButtonElement>(null);

	const handleSubmit = async ({ title, database }: CreateProjectFormValues) => {
		if (!database) return;

		await createProject({ title, database });

		dialogTrigger?.current?.click();
	};

	return (
		<Dialog>
			<DialogTrigger ref={dialogTrigger} asChild>
				<Button className="absolute right-5 top-5 z-50 flex items-center gap-2 text-sm">
					<IconPlus size={18} />
					Crear proyecto
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Vamos a crear tu proyecto!</DialogTitle>
				</DialogHeader>
				<CreateProjectForm handleSubmit={handleSubmit} />
			</DialogContent>
		</Dialog>
	);
};

export default CreateProjectModal;
