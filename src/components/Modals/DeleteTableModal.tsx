import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type DeleteTableModalProps = {
	isOpened: boolean;
	toggleModal: (open: boolean) => void;
};

const DeleteTableModal = ({ isOpened, toggleModal }: DeleteTableModalProps) => {
	return (
		<Dialog open={isOpened} onOpenChange={toggleModal}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Eliminar tabla</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteTableModal;
