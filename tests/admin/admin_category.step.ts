import { Step } from 'gauge-ts';
import { expect } from '@playwright/test';
import { getPage, BASE_URL } from '../hooks';

export default class CategorySteps {
    private readonly selectors = {
        menuCategory: 'a:has-text("Danh mục")',
        heading: 'h1',
        addNewButton: 'button:has-text("Thêm mới")',
        updateNewButton: 'button:has-text("Cập nhật Danh mục")',
        categoryNameInput: '#name',
        fileInput: 'xpath=//*[@id="root"]/div[1]/div[4]/div/div/div[3]/div/form/div[2]/label[2]',
        iconUpdate: 'button[title="Chỉnh sửa"]',
        iconDelete: 'button[title="Xóa"]',
        submitButton: 'button:has-text("Thêm Danh Mục")',
        nameValidationMessage: '#name:invalid',
        imageErrorText: 'text=Vui lòng chọn hình ảnh',
        duplicateErrorText: 'text=Danh mục với tên này đã tồn tại.',
        errorMessage: '.error-message'
    };

    @Step('Click vào phần Danh mục')
    public async clickCategoryMenu() {
        const page = await getPage();
        await page.click(this.selectors.menuCategory);
        await page.waitForSelector(this.selectors.heading);
    }

    @Step("Kiểm tra tiêu đề 'Quản lý Danh mục' được hiển thị")
    public async verifyCategoryPageTitle() {
        const page = await getPage();
        const title = await page.textContent(this.selectors.heading);
        expect(title?.trim()).toBe('Quản lý Danh mục');
    }

    @Step('Click vào button Thêm mới')
    public async clickAddNewCategory() {
        const page = await getPage();
        await page.click(this.selectors.addNewButton);
    }

    @Step('Nhập tên danh mục hợp lệ <categoryName>')
    public async enterCategoryName(categoryName: string) {
        const page = await getPage();
        await page.fill(this.selectors.categoryNameInput, categoryName);
    }

    @Step('Chọn hình ảnh danh mục')
    public async selectCategoryImage() {
        const page = await getPage();
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.click(this.selectors.fileInput);
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('./tests/assets/icon.png');
    }

    @Step('Click vào button Thêm Danh Mục')
    public async clickSubmitCategory() {
        const page = await getPage();
        await page.click(this.selectors.submitButton);
    }

    @Step('Kiểm tra thông báo lỗi thiếu tên danh mục')
    public async verifyNameRequiredError() {
        const page = await getPage();

        // Cách 1: Kiểm tra validation message của trình duyệt
        const validationMessage = await page.$eval(
            this.selectors.categoryNameInput,
            (el: HTMLInputElement) => el.validationMessage
        );
        expect(validationMessage).toMatch(/vui lòng điền|please fill|this field is required/i);

        // Cách 2: Kiểm tra thông báo lỗi UI (nếu có)
        const errorVisible = await page.isVisible(this.selectors.errorMessage);
        if (errorVisible) {
            const errorText = await page.textContent(this.selectors.errorMessage);
            expect(errorText).toMatch(/tên danh mục là bắt buộc/i);
        }
    }

    @Step('Kiểm tra thông báo lỗi thiếu hình ảnh')
    public async verifyImageRequiredError() {
        const page = await getPage();
        await page.waitForSelector(this.selectors.imageErrorText, { timeout: 2000 });
        const errorVisible = await page.isVisible(this.selectors.imageErrorText);
        expect(errorVisible).toBeTruthy();
    }

    @Step('Kiểm tra thông báo lỗi danh mục trùng tên')
    public async verifyDuplicateCategoryError() {
        const page = await getPage();
        await page.waitForSelector(this.selectors.duplicateErrorText, { timeout: 2000 });
        const errorVisible = await page.isVisible(this.selectors.duplicateErrorText);
        expect(errorVisible).toBeTruthy();
    }

    @Step('Click vào icon chỉnh sửa')
    public async clickEditCategoryIcon() {
        const page = await getPage();
        await page.click(this.selectors.iconUpdate);
    }

    @Step('Xóa tên danh mục hiện tại và để trống')
    public async clearCategoryName() {
        const page = await getPage();
        await page.fill(this.selectors.categoryNameInput, '');
    }

    @Step('Click vào button Cập nhật Danh Mục')
    public async clickUpdateCategoryButton() {
        const page = await getPage();
        await page.click(this.selectors.updateNewButton);
    }
}