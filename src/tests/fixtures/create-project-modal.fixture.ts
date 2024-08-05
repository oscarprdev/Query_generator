import { test as base } from './app.fixture';
import { CreateProjectModalPage } from '../pages/create-project-modal.page';

interface CreateProjectModalFixture {
	createProjectModal: CreateProjectModalPage;
}

export const test = base.extend<CreateProjectModalFixture>({
	createProjectModal: async ({ page }, use) => {
		await use(new CreateProjectModalPage(page));
	},
});
