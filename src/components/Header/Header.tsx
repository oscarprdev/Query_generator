'use server';

import { IconCloudStorm } from '@tabler/icons-react';
import RequestsCounter from '../RequestsCounter/RequestsCounter';
import { auth } from '@/auth';
import Link from 'next/link';

const Header = async () => {
	const session = await auth();
	const user = session?.user;

	return (
		<header
			data-testid="app-header"
			className="sticky top-0 flex w-screen items-center justify-between border-b border-border bg-background px-10 py-5">
			<div className="flex items-center gap-2">
				<IconCloudStorm className="text-primary" size={32} />
				<h1 data-testid="app-title" className="text-sm text-primary">
					AI Query
				</h1>
			</div>

			<Link
				data-testid="app-header-link"
				href={'https://github.com/midudev/hackaton-vercel-2024'}
				target="blank"
				className="rounded-lg bg-gradient-to-r from-secondary to-secondaryLight px-5 py-2 text-xs font-bold text-white">
				HACKATON VERCEL - MIDUDEV 2024
			</Link>

			{user && user.id && <RequestsCounter userId={user.id} />}
		</header>
	);
};

export default Header;
