import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IconInfoCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

const InfoTooltip = ({ children }: { children: ReactNode }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<IconInfoCircle size={16} className="text-zinc-500" />
				</TooltipTrigger>
				<TooltipContent className="flex max-w-64 flex-col gap-1 text-xs">{children}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default InfoTooltip;
