import * as fs from 'fs';
import * as path from 'path';
import { getPage } from '../hooks';

export async function takeScreenshot(name: string) {
    const dir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const fileName = `${name}-${Date.now()}.png`;
    const filePath = path.join(dir, fileName);

    const currentPage = await getPage();
    await currentPage.screenshot({ path: filePath, fullPage: true });
}
