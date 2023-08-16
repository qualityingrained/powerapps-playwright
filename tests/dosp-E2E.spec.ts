import { test, expect } from "@playwright/test";
import { AuthenticationFlow } from "../page-objects/AuthenticationFlow";
import { SideMenu } from "../page-objects/Common/SideMenu";
import { Accounts } from "../page-objects/Accounts/Accounts";
import { NewAccount } from "../page-objects/Accounts/NewAccount";
import { ActiveIdeas } from "../page-objects/Ideas/ActiveIdeas";
import { NewIdea } from "../page-objects/Ideas/NewIdea";
import { IdeaDetails } from "../page-objects/Ideas/IdeaDetails";

var secrets = {};
console.log("URL env var: " + process.env.URL);
if (process.env.URL) {
	secrets = {
		url: process.env.URL,
	};
} else {
	secrets = require("../secrets.json");
}

test.describe.parallel("DOSP - Smoke Testing", () => {
	let authenticationFlow: AuthenticationFlow;
	let sideMenu: SideMenu;
	let accounts: Accounts;
	let newAccount: NewAccount;
	let activeIdeas: ActiveIdeas;
	let newIdea: NewIdea;
	let ideaDetails: IdeaDetails;

	test.beforeEach(async ({ page }) => {
		authenticationFlow = new AuthenticationFlow(page);
		sideMenu = new SideMenu(page);
		accounts = new Accounts(page);
		newAccount = new NewAccount(page);
		activeIdeas = new ActiveIdeas(page);
		newIdea = new NewIdea(page);
		ideaDetails = new IdeaDetails(page);
		await page.goto(secrets["url"]);
	});

	test("Create Account", async ({ page }) => {
		// navigation
		await authenticationFlow.login();
		await sideMenu.navigateToAccounts();

		// create new Account
		await accounts.createNewAccount();
		await newAccount.searchForEnterprise("Belfius");
		var enterpriseData = await newAccount.selectEnterpriseFromFindAccounts();
		if (enterpriseData["existing"]) {
			enterpriseData = await accounts.assertAccountDetails(enterpriseData);
		} else {
			await newAccount.assertEnterpriseDetails();
		}
	});

	test("Create Idea", async ({ page }) => {
		test.setTimeout(60 * 1000 * 2);
		test.slow();

		// navigation
		await authenticationFlow.login();
		await sideMenu.navigateToIdeas();

		// create new idea
		await activeIdeas.createNewIdea();
		await newIdea.assertPageTitle();
		var testData = await newIdea.createNewIdea();

		// verify creation & add budget
		await activeIdeas.searchForIdea(testData["teamsChannel"]);
		await activeIdeas.openIdea(0);
		await ideaDetails.assertIdeaDetails(testData);
		await ideaDetails.navigateToFinances();
		await ideaDetails.addBudgetToExistingLine(
			testData["knowledgeGroup"],
			"6666",
		);
		await ideaDetails.createNewBudgetLine("1001", "9999");

		// remove idea
		await ideaDetails.removeIdea();
	});
});
