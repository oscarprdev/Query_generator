import { Schema } from '@/app/actions/get-schema-by-id';
import { Badge } from '../ui/badge';

type ReviewSchemaModalContentProps = {
	schema: Schema;
};

const ReviewSchemaModalContent = ({ schema }: ReviewSchemaModalContentProps) => {
	return (
		<div className="flex items-center gap-2">
			<p className="text-md capitalize text-zinc-400">{schema.title}</p>
			<Badge variant={'primary'} className="capitalize">
				{schema.table}
			</Badge>
		</div>
	);
};

export default ReviewSchemaModalContent;
