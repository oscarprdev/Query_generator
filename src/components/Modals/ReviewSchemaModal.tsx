'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ReviewSchemaModalContent from './ReviewSchemaModalContent';
import { ReactNode, useState } from 'react';

type ReviewSchemaModalProps = {
	children: ReactNode;
	schemaId: string;
};

const ReviewSchemaModal = ({ children, schemaId }: ReviewSchemaModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<Dialog onOpenChange={setModalOpened}>
			<DialogTrigger>{children}</DialogTrigger>
			{modalOpened && <ReviewSchemaModalContent />}
		</Dialog>
	);
};

export default ReviewSchemaModal;
