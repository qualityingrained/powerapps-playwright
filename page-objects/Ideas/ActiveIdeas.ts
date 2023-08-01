import { Page, Locator, expect } from '@playwright/test'

export class ActiveIdeas {
    readonly page: Page
    readonly pageTitle: Locator
    readonly btnNew: Locator

    constructor (page: Page) {
        this.page = page
        this.pageTitle = page.getByLabel('Active Ideas', { exact: true })
        this.btnNew = page.getByLabel('New', { exact: true })
    }

    async createNewIdea() {
        this.btnNew.click()
    }

}