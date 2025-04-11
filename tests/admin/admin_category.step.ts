import { Step } from 'gauge-ts';
import { expect } from '@playwright/test';
import { getPage,BASE_URL } from '../hooks';

export default class CategorySteps {
    private selectors = {
        menuCategory: 'a:has-text("Danh mục")',
        heading: 'h1',
        addNewButton: 'button:has-text("Thêm mới")',
        categoryNameInput: '#name',
        fileInput: 'xpath=//*[@id="root"]/div[1]/div[4]/div/div/div[3]/div/form/div[2]/label[2]',
        submitButton: 'button:has-text("Thêm Danh Mục")',
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
        expect(title?.trim()).toContain('Quản lý Danh mục');
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
}