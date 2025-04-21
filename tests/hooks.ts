import { BeforeSuite, AfterSuite } from 'gauge-ts';
import { Browser, chromium, Page } from 'playwright';

export const BASE_URL = 'http://localhost:3001';

export let browser: Browser;
export let page: Page;

export async function getPage(): Promise<Page> {
    if (!page) {
        await initializeBrowser();
    }
    return page;
}
export async function loginAsAdmin() {
// ✅ Tự động đăng nhập admin trước khi chạy các step
    await page.goto(`${BASE_URL}/admin/login`);
    await page.fill('input[name="email"]', 'taitv@abc.xxx');
    await page.fill('input[name="password"]', '123456');
    await page.click('xpath=//*[@id="root"]/div[1]/div/form/button');
    await page.waitForURL('**/admin/dashboard');
}

export class Hooks {
    @BeforeSuite()
    public async beforeSuite() {
        browser = await chromium.launch({
            headless: false,
            slowMo: 50
        });

        const context = await browser.newContext();
        page = await context.newPage();
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
