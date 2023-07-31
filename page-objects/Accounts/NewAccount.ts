import { Page, Locator, expect } from '@playwright/test'

export class NewAccount {
    readonly page: Page
    readonly ifTradeName: Locator
    readonly ifOfficialName: Locator
    readonly ifVATNumber: Locator
    readonly btnfindAccountsRefresh: Locator
    readonly findAccountsAllResults: Locator
    readonly findAccountsConfirmationPopUp: Locator
    enterpriseName: string
    enterpriseAddress: string
    enterprisePostalcode: string
    enterpriseCity: string
    enterpriseCountry: string
    enterpriseVAT: string

    constructor (page: Page) {
        this.page = page
        this.ifTradeName = page.getByLabel('Trade Name')
        this.ifOfficialName = page.getByLabel('Official Name')
        this.ifVATNumber = page.getByLabel('VAT Number')
        this.btnfindAccountsRefresh = page.frameLocator('#WebResource_SearchCenter').getByRole('img')
        this.findAccountsAllResults = page.frameLocator('#WebResource_SearchCenter').locator('div.row')
        this.findAccountsConfirmationPopUp = page.locator('div[data-id="confirmdialog"]')
        this.enterpriseVAT = ''
        this.enterpriseCountry = ''

    }

    async searchForEnterprise(enterpriseName: string) {
        //await this.ifTradeName.click()
        await this.ifTradeName.fill(enterpriseName)
        //await this.page.keyboard.press('Enter')
        await this.btnfindAccountsRefresh.click()
    }

    async selectEnterpriseFromFindAccounts() {
        // see if the enterprise already exists
        var existingEnterprise = false
        var enterpriseData = {}
        var selectedEnterpriseLocator
        var regexExpr
        const existingEnterpriseButton = await this.findAccountsAllResults.getByRole('img', { name: 'Open' }).all()
        if(existingEnterpriseButton) {
            // account already exists for this enterprise
            selectedEnterpriseLocator = this.findAccountsAllResults.nth(0)
            regexExpr = /([0-9]{4}) ([A-Za-z- .']+), ([A-Za-z0-9- .']*)/
            existingEnterprise = true
        }
        else {
            // no account exists for this enterprise, create a new one
            selectedEnterpriseLocator = this.findAccountsAllResults.nth(1)
            regexExpr = /([A-Za-z]+), ([0-9]{4}) ([A-Za-z- .']+), ([A-Za-z0-9- .']*)/
        }

        // capture the address
        const fullAddress = await selectedEnterpriseLocator.locator('.form > div:nth-child(2)').first().innerText()
        // example address displayed: Belgium, 1082 Sint-Agatha-Berchem, Steenweg op Zellik 65
        if (fullAddress) {
            const matches = fullAddress.match(regexExpr)
            if (matches) {
                if (existingEnterprise) {
                    this.enterprisePostalcode = matches [1]
                    this.enterpriseCity = matches[2]
                    this.enterpriseAddress = matches [3]
                }
                else {
                    this.enterpriseCountry = matches[1]
                    this.enterprisePostalcode = matches [2]
                    this.enterpriseCity = matches[3]
                    this.enterpriseAddress = matches [4]
                }
            }
            else {
                console.log('selectEnterpriseFromFindAccounts: unable to capture address details: ' + fullAddress)
            }
        }
        else {
            console.log('selectedEnterpriseFromFindAccounts: unable to read fullAddress ' + fullAddress)
        }
        
        // capture the selected full name
        this.enterpriseName = await selectedEnterpriseLocator.locator('div[class="field bigger name"]').innerText()
        
        await selectedEnterpriseLocator.click()
        
        if (existingEnterprise == false) {
            // CONFIRMATION POP-UP
            // verify the details in the pop-up
            await expect(this.page.getByText('Name: ' + this.enterpriseName)).toHaveCount(1)
            const addressLine = 'Address: ' + this.enterpriseCountry + ', ' + this.enterprisePostalcode + ' ' + this.enterpriseCity + ', ' + this.enterpriseAddress
            await expect(this.page.getByText(addressLine)).toHaveCount(1)

            // capture the VAT number
            const vatLine = await this.findAccountsConfirmationPopUp.locator('p#dialogMessageTextLine6_3').innerText()
            const vatMatches = vatLine.match(/VAT: (BE[0-9]{10})/)
            if (vatMatches) {
                this.enterpriseVAT = vatMatches[0]
                console.log('VAT: ' + this.enterpriseVAT)
            }
            else {
                console.log('selectEnterpriseFromFindAccounts: unable to capture VAT: ' + vatLine)
            }
            
            await this.findAccountsConfirmationPopUp.locator('button[data-id="confirmButton"]').click()
        }

        enterpriseData = { 
            existing: existingEnterprise,
            name: this.enterpriseName,
            country: this.enterpriseCountry,
            postalCode: this.enterprisePostalcode,
            city: this.enterpriseCity,
            address: this.enterpriseAddress,
            vat: this.enterpriseVAT
        }
            
        return enterpriseData
    }

    async assertEnterpriseDetails() {
        await this.ifTradeName.screenshot({path: 'scr/officialName.png'})
        expect(await this.ifTradeName.innerText()).toBe(this.enterpriseName)
        expect(await this.ifOfficialName.innerText()).toBe(this.enterpriseName)
        if(this.enterpriseVAT !== '') {
            expect(await this.ifVATNumber.innerText()).toBe(this.enterpriseVAT)
        }

        // click to the address tab
        await this.page.getByRole('tab', { name: 'Addresses' }).click()
        
        // verify the main and official address
        expect(await this.page.getByLabel('Main Address').getByLabel('Country').innerText()).toBe(this.enterpriseCountry)
        expect(await this.page.getByLabel('Main Address').getByLabel('Street 1').innerText()).toBe(this.enterpriseAddress)
        expect(await this.page.getByLabel('Main Address').getByLabel('Postal Code').innerText()).toBe(this.enterprisePostalcode)
        expect(await this.page.getByLabel('Main Address').getByLabel('City').innerText()).toBe(this.enterpriseCity)
        
        expect(await this.page.getByLabel('Official Address').getByLabel('Country').innerText()).toBe(this.enterpriseCountry)
        expect(await this.page.getByLabel('Official Address').getByLabel('Street 1').innerText()).toBe(this.enterpriseAddress)
        expect(await this.page.getByLabel('Official Address').getByLabel('Postal Code').innerText()).toBe(this.enterprisePostalcode)
        expect(await this.page.getByLabel('Official Address').getByLabel('City').innerText()).toBe(this.enterpriseCity)
    }

    async closeWithoutSaving() {
        await this.page.getByLabel('Press Enter to go back.').click()
        await this.page.getByLabel('Press Enter to go back.').click()
    }

}