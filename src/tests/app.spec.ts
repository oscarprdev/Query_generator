import { expect } from '@playwright/test';
import { test } from './fixtures/app.fixture';

test.describe('App', () => {
	test.beforeEach(async ({ page, navigateToApp }) => {
		await navigateToApp();
	});

	test('Should layout be properly configured', async ({ appPage }) => {
		await expect(appPage.appTitle).toBeVisible();
		await expect(appPage.appTitle).toHaveText('AI Query');

		await expect(appPage.header).toBeVisible();
		await expect(appPage.headerLink).toBeVisible();
		await expect(appPage.headerLink).toHaveText('HACKATON VERCEL - MIDUDEV 2024');

		await expect(appPage.aside).toBeVisible();
		await expect(appPage.footer).toBeVisible();
		await expect(appPage.asideLink).toBeVisible();

		const asideLinkUrl = await appPage.asideLink.getAttribute('href');
		expect(asideLinkUrl).toBe('https://github.com/oscarprdev');

		await expect(appPage.createProjectButton).toBeVisible();
		await expect(appPage.createProjectButton).toHaveText('Crear proyecto');
	});
});
