# 🎯 Auto Test E-Commerce with Playwright + Gauge

Dự án tự động kiểm thử (Automation Testing) cho website E-Commerce, sử dụng kết hợp [Playwright](https://playwright.dev/) và [Gauge](https://gauge.org/) để viết và tổ chức test theo hướng **BDD (Behavior Driven Development)** — dễ bảo trì, mở rộng, và phù hợp cho cả dev lẫn QA cùng tham gia viết test.

---

## 📦 Tech Stack

- **Playwright** — Trình điều khiển browser tự động hỗ trợ Chromium, Firefox, WebKit.
- **Gauge** — Framework kiểm thử theo ngữ nghĩa (Spec-based Testing), hỗ trợ tag và báo cáo HTML.
- **Node.js v20+** — Môi trường chạy JavaScript/TypeScript.
- **TypeScript** — Giúp viết mã rõ ràng, dễ bảo trì, tránh lỗi runtime.
- **TailwindCSS UI Testing** — Kiểm tra trực quan giao diện theo CSS tiện lợi.
- **Page Object Model (POM)** — Tách biệt logic tương tác với giao diện người dùng.

---

## 🎯 Mục tiêu kiểm thử

- ✅ Đăng nhập / Đăng xuất (Admin / Seller / User)
- ✅ Thêm / sửa / xoá sản phẩm
- ✅ Xem chi tiết sản phẩm
- ✅ Tìm kiếm sản phẩm
- ✅ Đặt hàng & xác nhận đơn hàng
- ✅ Kiểm tra các thành phần giao diện sử dụng TailwindCSS
- ✅ Kiểm tra xác thực, thông báo lỗi (toast message)
- ✅ Kiểm tra responsive (mobile / tablet / desktop)
- ✅ Nhiều nội dung khác

---
## ⚙️ Cài đặt & Thiết lập môi trường
- git clone https://github.com/taitv-idle/auto-test-ecommerce.git
- cd auto-test-ecommerce

## 📁 Cấu trúc dự án

```bash
auto-test-ecommerce/
│
├── specs/                     # File đặc tả test (.spec)
│   ├── user/                  # Test dành cho khách hàng
│   ├── admin/                 # Test dành cho admin
│   └── seller/                # Test dành cho người bán
│
├── tests/                     # Code thực thi step definition
│   ├── hooks.ts               # BeforeSuite, BeforeScenario, After hooks...
│   ├── user/
│   ├── admin/
│   └── seller/
│
├── pages/                     # Page Object Model: Mỗi trang là 1 class
│   ├── user/
│   ├── admin/
│   └── seller/
│
├── utils/                     # Chứa các hàm dùng chung (helper, constants...)
│   ├── helpers.ts
│   └── constants.ts
│
├── env/                       # File cấu hình môi trường
│   └── dev.env
│
├── reports/                   # Báo cáo HTML sau khi chạy test
│
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── gauge.config.json
