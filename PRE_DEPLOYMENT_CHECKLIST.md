# ✅ Pre-Deployment Checklist

Kiểm tra danh sách này trước khi deploy lên Vercel để đảm bảo mọi thứ hoạt động!

---

## 📋 Checklist Trước Khi Deploy

### 1. ✅ Code & Dependencies

- [ ] Đã chạy `npm install` thành công
- [ ] Không có lỗi khi chạy `npm run dev`
- [ ] Website hiển thị đúng trên localhost:3000/3001
- [ ] Không có console errors trong DevTools

### 2. ✅ Environment Variables

- [ ] Đã tạo file `.env.local`
- [ ] Đã điền đầy đủ các biến:
  - [ ] `NEXT_PUBLIC_EVENT_NAME`
  - [ ] `NEXT_PUBLIC_EVENT_DATE`
  - [ ] `NEXT_PUBLIC_EVENT_TIME`
  - [ ] `NEXT_PUBLIC_EVENT_LOCATION`
  - [ ] `NEXT_PUBLIC_EVENT_ADDRESS`
  - [ ] `MONGODB_URI`
  - [ ] `GMAIL_USER`
  - [ ] `GMAIL_APP_PASSWORD`

### 3. ✅ MongoDB Atlas

- [ ] Đã tạo tài khoản MongoDB Atlas
- [ ] Đã tạo cluster (Free tier)
- [ ] Đã tạo database user với username/password
- [ ] Đã whitelist IP: `0.0.0.0/0` (Allow all)
- [ ] Đã test connection string (website chạy được local)
- [ ] Đã tạo database: `graduation` hoặc tên khác
- [ ] Collection `guests` sẽ tự động tạo khi có RSVP đầu tiên

### 4. ✅ Gmail SMTP

- [ ] Đã bật 2-Step Verification trên Gmail
- [ ] Đã tạo App Password (16 ký tự)
- [ ] Đã test gửi email thành công (submit form RSVP local)
- [ ] Email xác nhận được gửi đến inbox (check spam nếu không thấy)

### 5. ✅ Content & Design

- [ ] Thông tin sự kiện đã chính xác
- [ ] Ngày giờ đúng
- [ ] Địa điểm đúng
- [ ] Bản đồ Google Maps hiển thị đúng vị trí
- [ ] Ảnh hiển thị đúng (`/public/images/1763910064620frame.jpeg`)
- [ ] Số điện thoại liên hệ đúng: 0346 029 426
- [ ] Text đã được cá nhân hóa theo ý muốn

### 6. ✅ Features Testing

Test các chức năng trên local:

- [ ] Form RSVP submit thành công
- [ ] Validation hoạt động (tên, email, phone)
- [ ] Email xác nhận được gửi
- [ ] Email có đầy đủ thông tin sự kiện
- [ ] Countdown timer chạy đúng
- [ ] Button "Add to Calendar" mở Google Calendar
- [ ] Google Calendar có đúng thông tin sự kiện
- [ ] Bản đồ hiển thị và tương tác được
- [ ] Responsive trên mobile/tablet (test DevTools)
- [ ] Admin page (`/admin`) hiển thị danh sách guests

### 7. ✅ Git & GitHub

- [ ] Đã cài đặt Git
- [ ] Đã tạo GitHub repository
- [ ] Đã commit code: `git add . && git commit -m "Initial commit"`
- [ ] Đã push lên GitHub: `git push origin main`
- [ ] File `.env.local` KHÔNG được push (check .gitignore)

### 8. ✅ Vercel Account

- [ ] Đã tạo tài khoản Vercel
- [ ] Đã kết nối Vercel với GitHub
- [ ] Có thể import repository

---

## 🚨 Lưu Ý Quan Trọng

### ⚠️ KHÔNG Push File Nhạy Cảm

File `.gitignore` phải chứa:
```
.env*.local
.env
```

Kiểm tra trước khi push:
```bash
git status
```

Đảm bảo `.env.local` KHÔNG xuất hiện trong danh sách!

### ⚠️ MongoDB IP Whitelist

Để Vercel kết nối được MongoDB:
- **PHẢI whitelist**: `0.0.0.0/0` (Allow from anywhere)
- Không whitelist chỉ IP local của bạn!

### ⚠️ Gmail App Password

- KHÔNG dùng mật khẩu Gmail thường
- PHẢI tạo App Password riêng (16 ký tự)
- Xem hướng dẫn: `GMAIL_SETUP.md`

---

## 🔍 Test Local Lần Cuối

Trước khi deploy, test lần cuối trên local:

```bash
# Stop server hiện tại (Ctrl+C)
# Xóa cache
rm -rf .next

# Build production
npm run build

# Run production
npm start
```

Nếu chạy OK → Sẵn sàng deploy!

---

## 📝 Chuẩn Bị Environment Variables Cho Vercel

Copy các giá trị từ `.env.local` để sẵn sàng paste vào Vercel:

```env
NEXT_PUBLIC_EVENT_NAME=Nhat's graduation
NEXT_PUBLIC_EVENT_DATE=2025-11-27
NEXT_PUBLIC_EVENT_TIME=11:30
NEXT_PUBLIC_EVENT_LOCATION=Sảnh A - Trường Đại học Công nghệ thông tin (ĐHQG-TPHCM)
NEXT_PUBLIC_EVENT_ADDRESS=Khu Phố 6, Linh Trung, Thủ Đức, TP. Hồ Chí Minh
MONGODB_URI=mongodb+srv://...
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

---

## ✅ Sẵn Sàng Deploy!

Nếu tất cả đã ✅ → Đi đến `VERCEL_QUICKSTART.md` hoặc `VERCEL_DEPLOYMENT.md`

Good luck! 🚀

