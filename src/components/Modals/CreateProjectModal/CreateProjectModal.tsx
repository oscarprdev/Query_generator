'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import CreateProjectModalContent from './CreateProjectModalContent';
import { Button } from '@/components/ui/button';

const CreateProjectModal = () => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<Dialog onOpenChange={e => setModalOpened(e)}>
			<DialogTrigger asChild>
				<Button className="z-5 absolute right-5 top-5 flex items-center gap-2 text-sm">
					<IconPlus size={18} />
					Crear proyecto
				</Button>
			</DialogTrigger>
			{modalOpened && <CreateProjectModalContent />}
		</Dialog>
	);
};

export default CreateProjectModal;
