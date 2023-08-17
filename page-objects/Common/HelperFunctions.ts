import { Page, Locator, expect } from "@playwright/test";

export class HelperFunctions {
	readonly page: Page;
	readonly loadingInProgressIcon: Locator;

	constructor(page: Page) {
		this.page = page;
		this.loadingInProgressIcon = this.page.locator(
			"div#datasethost-progress-indicator",
		);
	}

	async assertLoadingIconHidden() {
		await expect(this.loadingInProgressIcon).toBeHidden({
			timeout: 15000,
		});
	}

	async assertLoadingIconVisible() {
		await expect(this.loadingInProgressIcon).toBeVisible({
			timeout: 15000,
		});
	}
}
