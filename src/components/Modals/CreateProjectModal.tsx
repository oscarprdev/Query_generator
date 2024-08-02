'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import CreateProjectModalContent from './CreateProjectModalContent';

const CreateProjectModal = () => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<Dialog onOpenChange={e => setModalOpened(e)}>
			<DialogTrigger asChild>
				<Button className="absolute right-5 top-5 z-50 flex items-center gap-2 text-sm">
					<IconPlus size={18} />
					Crear proyecto
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Vamos a crear tu proyecto!</DialogTitle>
				</DialogHeader>
				{modalOpened && <CreateProjectModalContent />}
			</DialogContent>
		</Dialog>
	);
};

export default CreateProjectModal;
