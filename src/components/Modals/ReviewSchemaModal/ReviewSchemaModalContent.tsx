import { Schema } from '@/app/actions/schemas/get-schema-by-id';
import { Badge } from '../../ui/badge';
import { capitalizeStr } from '@/lib/strings';

type ReviewSchemaModalContentProps = {
	schema: Schema;
};

const ReviewSchemaModalContent = ({ schema }: ReviewSchemaModalContentProps) => {
	return (
		<div className="flex items-center gap-2">
			<p className="text-md text-zinc-400">{capitalizeStr(schema.title)}</p>
			{schema.table && <Badge variant={'primary'}>{schema.table}</Badge>}
		</div>
	);
};

export default ReviewSchemaModalContent;
