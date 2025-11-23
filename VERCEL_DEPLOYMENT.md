# 🚀 Hướng Dẫn Deploy Lên Vercel

## 📋 Yêu Cầu Trước Khi Deploy

- ✅ Đã kết nối Vercel với GitHub
- ✅ Có tài khoản MongoDB Atlas (đã setup)
- ✅ Có Gmail App Password (đã setup)
- ✅ Code đã hoàn chỉnh

---

## 🔥 BƯỚC 1: Push Code Lên GitHub

### 1.1. Khởi tạo Git (nếu chưa có)

```bash
git init
git add .
git commit -m "Initial commit - Graduation invitation project"
```

### 1.2. Tạo Repository trên GitHub

1. Truy cập: https://github.com/new
2. Đặt tên repo: `graduation-invitation` (hoặc tên khác)
3. Chọn **Private** (nếu muốn giữ kín)
4. Click **Create repository**

### 1.3. Push Code Lên GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/graduation-invitation.git
git branch -M main
git push -u origin main
```

> **Lưu ý:** Thay `YOUR_USERNAME` bằng username GitHub của bạn

---

## 🌐 BƯỚC 2: Deploy Trên Vercel

### 2.1. Import Project

1. Truy cập: https://vercel.com/new
2. Chọn **Import Git Repository**
3. Tìm và chọn repo `graduation-invitation`
4. Click **Import**

### 2.2. Configure Project

**Framework Preset:** Next.js (Vercel tự động phát hiện)

**Root Directory:** `./` (giữ nguyên)

**Build Command:** `npm run build` (tự động)

**Output Directory:** `.next` (tự động)

---

## 🔐 BƯỚC 3: Cấu Hình Environment Variables

### 3.1. Thêm Environment Variables

Trong màn hình **Configure Project**, kéo xuống phần **Environment Variables** và thêm:

#### 1️⃣ Event Information (Public)

| Key | Value | Mô tả |
|-----|-------|-------|
| `NEXT_PUBLIC_EVENT_NAME` | `Nhat's graduation` | Tên sự kiện |
| `NEXT_PUBLIC_EVENT_DATE` | `2025-11-27` | Ngày sự kiện (YYYY-MM-DD) |
| `NEXT_PUBLIC_EVENT_TIME` | `11:30` | Giờ sự kiện (HH:mm) |
| `NEXT_PUBLIC_EVENT_LOCATION` | `Sảnh A - Trường Đại học Công nghệ thông tin (ĐHQG-TPHCM)` | Địa điểm |
| `NEXT_PUBLIC_EVENT_ADDRESS` | `Khu Phố 6, Linh Trung, Thủ Đức, TP. Hồ Chí Minh` | Địa chỉ đầy đủ |

#### 2️⃣ MongoDB Connection (Private)

| Key | Value | Mô tả |
|-----|-------|-------|
| `MONGODB_URI` | `mongodb+srv://...` | Connection string từ MongoDB Atlas |

> **Cách lấy MongoDB URI:**
> 1. Vào MongoDB Atlas → **Database** → **Connect**
> 2. Chọn **Connect your application**
> 3. Copy connection string
> 4. Thay `<password>` bằng password thật của bạn

#### 3️⃣ Gmail SMTP (Private)

| Key | Value | Mô tả |
|-----|-------|-------|
| `GMAIL_USER` | `your_email@gmail.com` | Email Gmail của bạn |
| `GMAIL_APP_PASSWORD` | `xxxx xxxx xxxx xxxx` | App Password từ Gmail |

> **Xem chi tiết:** File `GMAIL_SETUP.md`

### 3.2. Environment cho Production, Preview, Development

**Quan trọng:** Chọn **Production, Preview, and Development** cho tất cả biến để đảm bảo hoạt động ở mọi môi trường.

---

## 🎯 BƯỚC 4: Deploy!

1. Click **Deploy** ở cuối trang
2. Đợi 2-3 phút để Vercel build và deploy
3. ✅ **Thành công!** Bạn sẽ thấy màn hình congratulations

---

## 🔍 BƯỚC 5: Kiểm Tra Website

### 5.1. Truy cập Website

Vercel sẽ tạo URL dạng:
```
https://graduation-invitation-xxxx.vercel.app
```

Click vào link để xem website của bạn!

### 5.2. Test Các Chức Năng

✅ **Checklist:**
- [ ] Hiển thị thông tin sự kiện đúng
- [ ] Countdown timer hoạt động
- [ ] Form RSVP submit được
- [ ] Nhận được email xác nhận (test với email của bạn trước)
- [ ] Bản đồ hiển thị đúng vị trí UIT
- [ ] Button "Add to Calendar" mở Google Calendar đúng
- [ ] Thông tin liên hệ hiển thị đúng

---

## 🐛 BƯỚC 6: Debug (Nếu Có Lỗi)

### 6.1. Xem Logs

1. Vào Vercel Dashboard
2. Chọn project của bạn
3. Vào tab **Deployments**
4. Click vào deployment mới nhất
5. Xem **Build Logs** hoặc **Runtime Logs**

