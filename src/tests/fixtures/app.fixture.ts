import { test as base } from 'playwright/test';
import { SetRouteInput } from '../types/types';
import { AppPage } from '../pages/app.page';

interface AppFixture {
	appPage: AppPage;
	navigateToApp(): Promise<void>;
	setRoute(input: SetRouteInput): Promise<void>;
}

export const test = base.extend<AppFixture>({
	appPage: async ({ page }, use) => {
		await use(new AppPage(page));
	},
	navigateToApp: async ({ page }, use) => {
		await use(async (): Promise<void> => {
			await page.goto(process.env.AUTH_SECRET || '');
			await page.goto(`/`);
		});
	},
	setRoute: async ({ page }, use) => {
		await use(async ({ url, response }): Promise<void> => {
			await page.route(url, async route => {
				if (route.request().method() === 'POST') {
					return await route.fulfill(response);
				}

				await route.fulfill(response);
			});
		});
	},
});
