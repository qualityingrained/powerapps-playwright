import { Page, Locator, expect } from "@playwright/test";
import { HelperFunctions } from "../Common/HelperFunctions";

export class ActiveIdeas {
	readonly page: Page;
	readonly pageTitle: Locator;
	readonly btnNew: Locator;
	readonly searchField: Locator;
	readonly firstSearchResult: Locator;
	helperFunctions: HelperFunctions;

	constructor(page: Page) {
		this.page = page;
		this.pageTitle = page.getByLabel("Active Ideas", { exact: true });
		this.btnNew = page.getByLabel("New", { exact: true });
		this.searchField = page.getByPlaceholder("Filter by keyword");
		this.firstSearchResult = page.locator(".ms-link").first();
		this.helperFunctions = new HelperFunctions(page);
	}

	async createNewIdea() {
		await this.helperFunctions.assertLoadingIconHidden();
		this.btnNew.click();
	}

	async searchForIdea(title: string) {
		await this.helperFunctions.assertLoadingIconHidden();
		await this.searchField.fill(title, { timeout: 60000 });
		await this.page.keyboard.press("Enter");
	}

	async openIdea(rowNum: number) {
		const row = this.page.locator(`div[row-index="${rowNum}"]`);
		await row.locator("a").first().click();
	}

	async isSearchResultsEmpty() {
		const stillData = await this.page
			.locator("span")
			.getByText("No data available")
			.count();

		if (stillData > 0) {
			return true;
		}
		return false;
	}
}
