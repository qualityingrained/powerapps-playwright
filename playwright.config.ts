import { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
	timeout: 120000,
	retries: 2,
	testDir: "tests/",
	reporter: [["list"], ["html", { open: "never" }]],
	globalTimeout: 60 * 60 * 1000,
	expect: {
		timeout: 60000,
	},
	use: {
		headless: true,
		viewport: {
			width: 1900,
			height: 1050,
		},
		actionTimeout: 15000,
		ignoreHTTPSErrors: true,
		video: {
			mode: "retain-on-failure",
			size: {
				width: 1900,
				height: 1050,
			},
		},
		screenshot: "only-on-failure",
	},
	projects: [
		{
			name: "Chrome",
			use: {
				browserName: "chromium",
				launchOptions: {
					args: ["--use-gs=egl"],
				},
			},
		},
	],
};

export default config;
