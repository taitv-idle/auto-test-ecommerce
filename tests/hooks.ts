import { BeforeSuite, AfterSuite } from 'gauge-ts';
import { Browser, chromium, Page } from 'playwright';

export const BASE_URL = 'http://localhost:3000';

export let browser: Browser;
export let page: Page;

export async function getPage(): Promise<Page> {
    if (!page) {
        await initializeBrowser();
    }
    return page;
}

export class Hooks {
    @BeforeSuite()
    public async beforeSuite() {
        browser = await chromium.launch({
            headless: false,
            slowMo: 50
        });
        page = await browser.newPage();
        await page.setViewportSize({ width: 1280, height: 800 });
    }

    @AfterSuite()
    public async afterSuite() {
        if (browser) {
            await browser.close();
        }
    }
}

async function initializeBrowser() {
    const hooks = new Hooks();
    await hooks.beforeSuite();
}