### 6.2. Các Lỗi Thường Gặp

#### ❌ Lỗi: Email không gửi được

**Nguyên nhân:**
- Sai `GMAIL_USER` hoặc `GMAIL_APP_PASSWORD`
- Chưa bật 2-Step Verification
- Sai App Password

**Giải pháp:**
1. Kiểm tra lại environment variables
2. Xem file `GMAIL_SETUP.md`
3. Tạo lại App Password

#### ❌ Lỗi: Không kết nối được MongoDB

**Nguyên nhân:**
- Sai `MONGODB_URI`
- Chưa whitelist IP của Vercel

**Giải pháp:**
1. Vào MongoDB Atlas → **Network Access**
2. Click **Add IP Address**
3. Chọn **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

#### ❌ Lỗi: 400 Bad Request khi submit form

**Nguyên nhân:**
- MongoDB chưa kết nối
- Validation lỗi

**Giải pháp:**
1. Xem Runtime Logs trên Vercel
2. Kiểm tra MongoDB connection
3. Test form với dữ liệu hợp lệ

---

## 🎨 BƯỚC 7: Custom Domain (Tùy Chọn)

### 7.1. Thêm Domain Của Bạn

1. Vào Vercel Dashboard → Project → **Settings** → **Domains**
2. Nhập domain của bạn (VD: `graduation.yourdomain.com`)
3. Làm theo hướng dẫn để cấu hình DNS

### 7.2. Hoặc Dùng Free Vercel Domain

Vercel cung cấp miễn phí domain dạng:
```
your-project-name.vercel.app
```

Bạn có thể đổi tên project để có domain đẹp hơn:
1. **Settings** → **General** → **Project Name**
2. Đổi thành `nhat-graduation` → Save
3. Domain mới: `nhat-graduation.vercel.app`

---

## 🔄 BƯỚC 8: Cập Nhật Code Sau Này

### 8.1. Push Code Mới

Mỗi khi bạn update code:

```bash
git add .
git commit -m "Update: mô tả thay đổi"
git push
```

### 8.2. Auto Deploy

Vercel sẽ **tự động** build và deploy lại mỗi khi bạn push code lên GitHub!

✨ **Mỗi commit = 1 deployment mới**

### 8.3. Rollback (Nếu Cần)

1. Vào **Deployments** tab
2. Tìm deployment cũ hoạt động tốt
3. Click **⋯** → **Promote to Production**

---

## 📱 BƯỚC 9: Chia Sẻ Link

### 9.1. Rút Gọn Link (Tùy Chọn)

Dùng các dịch vụ:
- **Bitly:** https://bitly.com
- **TinyURL:** https://tinyurl.com

VD: `https://bit.ly/nhat-graduation-2025`

### 9.2. Share Link

Chia sẻ link qua:
- 📧 Email
- 💬 Zalo, Messenger
- 📱 SMS
- 🎴 In ra thiệp mời với QR Code

---

## 🎯 BƯỚC 10: Monitor & Maintain

### 10.1. Theo Dõi Analytics

Vercel cung cấp:
- **Visitors:** Số lượng người truy cập
- **Page Views:** Lượt xem trang
- **Top Pages:** Trang được xem nhiều nhất

### 10.2. Kiểm Tra Database

Định kỳ vào MongoDB Atlas để xem:
- Số lượng guest đã RSVP
- Ai tham dự, ai không
- Lời nhắn của khách mời

### 10.3. Admin Panel

Truy cập: `https://your-domain.vercel.app/admin`

Xem danh sách khách mời đã đăng ký.

---

## 📚 Tài Nguyên Bổ Sung

### Vercel Documentation
- https://vercel.com/docs

### Next.js on Vercel
- https://vercel.com/docs/frameworks/nextjs

### Environment Variables
- https://vercel.com/docs/concepts/projects/environment-variables

---

## ✅ Checklist Hoàn Thành

- [ ] Push code lên GitHub
- [ ] Import project vào Vercel
- [ ] Cấu hình tất cả environment variables
- [ ] Deploy thành công
- [ ] Test website hoạt động
- [ ] Test form RSVP
- [ ] Test gửi email
- [ ] Chia sẻ link với bạn bè

---

## 🆘 Cần Trợ Giúp?

Nếu gặp vấn đề:

1. **Xem Logs trên Vercel**
2. **Kiểm tra lại Environment Variables**
3. **Test local trước:** `npm run dev`
4. **Xem các file hướng dẫn:**
   - `GMAIL_SETUP.md` - Setup Gmail
   - `INSTALLATION.md` - Setup MongoDB
   - `README.md` - Tổng quan project

---

## 🎉 Chúc Mừng!

Bạn đã deploy thành công website thiệp mời tốt nghiệp lên Vercel! 🎓

Giờ bạn có thể chia sẻ link với bạn bè và nhận RSVP từ họ!

**Good luck với graduation ceremony! 🎊**

