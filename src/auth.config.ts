import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserQuery } from './services/queries/get-user.query';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const user = await getUserQuery({ userId: credentials.id as string });

				return {
					name: user?.id,
					apiKey: user?.apiKey,
				};
			},
		}),
	],
} satisfies NextAuthConfig;
