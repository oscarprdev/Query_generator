'use client';

import { ReactNode, useState } from 'react';
import Factory from '../Factory/Factory';
import TablesView from '../TablesView/TablesView';

type AppControllerProps = {
	projectTitle: string;
	factoryTabs: ReactNode;
	tables: ReactNode;
};

const AppController = ({ projectTitle, factoryTabs, tables }: AppControllerProps) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleToggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className="h-full w-full">
			<TablesView projectTitle={projectTitle} isVisible={isVisible}>
				{tables}
			</TablesView>
			<Factory projectTitle={projectTitle} isVisible={isVisible} toggleVisibility={handleToggleVisibility}>
				{factoryTabs}
			</Factory>
		</div>
	);
};

export default AppController;
