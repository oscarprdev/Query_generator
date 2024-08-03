'use client';

import { createContext, ReactNode, useState } from 'react';

interface OpenAiApiKeyContext {
	getApiKey: () => string | null;
	handleApiKey: (apiKey: string) => void;
}

export const OpenAiApiKeyContext = createContext<OpenAiApiKeyContext>({
	getApiKey: () => null,
	handleApiKey: () => {},
});

const OpenAiApiKeyProvider = ({ children }: { children: ReactNode }) => {
	const handleApiKey = (apiKey: string) => {
		localStorage.setItem('apiKey', apiKey);
	};

	const getApiKey = () => localStorage.getItem('apiKey');

	return <OpenAiApiKeyContext.Provider value={{ getApiKey, handleApiKey }}>{children}</OpenAiApiKeyContext.Provider>;
};

export default OpenAiApiKeyProvider;
