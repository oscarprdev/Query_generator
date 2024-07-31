import { IconEdit } from '@tabler/icons-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TableCardDropdownProps = {
	handleEditModal: () => void;
	handleDeleteModal: () => void;
};

const TableCardDropdown = ({ handleEditModal, handleDeleteModal }: TableCardDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="grid place-items-center p-2">
				<IconEdit size={20} className="text-zinc-600 hover:text-zinc-400" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Acciones</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => handleEditModal()}>Editar tabla</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleDeleteModal()}>Eliminar</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TableCardDropdown;
