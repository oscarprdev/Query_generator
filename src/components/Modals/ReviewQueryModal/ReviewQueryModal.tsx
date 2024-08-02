'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { Databases } from '@prisma/client';
import { getQueryById, Query } from '@/app/actions/queries/get-query-by-id';
import { updateQuery } from '@/app/actions/queries/update-query';
import ReviewModal, { ModalEntity } from '../shared/ReviewModal';
import ReviewQueryModalContent from './ReviewQueryModalContent';

type ReviewQueryModalProps = {
	queryId: string;
	type: Databases;
	children: ReactNode;
};

const ReviewQueryModal = ({ queryId, type, children }: ReviewQueryModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);
	const [queryModalContent, setQueryModalContent] = useState<Query | null>(null);

	const handleModalContent = (input: ModalEntity) => {
		if ('action' in input) {
			setQueryModalContent(input);
		}
	};

	return (
		<Dialog onOpenChange={setModalOpened}>
			<DialogTrigger asChild className="h-fit">
				{children}
			</DialogTrigger>
			{modalOpened && (
				<ReviewModal
					getCode={(id: string) => getQueryById({ id })}
					updateCode={updateQuery}
					queryId={queryId}
					setModalContent={handleModalContent}
					type={type}
					labels={{
						onOpen: 'Obteniendo query ...',
						loading: 'Editando query ...',
						success: 'Query editada correctamente!',
						error: 'No se ha encontrado la query que buscabas, porfavor intentalo mas tarde.',
						title: 'Detalles de tu query.',
						submitButton: 'Guardar query',
					}}>
					{queryModalContent && <ReviewQueryModalContent query={queryModalContent} />}
				</ReviewModal>
			)}
		</Dialog>
	);
};

export default ReviewQueryModal;
