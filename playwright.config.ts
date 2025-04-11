import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        baseURL: 'http://localhost:3000',
        headless: false,
        viewport: { width: 1280, height: 800 },
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
    },
    timeout: 30000,
};

export default config;