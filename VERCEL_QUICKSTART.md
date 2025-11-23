# ⚡ Vercel Deploy - Quick Start

## 🚀 5 Bước Deploy Nhanh

### 1️⃣ Push Code Lên GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/graduation-invitation.git
git push -u origin main
```

### 2️⃣ Import Vào Vercel
- Truy cập: https://vercel.com/new
- Chọn repo `graduation-invitation`
- Click **Import**

### 3️⃣ Thêm Environment Variables

**Required Variables:**

```env
# Event Info (Public)
NEXT_PUBLIC_EVENT_NAME=Nhat's graduation
NEXT_PUBLIC_EVENT_DATE=2025-11-27
NEXT_PUBLIC_EVENT_TIME=11:30
NEXT_PUBLIC_EVENT_LOCATION=Sảnh A - Trường Đại học Công nghệ thông tin (ĐHQG-TPHCM)
NEXT_PUBLIC_EVENT_ADDRESS=Khu Phố 6, Linh Trung, Thủ Đức, TP. Hồ Chí Minh

# MongoDB (Private)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/graduation?retryWrites=true&w=majority

# Gmail (Private)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

> ⚠️ **Quan trọng:** Chọn **Production, Preview, and Development** cho tất cả biến!

### 4️⃣ Deploy
Click **Deploy** và đợi 2-3 phút!

### 5️⃣ Test Website
```
✅ https://your-project.vercel.app
```

---

## 🐛 Fix Lỗi Nhanh

### Email không gửi được?
1. Kiểm tra `GMAIL_USER` và `GMAIL_APP_PASSWORD`
2. Xem file `GMAIL_SETUP.md`

### MongoDB không kết nối?
1. Vào MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (Allow all)

### Form submit lỗi 400?
1. Xem Vercel Logs: Deployments → Runtime Logs
2. Kiểm tra MongoDB connection
3. Test với email hợp lệ

---

## 🔄 Update Code
```bash
git add .
git commit -m "Update"
git push
```
→ Vercel tự động deploy lại!

---

## 📖 Xem Hướng Dẫn Chi Tiết
→ File `VERCEL_DEPLOYMENT.md`

Good luck! 🎉

