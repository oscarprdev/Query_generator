'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import CreateProjectForm, { CreateProjectFormValues } from '../Form/CreateProjectForm';
import { useProjectsStore } from '@/store/useProjectsStore';
import { useRef } from 'react';

const CreateProjectModal = () => {
	const dialogTrigger = useRef<HTMLButtonElement>(null);
	const { createProject } = useProjectsStore();

	const handleSubmit = (values: CreateProjectFormValues) => {
		if (!values.database) return;

		createProject({
			id: crypto.randomUUID().toString(),
			createdAt: new Date(),
			updatedAt: new Date(),
			database: values.database,
			title: values.title,
		});

		dialogTrigger?.current?.click();
	};

	return (
		<Dialog>
			<DialogTrigger ref={dialogTrigger} asChild>
				<Button className="absolute right-5 top-5 z-50">Crear proyecto</Button>
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
