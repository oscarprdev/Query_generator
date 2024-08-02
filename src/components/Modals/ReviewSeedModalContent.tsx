import { Badge } from '../ui/badge';
import { capitalizeStr } from '@/lib/strings';
import { Seed } from '@/app/actions/get-seed-by-id';

type ReviewSeedModalContentProps = {
	seed: Seed;
};

const ReviewSeedModalContent = ({ seed }: ReviewSeedModalContentProps) => {
	return (
		<div className="flex items-center gap-2">
			<p className="text-md text-zinc-400">{capitalizeStr(seed.title)}</p>
			<Badge variant={'primary'}>{seed.table}</Badge>
		</div>
	);
};

export default ReviewSeedModalContent;
