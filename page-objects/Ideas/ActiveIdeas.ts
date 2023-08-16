import { Page, Locator, expect } from "@playwright/test";

export class ActiveIdeas {
	readonly page: Page;
	readonly pageTitle: Locator;
	readonly btnNew: Locator;
	readonly searchField: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageTitle = page.getByLabel("Active Ideas", { exact: true });
		this.btnNew = page.getByLabel("New", { exact: true });
		this.searchField = page.getByPlaceholder("Filter by keyword");
	}

	async createNewIdea() {
		this.btnNew.click();
	}

	async searchForIdea(title: string) {
		await this.searchField.fill(title, { timeout: 30000 });
		await this.page.keyboard.press("Enter");
	}

	async openIdea(rowNum: number) {
		const row = this.page.locator(`div[row-index="${rowNum}"]`);
		await row.locator("a").first().click();
	}
}
