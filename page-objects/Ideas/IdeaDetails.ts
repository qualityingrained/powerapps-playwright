import { Page, Locator, expect } from '@playwright/test'

export class IdeaDetails {
    readonly page: Page
    readonly btnGeneral: Locator
    readonly btnFinances: Locator

    // elements on General tab
    readonly ifTeamsName: Locator
    readonly ifLanguage: Locator
    readonly ifDevelopment: Locator
    readonly ifBusinessUnit: Locator
    readonly ifType: Locator
    readonly ifLeadKnowledgeGroup: Locator
    readonly ifOpenLevel: Locator
    readonly ifFundingChannel: Locator
    readonly ifDetailedFundingChannel: Locator

    // elements on Finances tab
    readonly btnNewFunding: Locator
    readonly popUpVerificator: Locator
    readonly newFunding_ifBusinessUnit: Locator
    readonly newFunding_ifKnowledgeGroup: Locator
    readonly newFunding_ifFundingChannel: Locator
    readonly newFunding_btnSaveAndClose: Locator
    readonly newFunding_ifBudgetAmount: Locator

    constructor (page: Page) {
        this.page = page
        this.btnGeneral = page.getByText('General', { exact: true })
        this.btnFinances = page.getByText('Finances', { exact: true })
        this.ifTeamsName = page.getByLabel('Teams Name', { exact: true })
        this.ifLanguage = page.getByLabel('Language', { exact: true })
        this.ifDevelopment = page.getByLabel('Development', { exact: true })
        this.ifBusinessUnit = page.getByRole('list', { name: 'Business Unit' })
        this.ifType = page.getByRole('list', { name: 'Type' })
        this.ifLeadKnowledgeGroup = page.getByRole('list', { name: 'Lead Knowledge Group'})
        this.ifOpenLevel = page.getByLabel('Open Level', { exact: true })
        this.ifFundingChannel = page.getByRole('list', { name: 'Funding Channel' })
        this.ifDetailedFundingChannel = page.getByRole('list', { name: 'Main Detailedfundingchannel' })
        this.newFunding_ifBusinessUnit = page.getByLabel('Knowledge Group', { exact: true })
        this.newFunding_ifFundingChannel = page.getByRole('list', { name: 'Funding Channel' })
        this.newFunding_btnSaveAndClose = page.getByLabel('Save & Close', { exact: true })
        this.newFunding_ifBudgetAmount = page.getByLabel('Budget Amount', { exact: true })
        this.popUpVerificator = page.locator('h2[data-id="header_title"]')
    }

    // var data = {
    //     teamsChannel: 'TA_JJA Teams Channel',
    //     language: 'French',
    //     type: 'Andere',
    //     openLevel: '530360002',
    //     knowledgeGroup: 'Development 1 (CTG)',
    //     fundingChannel: '1003',
    //     detailedFundingChannel: 'HO_Docto'
    // }


    async assertIdeaDetails(data: {}) {
        await expect(this.page.getByRole('heading', { name: 'TA_JJA Teams ChannelSave status - Saved' })).toBeVisible({ timeout: 15000 })
        await expect(this.ifTeamsName).toHaveAttribute('value', data['teamsChannel'])
        await expect(this.ifLanguage).toHaveValue(data['language'])
        await expect(this.ifBusinessUnit.getByLabel('Development', { exact: true })).toBeVisible({ timeout: 15000 })
        await expect(this.ifType.getByLabel(data['type'])).toBeVisible({ timeout: 15000 })
        await expect(this.ifLeadKnowledgeGroup.getByLabel(data['knowledgeGroup'])).toBeVisible({ timeout: 15000 })
        await expect(this.ifOpenLevel).toHaveValue(data['openLevel'])
        await expect(this.ifFundingChannel.getByLabel(data['fundingChannel'])).toBeVisible({ timeout: 15000 })
        await expect(this.ifDetailedFundingChannel.getByLabel(data['detailedFundingChannel'])).toBeVisible({ timeout: 15000 })
    }

    async navigateToFinances() {
        await this.btnFinances.click()
        await expect(this.btnNewFunding).toBeVisible()
    }

    async addBudgetToExistingLine(nth: number) {
        nth = nth - 1
        const listOfBudgetLines = await this.page.locator('div[class="panel funding  clickable"]').all()
        if (listOfBudgetLines.length >= nth) {
            await listOfBudgetLines[nth].click()
        }
        await listOfBudgetLines[0].click()

    }

}