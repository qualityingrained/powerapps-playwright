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
        this.ifMainAddressCountry = page.getByLabel('Main Address', { exact: true }).getByLabel('Country', { exact: true })
        this.ifMainAddressStreet1 = page.getByLabel('Main Address', { exact: true }).getByLabel('Street1', { exact: true })
        this.ifMainAddressPostalCode = page.getByLabel('Main Address', { exact: true }).getByLabel('Postal Code', { exact: true })
        this.ifMainAddressCity = page.getByLabel('Main Address', { exact: true }).getByLabel('City', { exact: true })
        this.ifOfficialAddressCountry = page.locator('section[aria-label="Official Address"]').getByLabel('Country', { exact: true })
        this.ifOfficialAddressStreet1 = page.locator('section[aria-label="Official Address"]').getByLabel('Street1', { exact: true })
        this.ifOfficialAddressPostalCode = page.locator('section[aria-label="Official Address"]').getByLabel('Postal Code', { exact: true })
        this.ifOfficialAddressCity = page.locator('section[aria-label="Official Address"]').getByLabel('City', { exact: true })
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

        await this.page.pause()

        return enterpriseDetails
    }
}