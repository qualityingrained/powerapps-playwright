import { Page, Locator } from '@playwright/test'

export class NewAccount {
    readonly page: Page
    readonly ifTradeName: Locator
    readonly ifOfficialName: Locator
    readonly ifVATNumber: Locator
    readonly ifMainPhone: Locator
    readonly ifWebsite: Locator
    readonly ifEmail: Locator
    readonly ifNicknames: Locator
    readonly ifType: Locator
    readonly ifSubType: Locator
    readonly btnfindAccountsRefresh: Locator

    constructor (page: Page) {
        this.page = page
        this.ifTradeName = page.getByLabel('Trade Name')
        this.ifOfficialName = page.getByLabel('Official Name')
        this.ifVATNumber = page.getByLabel('VAT Number')
        this.ifMainPhone = page.getByLabel('Main Phone')
        this.ifWebsite = page.getByPlaceholder('Provide a URL')
        this.ifEmail = page.getByPlaceholder('Provide an email')
        this.ifNicknames = page.getByLabel('Nicknames')
        this.ifType = page.getByLabel('Type', { exact: true })
        this.ifSubType = page.getByLabel('Sub Type', { exact: true })
        this.btnfindAccountsRefresh = page.frameLocator('#WebResource_SearchCenter').getByRole('img')
    }

    async searchForEnterprise(enterpriseName: string) {
        await this.ifTradeName.type(enterpriseName)
        await this.page.keyboard.press('Enter')
        await this.btnfindAccountsRefresh.click()
    }

}