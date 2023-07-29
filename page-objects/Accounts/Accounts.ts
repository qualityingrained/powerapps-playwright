import { Page, Locator } from '@playwright/test'

export class Accounts {
    readonly page: Page
    readonly btnCreateNewAccount: Locator

    constructor (page: Page) {
        this.page = page
        this.btnCreateNewAccount = page.getByLabel('New', { exact: true })
    }

    async createNewAccount() {
        await this.btnCreateNewAccount.click()
    }
}