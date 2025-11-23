# ⚡ QUICKSTART - Bắt đầu nhanh trong 5 phút

## 📋 Checklist trước khi bắt đầu

- [ ] Đã cài Node.js (v18+)
- [ ] Có tài khoản MongoDB Atlas (miễn phí)
- [ ] Có tài khoản SendGrid (miễn phí)

## 🚀 Các bước thực hiện

### 1️⃣ Cài đặt Node.js (nếu chưa có)

**Windows:**
```
Tải từ: https://nodejs.org/
Chọn phiên bản LTS → Cài đặt
```

**Kiểm tra:**
```bash
node --version
npm --version
```

### 2️⃣ Cài dependencies

```bash
cd graduationproject
npm install
```

⏱️ Thời gian: ~2 phút

### 3️⃣ Setup MongoDB Atlas (Database)

1. **Đăng ký:** https://www.mongodb.com/cloud/atlas/register
2. **Tạo Cluster:** Free tier (M0 Sandbox)
3. **Tạo User:** Database Access → Add New Database User
4. **Whitelist IP:** Network Access → Allow Access from Anywhere
5. **Lấy Connection String:** Database → Connect → Connect your application

```
mongodb+srv://username:password@cluster.xxxxx.mongodb.net/invitation_db
```

### 4️⃣ Setup SendGrid (Email)

1. **Đăng ký:** https://signup.sendgrid.com/
2. **Verify Email:** Settings → Sender Authentication → Verify a Single Sender
3. **Tạo API Key:** Settings → API Keys → Create API Key (Full Access)

```
SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5️⃣ Tạo file .env.local

Tạo file `.env.local` trong thư mục gốc với nội dung:

```env
# MongoDB (từ bước 3)
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/invitation_db

# SendGrid (từ bước 4)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=your-verified-email@example.com

# Thông tin sự kiện
NEXT_PUBLIC_EVENT_NAME=Lễ Tốt Nghiệp
NEXT_PUBLIC_EVENT_DATE=2024-12-31
NEXT_PUBLIC_EVENT_TIME=18:00
NEXT_PUBLIC_EVENT_LOCATION=Trung tâm Hội nghị
NEXT_PUBLIC_EVENT_ADDRESS=Hà Nội, Việt Nam

# Mật khẩu admin
ADMIN_PASSWORD=admin123
```

### 6️⃣ Chạy project

```bash
npm run dev
```

Mở trình duyệt:
- 🏠 Trang chính: http://localhost:3000
- 👨‍💼 Admin: http://localhost:3000/admin

## ✅ Test thử

1. Điền form RSVP trên trang chính
2. Check email → Nhận email xác nhận
3. Vào /admin → Xem danh sách khách mời

## 🚀 Deploy lên Vercel (Production)

```bash
# 1. Push code lên GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/your-repo.git
git push -u origin main

# 2. Deploy trên Vercel
# - Truy cập: https://vercel.com
# - Import project từ GitHub
# - Thêm Environment Variables từ .env.local
# - Deploy!
```

## 🆘 Gặp lỗi?

### Lỗi: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: "Port 3000 already in use"
```bash
npx kill-port 3000
npm run dev
```

### Email không gửi được
- Kiểm tra SendGrid API key
- Verify sender email
- Check quota (max 100 emails/day free plan)

### MongoDB connection error
- Kiểm tra connection string
- Kiểm tra IP whitelist (0.0.0.0/0)
- Kiểm tra username/password

## 📚 Đọc thêm

- Chi tiết đầy đủ: `SETUP_GUIDE.md`
- Tài liệu kỹ thuật: `README.md`

---

**Thời gian hoàn thành: ~10-15 phút**

**Chúc bạn thành công! 🎓✨**

