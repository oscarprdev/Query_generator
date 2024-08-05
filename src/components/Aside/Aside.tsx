import React, { Suspense } from 'react';
import Footer from '../Footer/Footer';
import AsideProjectsList, { AsideProjectListSkeleton } from '../AsideProjectsList/AsideProjectsList';

const Aside = () => {
	return (
		<aside className="flex h-full w-1/6 min-w-[200px] flex-col items-start border-r border-border bg-background px-5 py-5">
			<Suspense fallback={<AsideProjectListSkeleton />}>
				<AsideProjectsList />
			</Suspense>
			<Footer />
		</aside>
	);
};

export default Aside;
