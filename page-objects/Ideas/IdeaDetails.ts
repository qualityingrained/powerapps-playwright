import { Page, Locator, expect } from '@playwright/test'

export class IdeaDetails {
    readonly page: Page
    readonly pageVerificator: Locator
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
    readonly btnNwFunding: Locator
    readonly popUpVerificator: Locator
    readonly newFunding_ifBusinessUnit: Locator
    readonly newFunding_ifKnowledgeGroup: Locator
    readonly newFunding_ifFundingChannel: Locator
    readonly newFunding_btnSaveAndClose: Locator
    readonly newFunding_ifBudgetAmount: Locator

    constructor (page: Page) {
        this.page = page
        this.pageVerificator = page.locator('span[data-id="entity_name_span"]')
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
        this.newFunding_ifBusinessUnit = page.getByLabel('Knowledge Group', { exact: true })
        this.newFunding_ifFundingChannel = page.getByLabel('Funding Channel', { exact: true })
        this.newFunding_btnSaveAndClose = page.getByLabel('Save & Close', { exact: true })
        this.ifOpenLevel = page.getByLabel('Budget Amount', { exact: true })
        this.popUpVerificator = page.locator('h2[data-id="header_title"]')
    }

    // var data = {
    //     teamsChannel: 'TA_JJA Teams Channel',
    //     language: 'French',
    //     type: 'Andere',
    //     openLevel: 'Internal',
    //     knowledgeGroup: 'Development 1 (CTG)',
    //     fundingChannel: '1003',
    //     detailedFundingChannel: 'HO_Docto'
    // }


    async assertIdeaDetails(data: {}) {
        expect(await this.pageVerificator.innerText()).toContain('Idea')
        await expect(this.ifTeamsName).toHaveAttribute('value', data['teamsChannel'])
        expect(await this.ifLanguage.inputValue()).toBe(data['language'])

        //hieronder zitten de foutjes
        await expect(this.ifBusinessUnit.getByText('Development')).toHaveCount(1)
        await expect(this.ifType.getByText(data['knowledgeGroup'])).toHaveCount(1)
        await expect(this.ifLeadKnowledgeGroup.getByText(data['knowledgeGroup'])).toHaveCount(1)
        await expect(this.ifOpenLevel).toHaveAttribute('title', data['openLevel'])
        await expect(this.ifFundingChannel.getByText(data['fundingChannel'])).toHaveCount(1)
        await expect(this.ifDetailedFundingChannel.getByText(data['detailedFundingChannel'])).toHaveCount(1)
    }

}