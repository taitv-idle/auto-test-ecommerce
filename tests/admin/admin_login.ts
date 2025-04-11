import { Step } from 'gauge-ts';
import { getPage, loginAsAdmin } from '../hooks';

export default class AdminLoginChung{
    @Step('Đăng nhập với tài khoản quản trị hợp lệ')
    public async AdminLoginChung() {
        const page = await getPage();
        await loginAsAdmin();
    }
}