import { test, expect } from '@playwright/test'
import { AuthenticationFlow } from '../page-objects/AuthenticationFlow'
import { SideMenu } from '../page-objects/sideMenu'
import { Accounts } from '../page-objects/Accounts/Accounts'
import { NewAccount } from '../page-objects/Accounts/NewAccount'

test.describe('Basic Access Test', () => {
    let authenticationFlow: AuthenticationFlow
    let sideMenu: SideMenu
    let accounts: Accounts
    let newAccount: NewAccount

    test.beforeEach(async({page}) => {
        authenticationFlow = new AuthenticationFlow(page)
        sideMenu = new SideMenu(page)
        accounts = new Accounts(page)
        newAccount = new NewAccount(page)
        await page.goto('https://dosp-hsx-uat.crm4.dynamics.com/')
    })

    test('Create Account', async ({page}) => {
       await authenticationFlow.login()
       await sideMenu.navigateToAccounts()
       await accounts.createNewAccount()
       await newAccount.searchForEnterprise('Belfius')
       await page.pause()
    })
})