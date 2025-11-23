# 🚀 HƯỚNG DẪN CÀI ĐẶT & SETUP

## Bước 1: Cài đặt Node.js

1. Truy cập: https://nodejs.org/
2. Tải phiên bản **LTS** (khuyên dùng v18 hoặc v20)
3. Cài đặt Node.js theo hướng dẫn
4. Kiểm tra cài đặt thành công:

```bash
node --version
npm --version
```

## Bước 2: Cài đặt Dependencies

Mở terminal/command prompt tại thư mục `graduationproject` và chạy:

```bash
npm install
```

Lệnh này sẽ cài đặt tất cả các package cần thiết:
- Next.js 14
- React 18
- MongoDB Driver
- SendGrid
- Tailwind CSS
- Framer Motion
- TypeScript

## Bước 3: Setup MongoDB Atlas (Database)

### 3.1. Tạo tài khoản MongoDB Atlas

1. Truy cập: https://www.mongodb.com/cloud/atlas/register
2. Đăng ký tài khoản miễn phí (Free tier)
3. Xác nhận email

### 3.2. Tạo Cluster

1. Sau khi đăng nhập, click **"Create"** để tạo cluster mới
2. Chọn **M0 Sandbox (Free)**
3. Chọn region gần Việt Nam (Singapore hoặc Mumbai)
4. Đặt tên cluster (ví dụ: `invitation-cluster`)
5. Click **"Create Cluster"** và đợi 2-3 phút

### 3.3. Tạo Database User

1. Click **"Database Access"** ở menu bên trái
2. Click **"Add New Database User"**
3. Chọn **"Password"** authentication
4. Đặt username và password (lưu lại để dùng sau)
5. Chọn role: **"Read and write to any database"**
6. Click **"Add User"**

### 3.4. Whitelist IP Address

1. Click **"Network Access"** ở menu bên trái
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ Cho development/testing. Với production, nên restrict IP cụ thể
4. Click **"Confirm"**

### 3.5. Lấy Connection String

1. Click **"Database"** ở menu bên trái
2. Click **"Connect"** trên cluster của bạn
3. Chọn **"Connect your application"**
4. Copy connection string, nó sẽ giống như:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Thay `<username>` và `<password>` bằng thông tin user bạn đã tạo ở bước 3.3

## Bước 4: Setup SendGrid (Email Service)

### 4.1. Tạo tài khoản SendGrid

1. Truy cập: https://signup.sendgrid.com/
2. Đăng ký tài khoản miễn phí (Free plan: 100 emails/day)
3. Xác nhận email

### 4.2. Verify Sender Email

1. Sau khi đăng nhập, truy cập: **Settings > Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Điền thông tin email của bạn (email này sẽ là người gửi)
4. Check email và click link xác nhận
5. ✅ Email của bạn đã được verify

### 4.3. Tạo API Key

1. Truy cập: **Settings > API Keys**
2. Click **"Create API Key"**
3. Đặt tên: `graduation-invitation`
4. Chọn **"Full Access"**
5. Click **"Create & View"**
6. **🔴 QUAN TRỌNG:** Copy API key ngay (chỉ hiển thị 1 lần!)
7. API key sẽ giống như:
   ```
   SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

## Bước 5: Tạo file .env.local

1. Tạo file mới tên `.env.local` trong thư mục gốc `graduationproject`
2. Copy nội dung dưới đây và điền thông tin của bạn:

```env
# MongoDB Atlas Connection (từ Bước 3.5)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/invitation_db?retryWrites=true&w=majority

# SendGrid (từ Bước 4.3)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=your-verified-email@example.com

# Thông tin sự kiện (tùy chỉnh theo ý bạn)
NEXT_PUBLIC_EVENT_NAME=Lễ Tốt Nghiệp Đại Học
NEXT_PUBLIC_EVENT_DATE=2024-12-31
NEXT_PUBLIC_EVENT_TIME=18:00
NEXT_PUBLIC_EVENT_LOCATION=Trung tâm Hội nghị Quốc gia
NEXT_PUBLIC_EVENT_ADDRESS=01 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội

