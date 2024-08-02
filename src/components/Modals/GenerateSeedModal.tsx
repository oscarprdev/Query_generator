'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Databases } from '@prisma/client';
import { useState } from 'react';
import GenerateSeedModalContent from './GenerateSeedModalContent';

type GenerateSeedModalProps = {
	projectTitle: string;
	type: Databases;
};

const GenerateSeedModal = ({ projectTitle, type }: GenerateSeedModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<Dialog onOpenChange={e => setModalOpened(e)}>
			<DialogTrigger asChild>
				<Button className="absolute bottom-3 right-3">Generar semilla</Button>
			</DialogTrigger>
			{modalOpened && <GenerateSeedModalContent projectTitle={projectTitle} type={type} />}
		</Dialog>
	);
};

export default GenerateSeedModal;
