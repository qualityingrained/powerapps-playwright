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

	constructor(page: Page) {
		this.page = page
		this.btnGeneral = page.getByLabel('General', { exact: true })
		this.btnFinances = page.getByLabel('Finances', { exact: true })
		this.ifTeamsName = page.getByLabel('Teams Name', { exact: true })
		this.ifLanguage = page.getByLabel('Language', { exact: true })
		this.ifDevelopment = page.getByLabel('Development', { exact: true })
		this.ifBusinessUnit = page.getByRole('list', { name: 'Business Unit' })
		this.ifType = page.getByRole('list', { name: 'Type' })
		this.ifLeadKnowledgeGroup = page.getByRole('list', {
			name: 'Lead Knowledge Group',
		})
		this.ifOpenLevel = page.getByLabel('Open Level', { exact: true })
		this.ifFundingChannel = page.getByRole('list', { name: 'Funding Channel' })
		this.ifDetailedFundingChannel = page.getByRole('list', {
			name: 'Main Detailedfundingchannel',
		})
		this.newFunding_ifBusinessUnit = page.getByLabel('Knowledge Group', {
			exact: true,
		})
		this.newFunding_ifFundingChannel = page.getByRole('list', {
			name: 'Funding Channel',
		})
		this.newFunding_btnSaveAndClose = page.getByLabel('Save & Close', {
			exact: true,
		})
		this.newFunding_ifBudgetAmount = page.getByLabel('Budget Amount', {
			exact: true,
		})
		this.popUpVerificator = page.locator('h2[data-id="header_title"]')
		this.btnNewFunding = page
			.frameLocator('#WebResource_FinanceUI')
			.getByText('New Funding')
		this.newFunding_ifKnowledgeGroup = page.getByLabel(
			'Knowledge Group, Lookup',
			{ exact: true }
		)
		this.newFunding_ifFundingChannel = page.getByLabel(
			'Funding Channel, Lookup',
			{ exact: true }
		)
		this.newFunding_ifBudgetAmount = page.getByLabel('Budget Amount')
		this.newFunding_btnSaveAndClose = page.getByRole('menuitem', {
			name: 'Save & Close',
		})
	}

	async assertIdeaDetails(data: {}) {
		await expect(
			this.page.getByRole('heading', {
				name: `${data['teamsChannel']}Save status - Saved`,
			})
		).toBeVisible({ timeout: 20000 })
		await expect(this.ifTeamsName).toHaveAttribute(
			'value',
			data['teamsChannel'],
			{ timeout: 15000 }
		)
		await expect(this.ifLanguage).toHaveValue(data['language'], {
			timeout: 15000,
		})
		await expect(
			this.ifBusinessUnit.getByLabel('Development', { exact: true })
		).toBeVisible({ timeout: 15000 })
		await expect(this.ifType.getByLabel(data['type'])).toBeVisible({
			timeout: 15000,
		})
		await expect(
			this.ifLeadKnowledgeGroup.getByLabel(data['knowledgeGroup'])
		).toBeVisible({ timeout: 15000 })
		await expect(
			this.page
				.getByLabel(`${data['teamsChannel']}- Saved`)
				.getByLabel('Open Level', { exact: true })
		).toHaveValue(data['openLevel'])
		await expect(
			this.ifFundingChannel.getByLabel(data['fundingChannel'])
		).toBeVisible({ timeout: 15000 })
		await expect(
			this.ifDetailedFundingChannel.getByLabel(data['detailedFundingChannel'])
		).toBeVisible({ timeout: 15000 })
	}

	async navigateToFinances() {
		await this.btnFinances.click()
	}

	async addBudgetToExistingLine(knowledgeGroup: string, amount: string) {
		await expect(this.btnNewFunding).toBeVisible()
		await this.page
			.frameLocator('#WebResource_FinanceUI')
			.getByText(knowledgeGroup, { exact: false })
			.click({ force: true })
		await expect(
			this.page.locator('span[data-id="entity_name_span"]')
		).toBeVisible({ timeout: 15000 })
		await this.page.getByLabel('Budget Amount. Last saved value:').click()
        await this.page.getByLabel('Budget Amount. Last saved value:').fill(amount)
		await this.page.getByRole('menuitem', { name: 'Save & Close' }).click()
	}

	async createNewBudgetLine(channelCode: string, amount: string) {
		await expect(this.btnNewFunding).toBeVisible({ timeout: 15000 })
		await this.btnNewFunding.click()
		await this.newFunding_ifKnowledgeGroup.fill('kennisgroep B')
		await this.page.pause()
		await this.page
			.getByLabel('Kennisgroep B (Development 1 - CTG), Development 1 (CTG)')
			.click()
		await this.newFunding_ifFundingChannel.fill(channelCode)
		await this.page.locator('span').getByText(channelCode).click()
		await this.newFunding_ifBudgetAmount.click()
		await this.newFunding_ifBudgetAmount.fill(amount)
		await this.newFunding_btnSaveAndClose.click()
	}
}
