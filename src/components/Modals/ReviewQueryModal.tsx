'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import ReviewQueryModalContent from './ReviewQueryModalContent';
import { Databases } from '@prisma/client';

type ReviewQueryModalProps = {
	queryId: string;
	type: Databases;
	children: ReactNode;
};

const ReviewQueryModal = ({ queryId, type, children }: ReviewQueryModalProps) => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<Dialog onOpenChange={setModalOpened}>
			<DialogTrigger asChild className="h-fit">
				{children}
			</DialogTrigger>
			{modalOpened && <ReviewQueryModalContent queryId={queryId} type={type} />}
		</Dialog>
	);
};

export default ReviewQueryModal;
