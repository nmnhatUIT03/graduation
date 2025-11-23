# 🎓 Graduation Invitation - Single Page Invitation

Trang web lời mời tốt nghiệp được xây dựng bằng Next.js, MongoDB, Gmail SMTP và Vercel.

## ✨ Tính năng

- 🎨 Giao diện đẹp mắt, hiện đại với Tailwind CSS
- 📱 Responsive hoàn toàn (desktop, tablet, mobile)
- ⏱️ Đếm ngược thời gian đến sự kiện
- 📝 Form RSVP với validation
- 📧 Gửi email xác nhận tự động qua Gmail SMTP
- 🗺️ Tích hợp Google Maps
- 📊 Trang Admin quản lý khách mời
- 💾 Lưu trữ dữ liệu trên MongoDB Atlas
- 🎭 Animation mượt mà với Framer Motion
- 📥 Export danh sách khách mời ra CSV

## 🚀 Công nghệ sử dụng

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** MongoDB Atlas
- **Email:** Gmail SMTP (Nodemailer)
- **Animation:** Framer Motion
- **Deployment:** Vercel
- **Language:** TypeScript

## 📦 Cài đặt

### 1. Cài đặt Node.js

Truy cập [nodejs.org](https://nodejs.org/) và tải phiên bản LTS (khuyên dùng v18 trở lên).

### 2. Clone hoặc sử dụng project này

```bash
cd graduationproject
```

### 3. Cài đặt dependencies

```bash
npm install
```

### 4. Cấu hình biến môi trường

Tạo file `.env.local` trong thư mục gốc và thêm các biến sau:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/invitation_db

# Gmail SMTP
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# Event Information
NEXT_PUBLIC_EVENT_NAME=Nhat's graduation
NEXT_PUBLIC_EVENT_DATE=2025-11-27
NEXT_PUBLIC_EVENT_TIME=11:30
NEXT_PUBLIC_EVENT_LOCATION=Sảnh A - Trường Đại học Công nghệ thông tin (ĐHQG-TPHCM)
NEXT_PUBLIC_EVENT_ADDRESS=Khu Phố 6, Linh Trung, Thủ Đức, TP. Hồ Chí Minh
```

### 5. Setup MongoDB Atlas

1. Truy cập [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo tài khoản miễn phí
3. Tạo cluster mới (chọn Free tier)
4. Tạo database user
5. Whitelist IP address (0.0.0.0/0 cho development)
6. Lấy connection string và thêm vào `.env.local`

### 6. Setup Gmail SMTP

1. Bật 2-Step Verification trên Gmail
2. Tạo App Password
3. Thêm vào `.env.local`

> **Chi tiết:** Xem file `GMAIL_SETUP.md` để biết hướng dẫn đầy đủ

## 🏃 Chạy project

### Development mode

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Production build

```bash
npm run build
npm start
```

## 📤 Deploy lên Vercel

### 🚀 Quick Start

Xem file `VERCEL_QUICKSTART.md` để deploy nhanh trong 5 bước!

### 📖 Hướng dẫn chi tiết

Xem file `VERCEL_DEPLOYMENT.md` để biết hướng dẫn đầy đủ về:
- Push code lên GitHub
- Import vào Vercel
- Cấu hình Environment Variables
- Troubleshooting
- Custom domain
- Monitor & maintain

## 📂 Cấu trúc thư mục

```
graduationproject/
├── app/
│   ├── api/              # API Routes
│   │   ├── rsvp/         # RSVP endpoint
│   │   └── guests/       # Guests management
│   ├── admin/            # Admin panel
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── InvitationCard.tsx
│   └── RSVPForm.tsx
├── lib/
│   ├── mongodb.ts        # MongoDB connection
│   └── sendgrid.ts       # SendGrid config
├── models/
│   └── Guest.ts          # Guest model & validation
├── public/               # Static files
├── .env.example          # Example environment variables
├── .env.local            # Your environment variables (not committed)
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Tùy chỉnh

### Thay đổi màu sắc

Chỉnh sửa file `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#ec4899', // Màu chính
    600: '#db2777',
  },
}
```

### Thay đổi font chữ

Chỉnh sửa file `app/layout.tsx`:

```typescript
const inter = Inter({ ... });
const playfair = Playfair_Display({ ... });
```

### Thay đổi thông tin sự kiện

Chỉnh sửa file `.env.local` và restart server.

## 🔒 Bảo mật

- Trang admin được bảo vệ bằng mật khẩu đơn giản
- MongoDB connection string được bảo vệ qua environment variables
- SendGrid API key được giữ bí mật
- **Lưu ý:** Đây là bảo mật cơ bản, cho production thực tế nên dùng authentication phức tạp hơn (JWT, OAuth, etc.)

## 📊 Admin Panel

Truy cập `/admin` và nhập mật khẩu từ `ADMIN_PASSWORD` để:

- Xem danh sách khách mời
- Thống kê số lượng tham dự
- Lọc theo trạng thái
- Export CSV
- Xóa khách mời

## 🐛 Troubleshooting

### Lỗi kết nối MongoDB

- Kiểm tra connection string
- Kiểm tra IP whitelist
- Kiểm tra database user credentials

### Email không được gửi

- Kiểm tra `GMAIL_USER` và `GMAIL_APP_PASSWORD`
- Đảm bảo đã bật 2-Step Verification trên Gmail
- Tạo đúng App Password (xem `GMAIL_SETUP.md`)
- Kiểm tra logs trong terminal

### Lỗi build

```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 📝 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Feel free to submit issues và pull requests.

## 📧 Liên hệ

Nếu có câu hỏi, vui lòng tạo issue trên GitHub repository.

---

**Made with ❤️ using Next.js**

