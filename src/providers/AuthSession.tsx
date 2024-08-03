'use client';

import { createUser } from '@/app/actions/users/create-user';
import { toast } from '@/components/ui/use-toast';
import { isError } from '@/lib/either';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthSessionContext {
	user?: string;
}

export const AuthSessionContext = createContext<AuthSessionContext>({ user: '' });

const AuthSessionProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<string>();

	useEffect(() => {
		const handleCreateUser = async () => {
			const response = await createUser();
			if (response && isError(response)) {
				toast({
					variant: 'destructive',
					description: response.error,
				});
				return;
			}

			setUser(user);
		};

		handleCreateUser();
	}, []);
	return <AuthSessionContext.Provider value={{ user }}>{children}</AuthSessionContext.Provider>;
};

export default AuthSessionProvider;
