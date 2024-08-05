import { expect, Locator, Page } from '@playwright/test';

export class CreateProjectModalPage {
	readonly createProjectButton: Locator;

	readonly createProjectModalContent: Locator;

	readonly modalTitle: Locator;

	readonly createProjectForm: Locator;
	readonly createProjectFormTitle: Locator;
	readonly createProjectFormDatabaseSelectTrigger: Locator;
	readonly createProjectFormDatabaseSelectContent: Locator;
	readonly createProjectFormSelectItem1: Locator;
	readonly createProjectFormSelectItem2: Locator;
	readonly createProjectFormSubmitBtn: Locator;

	readonly successModal: Locator;
	readonly loadingModal: Locator;
	readonly modalClose: Locator;

	constructor(protected page: Page) {
		this.createProjectButton = this.page.getByTestId('create-project-button');
		this.createProjectModalContent = this.page.getByTestId('create-project-modal');

		this.modalTitle = this.page.getByTestId('create-project-modal-title');

		this.createProjectForm = this.page.getByTestId('create-project-form');
		this.createProjectFormTitle = this.page.getByTestId('create-project-form-title');
		this.createProjectFormDatabaseSelectTrigger = this.page.getByTestId('create-project-form-database');
		this.createProjectFormDatabaseSelectContent = this.page.getByTestId(
			'create-project-form-database-select-content'
		);
		this.createProjectFormSelectItem1 = this.page.getByTestId('create-project-form-select-1');
		this.createProjectFormSelectItem2 = this.page.getByTestId('create-project-form-select-2');
		this.createProjectFormSubmitBtn = this.page.getByTestId('create-project-form-submit-btn');

		this.successModal = this.page.getByTestId('success-modal');
		this.loadingModal = this.page.getByTestId('loading-modal');

		this.modalClose = this.page.getByTestId('modal-close');
	}

	openModal() {
		this.createProjectButton.click();
	}

	getAsideProjectItem(title: string) {
		return this.page.getByTestId(`aside-project-${title}`);
	}

	async createProject() {
		const projectTitle = 'Test-001';
		await this.createProjectFormTitle.fill(projectTitle);
		await this.createProjectFormDatabaseSelectTrigger.click();
		await this.createProjectFormSelectItem1.click();
		await this.createProjectFormSubmitBtn.click();

		await expect(this.loadingModal).toBeVisible();
		await expect(this.successModal).toBeVisible();

		const project = this.getAsideProjectItem(projectTitle);
		await expect(project).toBeVisible();

		await this.modalClose.click();
	}
}
