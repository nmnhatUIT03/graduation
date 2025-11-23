# 🚀 HƯỚNG DẪN CÀI ĐẶT

## ⚠️ YÊU CẦU

Trước khi bắt đầu, bạn cần cài đặt Node.js vì hiện tại máy chưa có.

## Bước 1: Cài đặt Node.js

### Windows:

1. **Download Node.js:**
   - Truy cập: https://nodejs.org/
   - Click nút **"Download Node.js (LTS)"** màu xanh
   - Chọn phiên bản **Windows Installer (.msi)**

2. **Cài đặt:**
   - Mở file `.msi` đã tải
   - Click **Next** → **Next** → **Install**
   - Chờ cài đặt hoàn tất (1-2 phút)
   - Click **Finish**

3. **Kiểm tra cài đặt thành công:**
   - Mở **Command Prompt** hoặc **PowerShell** MỚI
   - Gõ lệnh:
   ```bash
   node --version
   ```
   - Sẽ hiển thị: `v20.x.x` hoặc tương tự
   - Gõ tiếp:
   ```bash
   npm --version
   ```
   - Sẽ hiển thị: `10.x.x` hoặc tương tự

✅ **Node.js đã được cài đặt thành công!**

---

## Bước 2: Cài đặt Dependencies

Mở **Command Prompt** hoặc **PowerShell** tại thư mục `graduationproject`:

```bash
cd D:\graduationproject
npm install
```

⏱️ **Thời gian:** ~2-3 phút (tùy tốc độ internet)

Lệnh này sẽ cài đặt tất cả packages cần thiết:
- Next.js 14
- React 18
- MongoDB driver
- SendGrid
- Tailwind CSS
- Framer Motion
- TypeScript
- Và các dependencies khác

---

## Bước 3: Setup MongoDB Atlas

### 3.1. Đăng ký tài khoản

1. Truy cập: https://www.mongodb.com/cloud/atlas/register
2. Điền thông tin:
   - Email
   - Password
   - First Name & Last Name
3. Chọn **"I agree to the Terms of Service"**
4. Click **"Create your Atlas account"**
5. Xác nhận email (check hộp thư)

### 3.2. Tạo Cluster

1. Sau khi đăng nhập, MongoDB sẽ hỏi một số câu hỏi:
   - Goal: Chọn **"Learn MongoDB"**
   - Click **"Finish"**

2. Tạo cluster:
   - Click **"Create"** hoặc **"+ Create"**
   - Chọn **"M0 Free"** (không mất phí)
   - Provider: **AWS**
   - Region: Chọn **Singapore** (gần Việt Nam nhất)
   - Cluster Name: Để mặc định hoặc đặt tên `invitation-cluster`
   - Click **"Create Deployment"**

3. Đợi 2-3 phút cho cluster được tạo

### 3.3. Tạo Database User

Một popup sẽ hiện ra ngay sau khi tạo cluster:

1. **Create Database User:**
   - Username: `admin` (hoặc tên bạn thích)
   - Password: Tạo password mạnh (VD: `MyPass123!`)
   - ⚠️ **LƯU LẠI** username và password này!
   - Click **"Create Database User"**

2. **Choose a connection method:**
   - Sẽ tự động nhảy sang bước này
   - Chọn **"Drivers"**
   - Copy **Connection String** (giống như sau):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - ⚠️ **Thay `<password>`** bằng password bạn đã tạo ở trên
   - Click **"Close"**

### 3.4. Whitelist IP

1. Trên menu bên trái, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. IP: `0.0.0.0/0` (sẽ tự động điền)
5. Click **"Confirm"**

✅ **MongoDB Atlas đã setup xong!**

**Connection String của bạn:**
```
mongodb+srv://admin:MyPass123!@cluster0.xxxxx.mongodb.net/invitation_db?retryWrites=true&w=majority
```

---

## Bước 4: Setup Resend (Email Service)

**Resend dễ hơn SendGrid rất nhiều!** 🎉

