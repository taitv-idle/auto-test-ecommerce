import { Step } from 'gauge-ts';
import { expect } from '@playwright/test';
import { getPage,BASE_URL } from '../hooks';

export default class AdminLoginSteps {
    private readonly selectors = {
        emailInput: 'input[name="email"]',
        passwordInput: 'input[name="password"]',
        loginButton: 'xpath=//*[@id="root"]/div[1]/div/form/button',
        errorToast: '[role="status"]',
    };

    @Step('Truy cập trang đăng nhập admin')
    public async navigateToAdminLogin() {
        const page = await getPage();
        await page.goto(`${BASE_URL}/admin/login`);
    }

    @Step('Nhập email hợp lệ <email>')
    public async enterValidEmail(email: string) {
        const page = await getPage();
        await page.fill(this.selectors.emailInput, email);
    }

    @Step('Nhập email không hợp lệ <email>')
    public async enterInvalidEmail(email: string) {
        await this.enterValidEmail(email);
    }

    @Step('Nhập mật khẩu hợp lệ <password>')
    public async enterValidPassword(password: string) {
        const page = await getPage();
        await page.fill(this.selectors.passwordInput, password);
    }

    @Step('Nhập mật khẩu không hợp lệ <password>')
    public async enterInvalidPassword(password: string) {
        await this.enterValidPassword(password);
    }

    @Step('Nhấn nút đăng nhập')
    public async clickLoginButton() {
        const page = await getPage();
        await page.click(this.selectors.loginButton);
    }


    @Step('Nhập thông tin hợp lệ')
    public async enterValidCredentials() {
        await this.enterValidEmail("admin@example.com");
        await this.enterValidPassword("Admin@123");
    }

    @Step('Kiểm tra chuyển hướng đến trang dashboard')
    public async verifyRedirectToDashboard() {
        const page = await getPage();
        await page.waitForURL(`${BASE_URL}/admin/dashboard`);
        await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
    }

    @Step("Kiểm tra hiển thị thông báo lỗi <Email hoặc mật khẩu không chính xác>")
    public async verifySpecificErrorMessage(expectedMessage: string) {
        const page = await getPage();
        try {
            // Chờ tối đa 5 giây cho thông báo xuất hiện
            await page.waitForSelector(this.selectors.errorToast, {
                state: 'visible',
                timeout: 5000
            });

            // Lấy nội dung và so sánh
            const actualMessage = await page.textContent(this.selectors.errorToast);
            expect(actualMessage?.trim()).toContain(expectedMessage);
        } catch (error) {
            throw new Error(`Không tìm thấy thông báo lỗi: ${error}`);
        }
    }

    @Step('Nhập email trống')
    public async enterEmptyEmail() {
        const page = await getPage();
        await page.fill(this.selectors.emailInput, '');
    }

    @Step('Nhập mật khẩu trống')
    public async enterEmptyPassword() {
        const page = await getPage();
        await page.fill(this.selectors.passwordInput, '');
    }

    @Step('Kiểm tra hiển thị thông báo lỗi Please fill out this field')
    public async verifyEmptyFieldValidation() {
        const page = await getPage();

        const emailInput = await page.$(this.selectors.emailInput);
        const passwordInput = await page.$(this.selectors.passwordInput);

        if (!emailInput || !passwordInput) {
            throw new Error('Không tìm thấy input email hoặc password');
        }

        // Nhấn nút submit để kích hoạt validation HTML5
        await page.click(this.selectors.loginButton);

        // Chờ trình duyệt hiển thị thông báo validation
        await page.waitForTimeout(200);

        // Kiểm tra giá trị của các input
        const emailValue = await emailInput.evaluate((el: HTMLInputElement) => el.value.trim());
        const passwordValue = await passwordInput.evaluate((el: HTMLInputElement) => el.value.trim());

        if (!emailValue) {
            const msg = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
            expect(msg).toMatch(/please fill out this field|vui lòng điền|this field is required/i);
        } else if (!passwordValue) {
            const msg = await passwordInput.evaluate((el: HTMLInputElement) => el.validationMessage);
            expect(msg).toMatch(/please fill out this field|vui lòng điền|this field is required/i);
        } else {
            throw new Error('Cả email và mật khẩu đều có giá trị. Không có lỗi validation nào để kiểm tra');
        }
    }
}