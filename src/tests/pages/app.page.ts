import { Locator, Page } from '@playwright/test';

export class AppPage {
	readonly header: Locator;
	readonly appTitle: Locator;
	readonly headerLink: Locator;

	readonly aside: Locator;
	readonly footer: Locator;
	readonly asideLink: Locator;

	readonly createProjectButton: Locator;

	constructor(protected page: Page) {
		this.header = this.page.getByTestId('app-header');
		this.appTitle = this.page.getByTestId('app-title');
		this.headerLink = this.page.getByTestId('app-header-link');

		this.aside = this.page.locator('aside');
		this.footer = this.page.locator('footer');
		this.asideLink = this.page.getByTestId('aside-footer-link');

		this.createProjectButton = this.page.getByTestId('create-project-button');
	}
}
