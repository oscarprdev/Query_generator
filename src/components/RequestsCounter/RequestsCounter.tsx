'use server';

import { getAIrequestsQuery } from '@/services/queries/get-user.query';
import { IconDiamond } from '@tabler/icons-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type RequestsCounterProps = {
	userId: string;
};

const RequestsCounter = async ({ userId }: RequestsCounterProps) => {
	const response = await getAIrequestsQuery({ userId });

	return (
		<TooltipProvider>
			<Tooltip>
				{typeof response?.aiRequests === 'number' && (
					<TooltipTrigger
						asChild
						className={cn(
							response.aiRequests === 0
								? 'text-red-500 hover:text-red-800'
								: 'text-secondaryLight hover:text-secondary',
							'flex cursor-pointer items-center gap-2 duration-300'
						)}>
						<div>
							<p className="text-sm">{response.aiRequests}</p>
							<IconDiamond size={20} />
						</div>
					</TooltipTrigger>
				)}
				<TooltipContent side="left" className="z-50 flex max-w-64 flex-col gap-1 text-xs text-zinc-400">
					{response?.aiRequests === 0 ? (
						<p>
							No te quedan suficientes consultas disponibles usando la OPENAI API KEY por defecto,
							introduzca otra para continuar usando la aplicacion.
						</p>
					) : (
						<p>
							Por motivos del hackaton cada usuario tiene{' '}
							<span className="text-primary">10 peticiones gratuitas</span> usando la OPENAI API KEY por
							defecto.
						</p>
					)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default RequestsCounter;
