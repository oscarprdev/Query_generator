import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Databases } from '@prisma/client';
import { Row } from '../../TablesCard/TableCard';
import TableForm, { TableFormValues } from '../../Forms/TableForm';
import { Badge } from '../../ui/badge';
import { editTable } from '@/app/actions/tables/edit-table';
import { isError } from '@/lib/either';
import { toast } from '@/components/ui/use-toast';

type EditTableModalProps = {
	isOpened: boolean;
	tableId: string;
	title: string;
	projectTitle: string;
	type: Databases;
	rows: Row[];
	toggleModal: (open: boolean) => void;
};

const EditTableModal = ({ isOpened, tableId, title, projectTitle, type, rows, toggleModal }: EditTableModalProps) => {
	const handleSubmit = async (values: TableFormValues) => {
		const response = await editTable({
			tableId,
			type,
			title: values.title,
			rows: values.rows,
		});
		if (response && isError(response)) {
			toast({
				variant: 'destructive',
				description: response.error,
			});
		}
	};

	return (
		<Dialog open={isOpened} onOpenChange={toggleModal}>
			{isOpened && (
				<DialogContent className="pb-1 sm:max-w-[625px]">
					<DialogHeader>
						<DialogTitle className="mb-5 flex items-center gap-5">
							Editar tabla <Badge>{type}</Badge>
						</DialogTitle>
					</DialogHeader>
					<TableForm
						type={type}
						projectTitle={projectTitle}
						defaultValues={{ title, rows }}
						handleSubmit={handleSubmit}
						reset={false}
						submitLabel="Editar tabla"
					/>
				</DialogContent>
			)}
		</Dialog>
	);
};

export default EditTableModal;
