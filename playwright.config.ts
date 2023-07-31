import { PlaywrightTestConfig } from '@playwright/test'
const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    testDir: 'tests/',
    use: {
        headless: true,
        viewport: {
            width: 1920,
            height: 1080
        },
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
    },
    projects: [
        {
            name: 'Chrome', 
            use: { browserName: 'chromium'}
        }
    ]
}

export default config