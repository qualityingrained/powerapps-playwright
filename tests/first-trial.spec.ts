import { test, expect } from '@playwright/test'
import { AuthenticationFlow } from '../page-objects/AuthenticationFlow'
import { SideMenu } from '../page-objects/Common/SideMenu'
import { Accounts } from '../page-objects/Accounts/Accounts'
import { NewAccount } from '../page-objects/Accounts/NewAccount'
const secrets = require('../secrets.json')


test.describe('DOSP - Smoke Testing', () => {
    let authenticationFlow: AuthenticationFlow
    let sideMenu: SideMenu
    let accounts: Accounts
    let newAccount: NewAccount

    test.beforeEach(async({page}) => {
        authenticationFlow = new AuthenticationFlow(page)
        sideMenu = new SideMenu(page)
        accounts = new Accounts(page)
        newAccount = new NewAccount(page)
        await page.goto(secrets['url'])
    })

    test('Create Account', async ({page}) => {
       await authenticationFlow.login()
       await sideMenu.navigateToAccounts()
       await accounts.createNewAccount()
       await newAccount.searchForEnterprise('Belfius')
       var enterpriseData = await newAccount.selectEnterpriseFromFindAccounts()
       if (enterpriseData['existing']) {
        enterpriseData = await accounts.assertAccountDetails(enterpriseData)
       } 
       else {
        await newAccount.assertEnterpriseDetails()
       }
       await newAccount.closeWithoutSaving()
       await page.pause()
    })
})