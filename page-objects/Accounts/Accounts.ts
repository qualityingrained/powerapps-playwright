import { Page, Locator, expect } from '@playwright/test'

export class Accounts {
    readonly page: Page
    readonly btnCreateNewAccount: Locator
    readonly ifTradeName: Locator
    readonly ifOfficialName: Locator
    readonly ifVATNumber: Locator
    readonly btnAddresses: Locator
    readonly ifMainAddressCountry: Locator
    readonly ifMainAddressStreet1: Locator
    readonly ifMainAddressPostalCode: Locator
    readonly ifMainAddressCity: Locator
    readonly ifOfficialAddressCountry: Locator
    readonly ifOfficialAddressStreet1: Locator
    readonly ifOfficialAddressPostalCode: Locator
    readonly ifOfficialAddressCity: Locator

    constructor (page: Page) {
        this.page = page
        this.btnCreateNewAccount = page.getByLabel('New', { exact: true })
        this.btnAddresses = page.getByLabel('Addresses', { exact: true })

        // fields
        this.ifTradeName = page.locator('input[data-id="name.fieldControl-text-box-text"]')
        this.ifOfficialName = page.locator('section[data-id="ACCOUNT_INFORMATION"]').getByLabel('Official Name', { exact: true })
        this.ifVATNumber = page.locator('section[data-id="ACCOUNT_INFORMATION"]').getByLabel('VAT Number', { exact: true })
        this.ifMainAddressCountry = page.locator('div[data-id="dosp_address1_country1"]').getByLabel('Country', { exact: true })
        this.ifMainAddressStreet1 = page.locator('input[data-id="address1_line1.fieldControl-text-box-text"]')
        this.ifMainAddressPostalCode = page.locator('input[data-id="address1_postalcode.fieldControl-text-box-text"]')
        this.ifMainAddressCity = page.locator('input[data-id="address1_city.fieldControl-text-box-text"]')
        this.ifOfficialAddressCountry = page.locator('input[data-id="dosp_address2_country.fieldControl-option-set-select"]')
        this.ifOfficialAddressStreet1 = page.locator('input[data-id="address2_line1.fieldControl-text-box-text"]')
        this.ifOfficialAddressPostalCode = page.locator('input[data-id="address2_postalcode.fieldControl-text-box-text"]')
        this.ifOfficialAddressCity = page.locator('input[data-id="address2_city.fieldControl-text-box-text"]')
    }

    async createNewAccount() {
        await this.btnCreateNewAccount.click()
    }

    async assertAccountDetails(enterpriseDetails: {}) {   
        // verify enterprise name & vat number on the Account page 
        await expect(this.ifTradeName).toHaveAttribute('value', enterpriseDetails['name'])
        await expect(this.ifOfficialName).toHaveAttribute('value', enterpriseDetails['name']) 
        if(enterpriseDetails['vat']) {
            await expect(this.ifVATNumber).toHaveAttribute('value', enterpriseDetails['vat']) 
        }

        // verify addresses
        await this.btnAddresses.click()
        if(enterpriseDetails['country']) {
            await expect(this.ifMainAddressCountry).toHaveAttribute('value', enterpriseDetails['country'])
            await expect(this.ifOfficialAddressCountry).toHaveAttribute('value', enterpriseDetails['country'])
        }    
        await expect(this.ifMainAddressStreet1).toHaveAttribute('value', enterpriseDetails['address'])
        await expect(this.ifOfficialAddressStreet1).toHaveAttribute('value', enterpriseDetails['address'])
        await expect(this.ifMainAddressPostalCode).toHaveAttribute('value', enterpriseDetails['postalCode'])
        await expect(this.ifOfficialAddressPostalCode).toHaveAttribute('value', enterpriseDetails['postalCode'])
        await expect(this.ifMainAddressCity).toHaveAttribute('value', enterpriseDetails['city'])
        await expect(this.ifOfficialAddressCity).toHaveAttribute('value', enterpriseDetails['city'])

        return enterpriseDetails
    }
}