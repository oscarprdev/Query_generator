'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import { Databases } from '@prisma/client';
import { useState } from 'react';
import GenerateQueryModalContent from './GenerateQueryModalContent';

type GenerateQueryModalProps = {
	projectTitle: string;
	type: Databases;
};

const GenerateQueryModal = ({ projectTitle, type }: GenerateQueryModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<Dialog onOpenChange={e => setModalOpened(e)}>
			<DialogTrigger asChild>
				<Button className="absolute bottom-3 right-3">Generar query</Button>
			</DialogTrigger>
			{modalOpened && <GenerateQueryModalContent projectTitle={projectTitle} type={type} />}
		</Dialog>
	);
};

export default GenerateQueryModal;
