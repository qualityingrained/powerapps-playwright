import { Page, Locator, expect } from '@playwright/test'

export class IdeaDetails {
    readonly page: Page
    readonly pageVerificator: Locator
    readonly btnGeneral: Locator
    readonly btnFinances: Locator

    // elements on General page
    readonly ifTeamsName: Locator
    readonly ifLanguage: Locator
    readonly ifDevelopment: Locator
    readonly ifBusinessUnit: Locator
    readonly ifType: Locator
    readonly ifLeadKnowledgeGroup: Locator
    readonly ifOpenLevel: Locator
    readonly ifFundingChannel: Locator
    readonly ifDetailedFundingChannel: Locator

    // elements on Finances page
    readonly btnNwFunding: Locator
    readonly newFunding_ifBusinessUnit: Locator
    readonly newFunding_ifKnowledgeGroup: Locator
    readonly newFunding_ifFundingChannel: Locator
    readonly newFunding_btnSaveAndClose: Locator
    readonly newFunding_ifBudgetAmount: Locator

    constructor (page: Page) {
        this.page = page
        this.pageVerificator = page.locator('span.entity_name_span')
        this.btnGeneral = page.getByText('General', { exact: true })
        this.btnFinances = page.getByText('Finances', { exact: true })
        this.ifTeamsName = page.getByLabel('Teams Name', { exact: true })
        this.ifLanguage = page.getByLabel('Language', { exact: true })
        this.ifDevelopment = page.getByLabel('Development', { exact: true })
        this.ifBusinessUnit = page.getByLabel('Business Unit', { exact: true })
        this.ifType = page.getByLabel('Type', { exact: true })
        this.ifLeadKnowledgeGroup = page.getByLabel('Lead Knowledge Group', { exact: true })
        this.ifOpenLevel = page.getByLabel('Open Level', { exact: true })
        this.ifFundingChannel = page.getByLabel('Funding Channel', { exact: true })
        this.ifDetailedFundingChannel = page.getByLabel('Main Detailedfundingchannel', { exact: true })
        this.ifOpenLevel = page.getByLabel('Open Level', { exact: true })
    }

}