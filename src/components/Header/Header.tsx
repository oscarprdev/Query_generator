import { IconCloudStorm } from '@tabler/icons-react';

const Header = () => {
	return (
		<header className="sticky top-0 flex w-screen items-center border-b border-border bg-background px-10 py-5">
			<IconCloudStorm className="text-primary" size={32} />
		</header>
	);
};

export default Header;
