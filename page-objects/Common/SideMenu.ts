import { Page, Locator } from "@playwright/test";

export class SideMenu {
	readonly page: Page;
	readonly sideMenu: Locator;
	readonly accountsMenuItem: Locator;
	//readonly contactsMenuItem: Locator
	readonly ideasMenuItem: Locator;
	//readonly projectsMenuItem: Locator

	constructor(page: Page) {
		this.page = page;
		this.sideMenu = page.locator("div#siteMapPanelBodyDiv");
		this.accountsMenuItem = page.getByLabel("Accounts").locator("img");
		this.ideasMenuItem = page.getByLabel("Ideas").locator("img");
	}

	async navigateToAccounts() {
		await this.accountsMenuItem.click();
	}

	async navigateToIdeas() {
		await this.ideasMenuItem.click();
	}
}
