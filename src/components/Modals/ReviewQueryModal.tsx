import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode } from 'react';
import QueryView from '../QueryView/QueryView';

type ReviewQueryModalProps = {
	children: ReactNode;
};

const ReviewQueryModal = ({ children }: ReviewQueryModalProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Detalles de tu query!</DialogTitle>
				</DialogHeader>

				<QueryView />
			</DialogContent>
		</Dialog>
	);
};

export default ReviewQueryModal;
