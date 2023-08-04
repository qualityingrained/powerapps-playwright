import { test, expect } from '@playwright/test'
import { AuthenticationFlow } from '../page-objects/AuthenticationFlow'
import { SideMenu } from '../page-objects/Common/SideMenu'
import { Accounts } from '../page-objects/Accounts/Accounts'
import { NewAccount } from '../page-objects/Accounts/NewAccount'
import { ActiveIdeas } from '../page-objects/Ideas/ActiveIdeas'
import { NewIdea } from '../page-objects/Ideas/NewIdea'
const secrets = require('../secrets.json')

test.describe('DOSP - Smoke Testing', () => {
	let authenticationFlow: AuthenticationFlow
	let sideMenu: SideMenu
	let accounts: Accounts
	let newAccount: NewAccount
    let activeIdeas: ActiveIdeas
	let newIdea: NewIdea

	test.beforeEach(async ({ page }) => {
		authenticationFlow = new AuthenticationFlow(page)
		sideMenu = new SideMenu(page)
		accounts = new Accounts(page)
		newAccount = new NewAccount(page)
        activeIdeas = new ActiveIdeas(page)
		newIdea = new NewIdea(page)
		await page.goto(secrets['url'])
	})

	test('Create Account', async ({ page }) => {
		// navigation
		await authenticationFlow.login()
		await sideMenu.navigateToAccounts()
		
		// create new Account
		await accounts.createNewAccount()
		await newAccount.searchForEnterprise('Belfius')
		var enterpriseData = await newAccount.selectEnterpriseFromFindAccounts()
		if (enterpriseData['existing']) {
			enterpriseData = await accounts.assertAccountDetails(enterpriseData)
			await page.pause()
		} else {
			await newAccount.assertEnterpriseDetails()
		}
	})

    test.only('Create Idea', async ({ page }) => {
        // navigation
		await authenticationFlow.login()
        await sideMenu.navigateToIdeas()
        await activeIdeas.createNewIdea()
		
		// create new idea
		await newIdea.assertPageTitle()
		var testData = await newIdea.createNewIdea()

		// verify creation & add budget
		await activeIdeas.searchForIdea(testData['teamsChannel'])

		// remove idea

        await page.pause()
    })
})
