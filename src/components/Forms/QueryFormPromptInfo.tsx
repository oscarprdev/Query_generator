import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IconInfoCircle } from '@tabler/icons-react';

const QueryFormPromptInfo = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<IconInfoCircle size={16} className="text-zinc-500" />
				</TooltipTrigger>
				<TooltipContent className="flex max-w-64 flex-col gap-1 text-xs">
					<p>
						Usa el prompt solo si crees que necesitas aportar algun detalle extra no contemplado en el
						formulario.
					</p>
					<p className="text-zinc-500">Ejemplos:</p>
					<ul className="list-disc pl-4 text-zinc-500">
						<li>
							<p>Solo devuelve los valores del id y del username de la tabla Users.</p>
						</li>
						<li>
							<p>Ordena de menor a mayor segun el valor de createdAt.</p>
						</li>
						<li>
							<p>Necesito que hagas un populate de la tabla Books.</p>
						</li>
					</ul>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default QueryFormPromptInfo;
