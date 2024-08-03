import InfoTooltip from '../infoTooltip/InfoTooltip';

const QueryFormPromptInfo = () => {
	return (
		<InfoTooltip>
			<p>
				Usa el prompt solo si crees que necesitas aportar algun detalle extra no contemplado en el formulario.
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
		</InfoTooltip>
	);
};

export default QueryFormPromptInfo;
