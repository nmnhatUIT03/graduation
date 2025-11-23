# 📝 CHANGELOG

## [2.0.0] - Gmail SMTP Migration

### ✅ Changed
- **Email Service:** Chuyển từ Resend sang Gmail SMTP
- **Lý do:** Không cần domain, email từ Gmail cá nhân, miễn phí 500 emails/ngày

### ➕ Added
- `lib/gmail.ts` - Gmail SMTP configuration với nodemailer
- `GMAIL_SETUP.md` - Hướng dẫn chi tiết setup Gmail SMTP
- `GMAIL_QUICKSTART.txt` - Hướng dẫn nhanh 3 bước
- Dependencies: `nodemailer@^7.0.10`, `@types/nodemailer@^7.0.4`

### ➖ Removed
- `lib/resend.ts` - File cũ không còn dùng
- Package `resend@^3.0.0` - Đã gỡ cài đặt

### 🔧 Modified
- `app/api/rsvp/route.ts` - Import từ `@/lib/gmail` thay vì `@/lib/resend`
- `package.json` - Thêm nodemailer, xóa resend
- `.env.example` - Update với GMAIL_USER và GMAIL_APP_PASSWORD

### 📧 Email Features
- ✅ Gửi từ Gmail cá nhân (21521226@gm.uit.edu.vn)
- ✅ Gửi đến bất kỳ email nào
- ✅ Giới hạn: 500 emails/ngày (đủ cho vài chục người)
- ✅ Không cần domain, API key của bên thứ 3
- ✅ Email template HTML đẹp giữ nguyên

### 🎯 Next Steps for User
1. Bật 2-Step Verification trên Gmail
2. Tạo App Password
3. Cấu hình `.env.local` với credentials
4. Test RSVP → Nhận email xác nhận

---

## [1.0.0] - Initial Release (Resend)

### Features
- Next.js 14 với App Router
- MongoDB Atlas integration
- Resend email service (đã thay thế)
- RSVP form với validation
- Admin panel
- Responsive design với Tailwind CSS
- Framer Motion animations

---

**Current Version:** 2.0.0 (Gmail SMTP)

