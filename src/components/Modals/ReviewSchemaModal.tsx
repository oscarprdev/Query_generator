'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ReviewSchemaModalContent from './ReviewSchemaModalContent';
import { ReactNode, useState } from 'react';
import { Databases } from '@prisma/client';

type ReviewSchemaModalProps = {
	children: ReactNode;
	schemaId: string;
	type: Databases;
};

const ReviewSchemaModal = ({ children, schemaId, type }: ReviewSchemaModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<Dialog onOpenChange={setModalOpened}>
			<DialogTrigger className="h-fit">{children}</DialogTrigger>
			{modalOpened && <ReviewSchemaModalContent schemaId={schemaId} type={type} />}
		</Dialog>
	);
};

export default ReviewSchemaModal;
