import { Step } from 'gauge-ts';
import { getPage } from '../hooks';

export default class AdminLoginChung{
    @Step('Đăng nhập với tài khoản quản trị hợp lệ')
    public async AdminLoginChung() {
        const page = await getPage();
        await page.goto('http://localhost:3000/admin/login');
        await page.fill('input[name="email"]', 'taitv@abc.xxx');
        await page.fill('input[name="password"]', '123456');
        await page.click('xpath=//*[@id="root"]/div[1]/div/form/button');
        await page.waitForURL('**/admin/dashboard');
    }
}