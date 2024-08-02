'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { Databases } from '@prisma/client';
import { getSchemaById, Schema } from '@/app/actions/schemas/get-schema-by-id';
import { updateSchema } from '@/app/actions/schemas/update-schema';
import ReviewModal, { ModalEntity } from '../shared/ReviewModal';
import ReviewSchemaModalContent from './ReviewSchemaModalContent';

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
					queryId={schemaId}
					setModalContent={handleModalContent}
					type={type}
					labels={{
						onOpen: 'Obteniendo schema ...',
						loading: 'Editando schema ...',
						success: 'Schema editado correctamente!',
						error: 'No se ha encontrado el schema que buscabas, porfavor intentalo mas tarde.',
						title: 'Detalles de tu schema.',
						submitButton: 'Guardar schema',
					}}>
					{schemaModalContent && <ReviewSchemaModalContent schema={schemaModalContent} />}
				</ReviewModal>
			)}
		</Dialog>
	);
};

export default ReviewSchemaModal;
