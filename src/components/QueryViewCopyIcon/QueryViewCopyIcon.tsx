import { IconCopy, IconCheck } from '@tabler/icons-react';

import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface QueryViewCopyIconProps {
	code: string;
}

const QueryViewCopyIcon = ({ code }: QueryViewCopyIconProps) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopyClick = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setIsCopied(true);

			setTimeout(() => setIsCopied(false), 5000);
		} catch (err) {
			console.error('No es posible copiar el codigo:', err);
		}
	};

	return (
		<>
			{isCopied ? (
				<div className="absolute right-2 top-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<IconCheck className="animate-fade-in w-4 text-zinc-400" />
							</TooltipTrigger>
							<TooltipContent>Copied!</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			) : (
				<span className="absolute right-2 top-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<IconCopy
									data-testid="icon-copy"
									onClick={handleCopyClick}
									className="animate-fade-in w-4 text-zinc-400"
								/>
							</TooltipTrigger>
							<TooltipContent className="text-xs">Copiar codigo</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</span>
			)}
		</>
	);
};

export default QueryViewCopyIcon;
