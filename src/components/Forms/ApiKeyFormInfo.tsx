import InfoTooltip from '../infoTooltip/InfoTooltip';

const ApiKeyFormInfo = () => {
	return (
		<InfoTooltip>
			<p className="text-pretty">
				Debido al hackaton de <span className="text-primary">Vercel + Midudev</span>, esta aplicacion te permite
				usar solo 10 veces la OpenAi api key por defecto.
			</p>
			<p className="text-pretty">
				Si quieres continuar usando la aplicacion introduce tu propia{' '}
				<span className="text-secondary">OpenAi Api Key</span>. Sera encriptada por motivos de seguridad.
			</p>
		</InfoTooltip>
	);
};

export default ApiKeyFormInfo;
