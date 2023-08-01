import { PlaywrightTestConfig } from '@playwright/test'
const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    testDir: 'tests/',
    use: {
        headless: true,
        viewport: {
            width: 1900,
            height: 1050
        },
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        video: {
            mode: 'retain-on-failure',
            size: { width: 1900, height: 1050 }
        },
        screenshot: 'only-on-failure'
    },
    projects: [
        {
            name: 'Firefox', 
            use: { browserName: 'firefox'}
        }
    ]
}

export default config