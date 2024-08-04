import authConfig from './auth.config';
import NextAuth from 'next-auth';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
			}

			return session;
		},
	},
	session: { strategy: 'jwt' },
	...authConfig,
});
