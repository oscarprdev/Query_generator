import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Databases } from '@prisma/client';
import { Row } from '../TablesCard/TableCard';
import TableForm, { TableFormValues } from '../Forms/TableForm';
import { Badge } from '../ui/badge';
import { editTable } from '@/app/actions/edit-table';

type EditTableModalProps = {
	isOpened: boolean;
	tableId: string;
	title: string;
	type: Databases;
	rows: Row[];
	toggleModal: (open: boolean) => void;
};

const EditTableModal = ({ isOpened, tableId, title, type, rows, toggleModal }: EditTableModalProps) => {
	const handleSubmit = async (values: TableFormValues) => {
		await editTable({
			tableId,
			type,
			title: values.title,
			rows: values.rows,
		});
	};

	return (
		<Dialog open={isOpened} onOpenChange={toggleModal}>
			<DialogContent className="sm:max-w-[625px]">
				<DialogHeader>
					<DialogTitle className="mb-5 flex items-center gap-5">
						Editar tabla <Badge>{type}</Badge>
					</DialogTitle>
				</DialogHeader>
				<TableForm
					type={type}
					defaultValues={{ title, rows }}
					handleSubmit={handleSubmit}
					reset={false}
					submitLabel="Editar tabla"
				/>
			</DialogContent>
		</Dialog>
	);
};

export default EditTableModal;
