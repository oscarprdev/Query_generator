'use client';

import { createUser } from '@/app/actions/users/create-user';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface SessionStorageContext {
	user?: string;
}

export const SessionStorageContext = createContext<SessionStorageContext>({ user: '' });

const SessionStorage = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<string>();

	useEffect(() => {
		const handleCreateUser = async () => {
			const user = await createUser();

			setUser(user);
		};

		handleCreateUser();
	}, []);
	return <SessionStorageContext.Provider value={{ user }}>{children}</SessionStorageContext.Provider>;
};

export default SessionStorage;
