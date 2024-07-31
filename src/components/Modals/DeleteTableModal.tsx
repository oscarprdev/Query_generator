'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Databases } from '@prisma/client';
import { deleteTable } from '@/app/actions/delete-table';
import { useState } from 'react';

type DeleteTableModalProps = {
	isOpened: boolean;
	title: string;
	type: Databases;
	tableId: string;
	toggleModal: (open: boolean) => void;
};

const DeleteTableModal = ({ tableId, type, title, isOpened, toggleModal }: DeleteTableModalProps) => {
	const [loading, setLoading] = useState(false);

	const handleRemoveTableClick = async () => {
		setLoading(true);
		await deleteTable({ tableId, type });
	};

	return (
		<Dialog open={isOpened} onOpenChange={toggleModal}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Eliminar tabla</DialogTitle>
				</DialogHeader>
				<p className="text-center text-sm text-zinc-500">
					Estas seguro que quieres eliminar la tabla <span className="font-bold text-primary">{title}</span>?
				</p>
				<p className="text-center text-sm text-zinc-400">La accion es irreversible.</p>
				<Button className="mt-5" onClick={() => handleRemoveTableClick()}>
					{loading ? 'Loading' : 'Eliminar tabla'}
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteTableModal;
