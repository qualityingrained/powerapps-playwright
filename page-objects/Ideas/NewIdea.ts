import { Page, Locator, expect } from "@playwright/test";

export class NewIdea {
	readonly page: Page;
	readonly lblPageTitle: Locator;
	readonly ifTeamsName: Locator;
	readonly ddLanguage: Locator;
	readonly ifType: Locator;
	readonly ifOpenLevel: Locator;
	readonly ifBusinessUnit: Locator;
	readonly ifLeadKnowledgeGroup: Locator;
	readonly ifFundingChannel: Locator;
	readonly ifDetailedFundingChannel: Locator;
	readonly btnSaveAndClose: Locator;

	constructor(page: Page) {
		this.page = page;
		this.lblPageTitle = page.locator('h1[data-id="header_title"]');
		this.ifTeamsName = page.getByLabel("Teams Name");
		this.ddLanguage = page.getByLabel("Language");
		this.ifType = page.locator(
			'input[data-id="dosp_ideatypeid.fieldControl-LookupResultsDropdown_dosp_ideatypeid_textInputBox_with_filter_new"]',
		);
		this.ifOpenLevel = page.locator(
			'select[data-id="dosp_openlevel.fieldControl-option-set-select"]',
		);
		this.ifBusinessUnit = page.getByLabel("Business Unit");
		this.ifLeadKnowledgeGroup = page.getByLabel(
			"Lead Knowledge Group, Lookup",
			{ exact: true },
		);
		this.ifFundingChannel = page.getByLabel("Funding Channel, Lookup", {
			exact: true,
		});
		this.ifDetailedFundingChannel = page.getByLabel(
			"Detailed Funding Channel, Lookup",
			{
				exact: true,
			},
		);
		this.btnSaveAndClose = page.getByLabel("Save & Close", { exact: true });
	}

	async assertPageTitle() {
		expect(await this.lblPageTitle.innerText()).toContain("New Idea");
	}

	async createNewIdea() {
		var data = {
			teamsChannel: "TA_JJA Teams Channel",
			language: "2",
			type: "Andere",
			openLevel: "530360002",
			knowledgeGroup: "kennisgroep A (Development 1 - CTG)",
			fundingChannel: "1003",
			detailedFundingChannel: "HO_Docto",
		};

		await this.assertPageTitle();
		await this.ifTeamsName.fill(data["teamsChannel"]);
		await this.ddLanguage.selectOption(data["language"]);
		await this.ifType.fill(data["type"]);
		await this.page
			.locator("span")
			.getByText(data["type"], { exact: true })
			.click();
		await this.ifOpenLevel.selectOption(data["openLevel"]);
		await this.ifLeadKnowledgeGroup.fill("kennisgroep A");
		await this.page
			.locator("span")
			.getByText(data["knowledgeGroup"], { exact: true })
			.click();
		await this.ifFundingChannel.fill(data["fundingChannel"]);
		await this.page
			.locator("span")
			.getByText(data["fundingChannel"], { exact: true })
			.click();
		await this.ifDetailedFundingChannel.fill(data["detailedFundingChannel"]);
		await this.page
			.locator("span")
			.getByText(data["detailedFundingChannel"])
			.click();
		await this.btnSaveAndClose.click();

		return data;
	}
}
