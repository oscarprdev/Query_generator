'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { Databases } from '@prisma/client';
import { getSchemaById, Schema } from '@/app/actions/schemas/get-schema-by-id';
import { updateSchema } from '@/app/actions/schemas/update-schema';
import ReviewModal, { ModalEntity } from '../shared/ReviewModal';
import ReviewSchemaModalContent from './ReviewSchemaModalContent';
import { deleteSchema } from '@/app/actions/schemas/delete-schema';
import { ERRORS_MESSAGES, LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/constants/wordings';

type ReviewSchemaModalProps = {
	children: ReactNode;
	schemaId: string;
	type: Databases;
};

const ReviewSchemaModal = ({ children, schemaId, type }: ReviewSchemaModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);
	const [schemaModalContent, setSchemaModalContent] = useState<Schema | null>(null);

	const handleModalContent = (input: ModalEntity) => {
		if ('table' in input) {
			setSchemaModalContent(input);
		}
	};
	return (
		<Dialog onOpenChange={setModalOpened}>
			<DialogTrigger className="h-fit">{children}</DialogTrigger>
			{modalOpened && (
				<ReviewModal
					getCode={(id: string) => getSchemaById({ id })}
					updateCode={updateSchema}
					deleteCode={deleteSchema}
					queryId={schemaId}
					setModalContent={handleModalContent}
					type={type}
					labels={{
						onOpen: LOADING_MESSAGES.GETTING_SCHEMA,
						loading: LOADING_MESSAGES.EDITTING_SCHEMA,
						success: SUCCESS_MESSAGES.EDITTING_SCHEMA,
						deleting: LOADING_MESSAGES.DELETTING_SCHEMA,
						deleted: SUCCESS_MESSAGES.DELETTING_SCHEMA,
						error: ERRORS_MESSAGES.GETTING_SCHEMA,
						errorDeletting: ERRORS_MESSAGES.DELETTING_SCHEMA,
						errorUpdatting: ERRORS_MESSAGES.UPDATING_SCHEMA,
						title: 'Detalles de tu schema.',
						submitButton: 'Guardar schema',
						deleteButton: 'Eliminar schema',
					}}>
					{schemaModalContent && <ReviewSchemaModalContent schema={schemaModalContent} />}
				</ReviewModal>
			)}
		</Dialog>
	);
};

export default ReviewSchemaModal;
