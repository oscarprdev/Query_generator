import React from 'react';
import Footer from '../Footer/Footer';
import AsideProjectsList from '../AsideProjectsList/AsideProjectsList';

const Aside = () => {
	return (
		<aside className="flex h-full w-1/5 flex-col items-start border-r border-border bg-background px-5 py-5">
			<AsideProjectsList />
			<Footer />
		</aside>
	);
};

export default Aside;
