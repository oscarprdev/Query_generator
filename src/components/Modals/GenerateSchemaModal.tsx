'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Databases } from '@prisma/client';
import { useState } from 'react';
import GenerateSchemaModalContent from './GenerateSchemaModalContent';

type GenerateSchemaModalProps = {
	projectTitle: string;
	type: Databases;
};

const GenerateSchemaModal = ({ projectTitle, type }: GenerateSchemaModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<Dialog onOpenChange={e => setModalOpened(e)}>
			<DialogTrigger asChild>
				<Button className="ml-auto flex">Generar schema</Button>
			</DialogTrigger>
			{modalOpened && <GenerateSchemaModalContent projectTitle={projectTitle} type={type} />}
		</Dialog>
	);
};

export default GenerateSchemaModal;
