'use client';

import { createUser } from '@/app/actions/users/create-user';
import { toast } from '@/components/ui/use-toast';
import { isError } from '@/lib/either';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface SessionStorageContext {
	user?: string;
}

export const SessionStorageContext = createContext<SessionStorageContext>({ user: '' });

const SessionStorage = ({ children }: { children: ReactNode }) => {
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
	return <SessionStorageContext.Provider value={{ user }}>{children}</SessionStorageContext.Provider>;
};

export default SessionStorage;
