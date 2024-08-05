import { expect } from '@playwright/test';
import { test } from './fixtures/create-project-modal.fixture';

test.describe('Create project modal', () => {
	test.beforeEach(async ({ navigateToApp, createProjectModal }) => {
		await navigateToApp();

		await expect(createProjectModal.createProjectButton).toBeVisible();

		createProjectModal.openModal();

		await expect(createProjectModal.createProjectModalContent).toBeVisible();
	});

	test('Modal content should be properly displayed', async ({ createProjectModal }) => {
		await expect(createProjectModal.modalTitle).toBeVisible();
		await expect(createProjectModal.modalTitle).toHaveText('Vamos a crear tu proyecto!');

		await expect(createProjectModal.createProjectForm).toBeVisible();
		await expect(createProjectModal.createProjectFormTitle).toBeVisible();
		await expect(createProjectModal.createProjectFormDatabaseSelectTrigger).toBeVisible();
		await expect(createProjectModal.createProjectFormSubmitBtn).toBeVisible();
	});

	test('Modal form should be successfully fullfilled', async ({ createProjectModal }) => {
		const projectTitle = 'Test-001';
		await createProjectModal.createProjectFormTitle.fill(projectTitle);
		await createProjectModal.createProjectFormDatabaseSelectTrigger.click();

		await expect(createProjectModal.createProjectFormDatabaseSelectContent).toBeVisible();

		await expect(createProjectModal.createProjectFormSubmitBtn).toBeVisible();
		await expect(createProjectModal.createProjectFormSubmitBtn).not.toBeDisabled();

		await expect(createProjectModal.createProjectFormSelectItem1).toBeVisible();
		await expect(createProjectModal.createProjectFormSelectItem2).toBeVisible();

		await createProjectModal.createProjectFormSelectItem1.click();

		await expect(createProjectModal.createProjectFormSubmitBtn).toBeEnabled();
		await createProjectModal.createProjectFormSubmitBtn.click();
		await expect(createProjectModal.loadingModal).toBeVisible();
		await expect(createProjectModal.successModal).toBeVisible();

		const project = createProjectModal.getAsideProjectItem(projectTitle);
		await expect(project).toBeVisible();
	});
});
