import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import QueryForm, { QueryFormValues } from '../Forms/QueryForm';
import { Databases } from '@prisma/client';

type GenerateQueryModalProps = {
	projectTitle: string;
	type: Databases;
};

const GenerateQueryModal = ({ projectTitle, type }: GenerateQueryModalProps) => {
	const handleSubmit = async (values: QueryFormValues) => {
		'use server';
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="ml-auto">Generar query</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[625px]">
				<DialogHeader>
					<DialogTitle>Genera tu propia query!</DialogTitle>
				</DialogHeader>
				<QueryForm
					handleSubmit={handleSubmit}
					type={type}
					projectTitle={projectTitle}
					reset={false}
					defaultValues={{ title: '', tables: [], filters: [] }}
					submitLabel="Generar query"
				/>
			</DialogContent>
		</Dialog>
	);
};

export default GenerateQueryModal;
