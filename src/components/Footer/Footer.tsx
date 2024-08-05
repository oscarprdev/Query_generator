import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<footer className="mt-auto w-full items-center justify-center bg-background p-1">
			<h5 className="text-center text-xs text-zinc-500">
				Hecho con ♥️ por{' '}
				<Link
					href={'https://github.com/oscarprdev'}
					target="blank"
					className="font-bold hover:text-primary hover:underline">
					Oscar Perez
				</Link>
			</h5>
		</footer>
	);
};

export default Footer;
