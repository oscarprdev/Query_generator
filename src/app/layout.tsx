import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Aside from '@/components/Aside/Aside';
import Header from '@/components/Header/Header';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import AuthSessionProvider from '@/providers/AuthSession';
import OpenAiApiKeyProvider from '@/providers/OpenAiApiKey';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AI Query',
	description: 'Crea, guarda y gestiona tus querys, schemas y semillas de forma sencilla sin apenas conocimientos en base de datos.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(inter.className, 'flex h-screen w-screen flex-col overflow-hidden bg-background')}>
				<AuthSessionProvider>
					<OpenAiApiKeyProvider>
						<Header />
						<main className="flex h-screen w-full items-start">
							<Aside />
							{children}
						</main>
					</OpenAiApiKeyProvider>
				</AuthSessionProvider>
				<Toaster />
			</body>
		</html>
	);
}
