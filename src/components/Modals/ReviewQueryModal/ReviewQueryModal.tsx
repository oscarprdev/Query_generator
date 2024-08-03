'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { Databases } from '@prisma/client';
import { getQueryById, Query } from '@/app/actions/queries/get-query-by-id';
import { updateQuery } from '@/app/actions/queries/update-query';
import ReviewModal, { ModalEntity } from '../shared/ReviewModal';
import ReviewQueryModalContent from './ReviewQueryModalContent';
import { deleteQuery } from '@/app/actions/queries/delete-query';
import { ERRORS_MESSAGES, LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/constants/wordings';

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
					deleteCode={deleteQuery}
					queryId={queryId}
					setModalContent={handleModalContent}
					type={type}
					labels={{
						onOpen: LOADING_MESSAGES.GETTING_QUERY,
						loading: LOADING_MESSAGES.EDITTING_QUERY,
						success: SUCCESS_MESSAGES.EDITTING_QUERY,
						deleting: LOADING_MESSAGES.DELETTING_QUERY,
						deleted: SUCCESS_MESSAGES.DELETTING_QUERY,
						error: ERRORS_MESSAGES.GETTING_QUERY,
						errorDeletting: ERRORS_MESSAGES.DELETTING_QUERY,
						errorUpdatting: ERRORS_MESSAGES.UPDATING_QUERY,
						title: 'Detalles de tu query.',
						submitButton: 'Guardar query',
						deleteButton: 'Eliminar query',
					}}>
					{queryModalContent && <ReviewQueryModalContent query={queryModalContent} />}
				</ReviewModal>
			)}
		</Dialog>
	);
};

export default ReviewQueryModal;
