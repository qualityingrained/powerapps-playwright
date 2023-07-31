import { Page, Locator } from '@playwright/test'

export class Accounts {
    readonly page: Page
    readonly btnCreateNewAccount: Locator
    readonly ifTradeName: Locator
    readonly ifOfficialName: Locator
    readonly ifVATNumber: Locator

    constructor (page: Page) {
        this.page = page
        this.btnCreateNewAccount = page.getByLabel('New', { exact: true })
        this.ifTradeName = page.getByLabel('Trade Name', { exact: true })
        this.ifOfficialName = page.getByLabel('Official Name', { exact: true })
        this.ifVATNumber = page.getByLabel('VAT Number', { exact: true })
    }

    async createNewAccount() {
        await this.btnCreateNewAccount.click()
    }

    async assertAccountDetails(enterpriseDetails) {
        await this.ifTradeName.screenshot({path: 'scr/tradeName.png'})
        await this.ifOfficialName.screenshot({path: 'scr/officialName.png'})
        await this.ifVATNumber.screenshot({path: 'scr/vatNumber.png'})
    }
}