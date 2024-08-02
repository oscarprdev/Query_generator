'use client';

import { Dialog } from '@/components/ui/dialog';
import { Databases } from '@prisma/client';
import DeleteTableModalContent from './DeleteTableModalContent';

type DeleteTableModalProps = {
	project
	toggleModal: (open: boolean) => void;
};

const DeleteTableModal = ({ tableId, type, title, isOpened, toggleModal }: DeleteTableModalProps) => {
	return (
		<Dialog open={isOpened} onOpenChange={toggleModal}>
			{isOpened && <DeleteTableModalContent tableId={tableId} type={type} title={title} />}
		</Dialog>
	);
};

export default DeleteTableModal;