### 4.1. Đăng ký tài khoản

1. Truy cập: **https://resend.com/signup**
2. Chọn **"Sign up with GitHub"** hoặc **"Sign up with Google"**
3. Xác nhận tài khoản
4. ✅ Xong! Đơn giản vậy thôi!

### 4.2. Tạo API Key

1. Sau khi đăng nhập, bạn sẽ thấy dashboard
2. Click **"API Keys"** ở menu bên trái
3. Click **"Create API Key"**
4. Điền thông tin:
   - Name: `graduation-invitation`
   - Permission: **Full Access** (mặc định)
5. Click **"Add"**
6. **🔴 QUAN TRỌNG:** Copy API key ngay!
   - API key chỉ hiển thị 1 lần
   - Sẽ giống như: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`
7. Lưu API key vào notepad

### 4.3. Verify Domain (Tùy chọn - nếu có domain riêng)

**Nếu CHƯA có domain:** Dùng email mặc định của Resend: `onboarding@resend.dev`

**Nếu CÓ domain riêng:** 
1. Click **"Domains"** ở menu bên trái
2. Click **"Add Domain"**
3. Nhập domain của bạn (vd: `mydomain.com`)
4. Thêm DNS records theo hướng dẫn
5. Verify domain

✅ **Resend đã setup xong!**

**Ưu điểm của Resend:**
- ✅ Free plan: **3,000 emails/tháng** (nhiều hơn SendGrid 30 lần!)
- ✅ Không cần verify sender email
- ✅ Setup cực kỳ đơn giản
- ✅ API dễ dùng hơn

---

## Bước 5: Tạo file .env.local

1. **Tạo file mới:**
   - Trong thư mục `D:\graduationproject`
   - Tạo file tên: `.env.local` (chú ý dấu chấm ở đầu)
   - Windows có thể không cho tạo, dùng lệnh:
   ```bash
   echo. > .env.local
   ```

2. **Mở file `.env.local` bằng Notepad**

3. **Copy nội dung sau và điền thông tin của bạn:**

```env
# MongoDB Atlas (từ Bước 3)
MONGODB_URI=mongodb+srv://admin:MyPass123!@cluster0.xxxxx.mongodb.net/invitation_db?retryWrites=true&w=majority

# Resend (từ Bước 4)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev

# Thông tin sự kiện (tùy chỉnh theo ý bạn)
NEXT_PUBLIC_EVENT_NAME=Lễ Tốt Nghiệp Đại Học
NEXT_PUBLIC_EVENT_DATE=2024-12-31
NEXT_PUBLIC_EVENT_TIME=18:00
NEXT_PUBLIC_EVENT_LOCATION=Trung tâm Hội nghị Quốc gia
NEXT_PUBLIC_EVENT_ADDRESS=01 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội

# Mật khẩu trang Admin
ADMIN_PASSWORD=admin123
```

4. **Lưu file**

⚠️ **Lưu ý:**
- Thay `re_xxxxxxxxxxxxxxxxxxxxxxxxxx` bằng API key từ Resend
- Thay connection string MongoDB bằng của bạn
- `RESEND_FROM_EMAIL` để mặc định `onboarding@resend.dev` (hoặc domain của bạn nếu đã verify)
- Đổi thông tin sự kiện theo ý bạn

---

## Bước 6: Chạy Project

1. **Mở Command Prompt tại thư mục project:**
```bash
cd D:\graduationproject
```

2. **Chạy development server:**
```bash
npm run dev
```

3. **Chờ vài giây**, sẽ thấy thông báo:
```
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

4. **Mở trình duyệt:**
   - Chrome, Edge, Firefox, ...
   - Truy cập: http://localhost:3000

✅ **Website đang chạy!**

---

## Bước 7: Test Website

### Test trang chủ:
1. Xem thông tin sự kiện
2. Kiểm tra countdown timer
3. Xem Google Maps
4. Cuộn xuống form RSVP

