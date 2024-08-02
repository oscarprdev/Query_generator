'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import DeleteProjectModalContent from './DeleteProjectModalContent';

type DeleteTableModalProps = {
	projectId: string;
	title: string;
};

const DeleteProjectModal = ({ projectId, title }: DeleteTableModalProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'destructive'} className="ml-auto mt-auto">
					Eliminar proyecto
				</Button>
			</DialogTrigger>
			<DeleteProjectModalContent projectId={projectId} title={title} />
		</Dialog>
	);
};

export default DeleteProjectModal;
