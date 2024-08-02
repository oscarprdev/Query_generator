'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { Databases } from '@prisma/client';
import ReviewModal, { ModalEntity } from './ReviewModal';
import { getSeedById, Seed } from '@/app/actions/get-seed-by-id';
import ReviewSeedModalContent from './ReviewSeedModalContent';
import { updateSeed } from '@/app/actions/update-seed';

type ReviewSeedModalProps = {
	children: ReactNode;
	seedId: string;
	type: Databases;
};

const ReviewSeedModal = ({ children, seedId, type }: ReviewSeedModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);
	const [seedModalContent, setSeedModalContent] = useState<Seed | null>(null);

	const handleModalContent = (input: ModalEntity) => {
		if ('table' in input) {
			setSeedModalContent(input);
		}
	};
	return (
		<Dialog onOpenChange={setModalOpened}>
			<DialogTrigger className="h-fit">{children}</DialogTrigger>
			{modalOpened && (
				<ReviewModal
					getCode={(id: string) => getSeedById({ id })}
					updateCode={updateSeed}
					queryId={seedId}
					setModalContent={handleModalContent}
					type={type}
					labels={{
						onOpen: 'Obteniendo semilla ...',
						loading: 'Editando semilla ...',
						success: 'Semilla editado correctamente!',
						error: 'No se ha encontrado la semilla que buscabas, porfavor intentalo mas tarde.',
						title: 'Detalles de tu semilla.',
						submitButton: 'Guardar semilla',
					}}>
					{seedModalContent && <ReviewSeedModalContent seed={seedModalContent} />}
				</ReviewModal>
			)}
		</Dialog>
	);
};

export default ReviewSeedModal;
