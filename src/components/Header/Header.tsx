'use server';

import { IconCloudStorm } from '@tabler/icons-react';
import RequestsCounter from '../RequestsCounter/RequestsCounter';
import { auth } from '@/auth';

const Header = async () => {
	const session = await auth();
	const user = session?.user;

	return (
		<header className="sticky top-0 flex w-screen items-center justify-between border-b border-border bg-background px-10 py-5">
			<IconCloudStorm className="text-primary" size={32} />
			{user && user.id && <RequestsCounter userId={user.id} />}
		</header>
	);
};

export default Header;
