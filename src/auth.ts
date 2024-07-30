import authConfig from './auth.config';
import NextAuth from 'next-auth';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		session({ session, token }) {
			return session;
		},
	},
	session: {},
	...authConfig,
});
