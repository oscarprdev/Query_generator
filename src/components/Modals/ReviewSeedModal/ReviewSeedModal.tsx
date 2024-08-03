'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { Databases } from '@prisma/client';
import { getSeedById, Seed } from '@/app/actions/seeds/get-seed-by-id';
import { updateSeed } from '@/app/actions/seeds/update-seed';
import ReviewModal, { ModalEntity } from '../shared/ReviewModal';
import ReviewSeedModalContent from './ReviewSeedModalContent';
import { deleteSeed } from '@/app/actions/seeds/delete-seed';
import { ERRORS_MESSAGES, LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/constants/wordings';

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
					deleteCode={deleteSeed}
					queryId={seedId}
					setModalContent={handleModalContent}
					type={type}
					labels={{
						onOpen: LOADING_MESSAGES.GETTING_SEED,
						loading: LOADING_MESSAGES.EDITTING_SEED,
						success: SUCCESS_MESSAGES.EDITTING_SEED,
						deleting: LOADING_MESSAGES.DELETTING_SEED,
						deleted: SUCCESS_MESSAGES.DELETTING_SEED,
						error: ERRORS_MESSAGES.GETTING_SEED,
						errorDeletting: ERRORS_MESSAGES.DELETTING_SEED,
						errorUpdatting: ERRORS_MESSAGES.UPDATING_SEED,
						title: 'Detalles de tu semilla.',
						submitButton: 'Guardar semilla',
						deleteButton: 'Eliminar semilla',
					}}>
					{seedModalContent && <ReviewSeedModalContent seed={seedModalContent} />}
				</ReviewModal>
			)}
		</Dialog>
	);
};

export default ReviewSeedModal;
