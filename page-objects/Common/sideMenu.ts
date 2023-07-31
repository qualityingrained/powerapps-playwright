import { Page, Locator } from '@playwright/test'

export class SideMenu {
    readonly page: Page
    readonly accountsMenuItem: Locator
    //readonly contactsMenuItem: Locator
    //readonly ideasMenuItem: Locator
    //readonly projectsMenuItem: Locator

    constructor (page: Page) {
        this.page = page
        this.accountsMenuItem = page.getByLabel('Accounts').locator('div').nth(1)
        //this.contactsMenuItem = page.locator('div[title=Accounts]')
    }

    async navigateToAccounts() {
        await this.accountsMenuItem.click()
    }
}