### Test RSVP:
1. Điền form với thông tin thật:
   - Tên: Nguyễn Văn A
   - Email: email của bạn
   - Chọn: Có, tôi sẽ tham dự
   - Số người: 2
   - Lời nhắn: "Rất vui được tham dự!"
2. Click **"Gửi xác nhận"**
3. Chờ vài giây
4. Thấy thông báo thành công ✅
5. **Check email của bạn** → Sẽ nhận được email xác nhận đẹp!

### Test Admin Panel:
1. Truy cập: http://localhost:3000/admin
2. Nhập password: `admin123` (hoặc password bạn đặt trong .env.local)
3. Click **"Đăng nhập"**
4. Xem dashboard với thống kê
5. Xem danh sách khách mời (sẽ có bạn vừa test)
6. Thử click **"Export CSV"** để tải danh sách

✅ **Tất cả đều hoạt động!**

---

## Bước 8: Deploy lên Vercel (Production)

### 8.1. Push code lên GitHub

1. **Tạo repository trên GitHub:**
   - Truy cập: https://github.com/new
   - Repository name: `graduation-invitation`
   - Chọn **Private** (nếu muốn giữ kín)
   - Click **"Create repository"**

2. **Push code:**
```bash
cd D:\graduationproject
git init
git add .
git commit -m "Initial commit: Graduation Invitation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/graduation-invitation.git
git push -u origin main
```

### 8.2. Deploy trên Vercel

1. **Truy cập:** https://vercel.com/signup
2. **Sign up với GitHub**
3. Sau khi đăng nhập, click **"Add New Project"**
4. **Import repository** `graduation-invitation`
5. Click **"Import"**

6. **Configure Project:**
   - Framework Preset: **Next.js** (tự động detect)
   - Root Directory: `./`
   - Build Command: `next build` (tự động)
   - Output Directory: `.next` (tự động)

7. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Thêm từng biến từ file `.env.local`:
     ```
     MONGODB_URI = mongodb+srv://...
     SENDGRID_API_KEY = SG.xxx...
     SENDGRID_FROM_EMAIL = your@email.com
     NEXT_PUBLIC_EVENT_NAME = Lễ Tốt Nghiệp
     ... (tất cả các biến khác)
     ```

8. Click **"Deploy"**

9. **Đợi 1-2 phút** để Vercel build và deploy

10. ✅ **Website live!**
    - URL: `https://your-project.vercel.app`
    - Share URL này với khách mời!

---

## 🎉 HOÀN TẤT!

Bạn đã có một website invitation hoàn chỉnh với:
- ✅ Giao diện đẹp, professional
- ✅ Form RSVP tự động
- ✅ Email xác nhận tự động
- ✅ Admin panel quản lý
- ✅ Deployed production

**URL Website:** https://your-project.vercel.app

---

## 🆘 Troubleshooting

### Lỗi: "npm: command not found"
→ Node.js chưa được cài đặt đúng
→ Cài lại Node.js và restart terminal

### Lỗi: "Module not found"
→ Dependencies chưa được cài
→ Chạy: `npm install`

### Lỗi MongoDB: "bad auth"
→ Username/password sai trong connection string
→ Kiểm tra lại .env.local

### Lỗi Resend: "Unauthorized"
→ API key sai
→ Tạo lại API key trên Resend dashboard

### Email không nhận được
→ Check spam folder
→ Check Resend Logs trong dashboard
→ Nếu dùng domain riêng, verify domain đã đúng chưa

### Port 3000 đang được sử dụng
```bash
npx kill-port 3000
npm run dev
```

---

## 📞 Cần thêm giúp đỡ?

- 📖 Đọc `SETUP_GUIDE.md` cho hướng dẫn chi tiết hơn
- 📖 Đọc `README.md` cho technical documentation
- 🔍 Google error message cụ thể
- 📧 Check MongoDB documentation: https://docs.mongodb.com/
- 📧 Check Resend documentation: https://resend.com/docs

---

**Chúc bạn thành công! 🚀✨**

