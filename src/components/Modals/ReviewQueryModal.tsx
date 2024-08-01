'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import ReviewQueryModalContent from './ReviewQueryModalContent';

type ReviewQueryModalProps = {
	queryId: string;
	children: ReactNode;
};

const ReviewQueryModal = ({ queryId, children }: ReviewQueryModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<Dialog onOpenChange={e => {
			console.log(e)
			setModalOpened(e)
		}}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			{modalOpened && <ReviewQueryModalContent queryId={queryId} />}
		</Dialog>
	);
};

export default ReviewQueryModal;
