import { test, expect } from "@playwright/test";
import { AuthenticationFlow } from "../page-objects/AuthenticationFlow";
import { SideMenu } from "../page-objects/Common/SideMenu";
import { Accounts } from "../page-objects/Accounts/Accounts";
import { NewAccount } from "../page-objects/Accounts/NewAccount";
import { ActiveIdeas } from "../page-objects/Ideas/ActiveIdeas";
import { NewIdea } from "../page-objects/Ideas/NewIdea";
import { IdeaDetails } from "../page-objects/Ideas/IdeaDetails";
import { HelperFunctions } from "../page-objects/Common/HelperFunctions";

var secrets = {};
if (process.env.URL) {
	secrets = {
		url: process.env.URL,
	};
} else {
	secrets = require("../secrets.json");
}

test.describe.configure({ mode: "parallel" });

let authenticationFlow: AuthenticationFlow;
let sideMenu: SideMenu;
let accounts: Accounts;
let newAccount: NewAccount;
let activeIdeas: ActiveIdeas;
let newIdea: NewIdea;
let ideaDetails: IdeaDetails;
let helperFunctions: HelperFunctions;

test.beforeEach(async ({ page }) => {
	authenticationFlow = new AuthenticationFlow(page);
	sideMenu = new SideMenu(page);
	accounts = new Accounts(page);
	newAccount = new NewAccount(page);
	activeIdeas = new ActiveIdeas(page);
	newIdea = new NewIdea(page);
	ideaDetails = new IdeaDetails(page);
	helperFunctions = new HelperFunctions(page);
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

const teamsName = "TA_JJA Teams Channel";
test("Create Idea", async ({ page }) => {
	test.setTimeout(60 * 1000 * 2);
	test.slow();

	// navigation
	await authenticationFlow.login();
	await sideMenu.navigateToIdeas();

	// create new idea
	await activeIdeas.createNewIdea();
	await newIdea.assertPageTitle();
	var testData = await newIdea.createNewIdea(teamsName);

	// verify creation & add budget
	await activeIdeas.searchForIdea(teamsName);
	await activeIdeas.openIdeaFromSearchResults(0);
	await ideaDetails.assertIdeaDetails(testData);
	await ideaDetails.navigateToFinances();
	await ideaDetails.addBudgetToExistingLine(
		testData["knowledgeGroup"],
		"6666",
	);
	await ideaDetails.createNewBudgetLine("1001", "9999");
});

test("Remove idea(s)", async ({ page }) => {
	// navigation
	await authenticationFlow.login();
	await sideMenu.navigateToIdeas();
	await activeIdeas.searchForIdea(teamsName);

	// Loop over ideas and remove each that matches the search results
	var stillData: number;
	while (true) {
		await helperFunctions.assertLoadingIconHidden();
		if (await activeIdeas.isSearchResultsEmpty()) {
			break;
		}
		await activeIdeas.openIdeaFromSearchResults(0);
		await ideaDetails.removeIdea();
		await activeIdeas.searchForIdea("TA_JJA Teams Channel");
	}
});
