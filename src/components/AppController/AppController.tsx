'use client';

import { ReactNode, useState } from 'react';
import Factory from '../Factory/Factory';
import TablesView from '../TablesView/TablesView';
import { Databases } from '@prisma/client';

type AppControllerProps = {
	projectTitle?: string;
	projectType?: Databases;
	factoryTabs: ReactNode;
	tables: ReactNode;
};

const AppController = ({ projectTitle, projectType, factoryTabs, tables }: AppControllerProps) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleToggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className="h-full w-full">
			<TablesView isVisible={isVisible}>{tables}</TablesView>
			<Factory
				projectType={projectType}
				projectTitle={projectTitle}
				isVisible={isVisible}
				toggleVisibility={handleToggleVisibility}>
				{factoryTabs}
			</Factory>
		</div>
	);
};

export default AppController;