# Mật khẩu trang Admin (đặt mật khẩu bảo mật)
ADMIN_PASSWORD=matkhaubaomat123
```

⚠️ **Lưu ý:**
- File `.env.local` KHÔNG được commit lên Git
- Giữ bí mật các thông tin API key và password
- Thay đổi thông tin sự kiện theo nhu cầu của bạn

## Bước 6: Chạy Project

### Development Mode (Chế độ phát triển)

```bash
npm run dev
```

Sau khi chạy, mở trình duyệt và truy cập:
- 🏠 Trang chính: http://localhost:3000
- 👨‍💼 Trang admin: http://localhost:3000/admin

### Production Build (Chế độ production)

```bash
npm run build
npm start
```

## Bước 7: Test chức năng

### 7.1. Test trang chính

1. Mở http://localhost:3000
2. Kiểm tra:
   - ✅ Hiển thị thông tin sự kiện
   - ✅ Countdown timer chạy
   - ✅ Google Maps hiển thị
   - ✅ Form RSVP hoạt động

### 7.2. Test RSVP

1. Điền form RSVP với thông tin thật
2. Click "Gửi xác nhận"
3. Kiểm tra:
   - ✅ Thông báo thành công
   - ✅ Email xác nhận được gửi đến hộp thư

### 7.3. Test Admin Panel

1. Truy cập http://localhost:3000/admin
2. Nhập mật khẩu từ `ADMIN_PASSWORD`
3. Kiểm tra:
   - ✅ Hiển thị danh sách khách mời
   - ✅ Thống kê chính xác
   - ✅ Export CSV hoạt động

## Bước 8: Deploy lên Vercel (Production)

### 8.1. Tạo tài khoản Vercel

1. Truy cập: https://vercel.com/signup
2. Đăng ký bằng GitHub account

### 8.2. Push code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit: Graduation Invitation"
git branch -M main
git remote add origin https://github.com/your-username/graduation-invitation.git
git push -u origin main
```

### 8.3. Import project vào Vercel

1. Đăng nhập Vercel: https://vercel.com/
2. Click **"Add New Project"**
3. Import repository từ GitHub
4. Chọn project `graduation-invitation`

### 8.4. Thêm Environment Variables

1. Trong phần **"Configure Project"**
2. Mở **"Environment Variables"**
3. Thêm từng biến từ file `.env.local`:
   - `MONGODB_URI`
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL`
   - `NEXT_PUBLIC_EVENT_NAME`
   - `NEXT_PUBLIC_EVENT_DATE`
   - `NEXT_PUBLIC_EVENT_TIME`
   - `NEXT_PUBLIC_EVENT_LOCATION`
   - `NEXT_PUBLIC_EVENT_ADDRESS`
   - `ADMIN_PASSWORD`

4. Click **"Deploy"**

### 8.5. Hoàn tất

Sau 1-2 phút, project của bạn sẽ được deploy!
- URL sẽ giống: `https://your-project.vercel.app`
- Vercel tự động deploy khi bạn push code mới lên GitHub

## 🎉 Hoàn thành!

Bây giờ bạn đã có một trang invitation hoàn chỉnh:

- ✅ Giao diện đẹp, responsive
- ✅ Form RSVP với email tự động
- ✅ Database lưu trữ khách mời
- ✅ Admin panel quản lý
- ✅ Deploy production trên Vercel

## 🆘 Gặp vấn đề?

### Lỗi MongoDB connection
```
MongoServerError: bad auth
```
**Giải pháp:**
- Kiểm tra username/password trong connection string
- Kiểm tra IP whitelist (phải có 0.0.0.0/0)

### Email không gửi được
```
Error: Unauthorized
```
**Giải pháp:**
- Kiểm tra SendGrid API key
- Verify sender email
- Kiểm tra quota (max 100 emails/day cho free plan)

### Port 3000 đã được sử dụng
```
Port 3000 is already in use
```
**Giải pháp:**
```bash
# Kill process trên port 3000 (Windows)
npx kill-port 3000

# Hoặc chạy trên port khác
PORT=3001 npm run dev
```

## 📚 Tài liệu tham khảo

- Next.js: https://nextjs.org/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- SendGrid: https://docs.sendgrid.com/
- Tailwind CSS: https://tailwindcss.com/docs
- Vercel: https://vercel.com/docs

---

**Chúc bạn thành công! 🚀**

