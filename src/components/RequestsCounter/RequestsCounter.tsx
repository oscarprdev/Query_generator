'use server';

import { getAIrequestsQuery } from '@/services/queries/get-user.query';
import { IconDiamond } from '@tabler/icons-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type RequestsCounterProps = {
	userId: string;
};

const RequestsCounter = async ({ userId }: RequestsCounterProps) => {
	const response = await getAIrequestsQuery({ userId });

	return (
		<TooltipProvider>
			<Tooltip>
				{response?.aiRequests && (
					<TooltipTrigger
						asChild
						className="flex cursor-pointer items-center gap-2 text-secondaryLight duration-300 hover:text-secondary">
						<div>
							<p className="text-sm">{response.aiRequests}</p>
							<IconDiamond size={20} />
						</div>
					</TooltipTrigger>
				)}
				<TooltipContent side="left" className="z-50 flex max-w-64 flex-col gap-1 text-xs text-zinc-400">
					<p>
						Por motivos del hackaton cada usuario tiene{' '}
						<span className="text-primary">10 peticiones gratuitas</span> usando la OPENAI API KEY por
						defecto.
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default RequestsCounter;
