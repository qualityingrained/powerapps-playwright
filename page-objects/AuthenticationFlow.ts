import { Page, Locator, expect } from "@playwright/test";

var credentials = {};
if (process.env.URL) {
	credentials = {
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
	};
} else {
	credentials = require("../secrets.json");
}

export class AuthenticationFlow {
	readonly page: Page;
	readonly ifUsername: Locator;
	readonly btnUsernameNext: Locator;
	readonly ifPassword: Locator;
	readonly btnSignIn: Locator;
	readonly btnNoStoreLogin: Locator;

	constructor(page: Page) {
		this.page = page;
		this.ifUsername = page.locator("input#i0116");
		this.btnUsernameNext = page.locator('input[type="Submit"]');
		this.ifPassword = page.locator('input[type="Password"]');
		this.btnSignIn = page.locator('input[value="Sign in"]');
		this.btnNoStoreLogin = page.locator('input[value="No"]');
	}

	async login() {
		await this.ifUsername.type(credentials["username"]);
		await this.btnUsernameNext.click();
		await this.ifPassword.fill(credentials["password"]);
		await this.btnSignIn.click();
		await this.btnNoStoreLogin.click();
		await expect(this.page.getByText("SANDBOX")).toBeVisible({
			timeout: 60000,
		});
	}
}
