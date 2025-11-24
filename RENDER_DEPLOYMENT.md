# 🚀 Hướng Dẫn Deploy Next.js lên Render

## Tại sao chọn Render?

✅ **Hỗ trợ Gmail SMTP đầy đủ** - không bị giới hạn như Vercel
✅ **Free tier** - 750 giờ/tháng (đủ cho project nhỏ)
✅ **Auto deploy** - tự động deploy khi push code
✅ **Dễ dàng quản lý Environment Variables**

## Bước 1: Chuẩn bị MongoDB Atlas

### Whitelist IP cho Render

1. Truy cập [MongoDB Atlas](https://cloud.mongodb.com)
2. Vào **Network Access** (menu bên trái)
3. Click **"Add IP Address"**
4. Chọn **"Allow Access from Anywhere"**
   - IP: `0.0.0.0/0`
   - Description: `Render deployment`
5. Click **"Confirm"**

> ⚠️ **Lưu ý:** Render sử dụng dynamic IP nên phải allow từ mọi IP. Đây là cách duy nhất để Render kết nối được MongoDB Atlas.

## Bước 2: Tạo tài khoản Render

1. Truy cập [render.com](https://render.com)
2. Click **"Get Started"**
3. Đăng nhập bằng **GitHub**
4. Authorize Render truy cập GitHub

## Bước 3: Deploy Web Service

### 3.1. Tạo Web Service mới

1. Từ Dashboard, click **"New +"** → **"Web Service"**
2. Connect repository: `nmnhatUIT03/graduation`
3. Click **"Connect"**

### 3.2. Cấu hình Service

Render sẽ tự detect file `render.yaml` và hiển thị:

- **Name:** `graduation-invitation`
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

### 3.3. Thêm Environment Variables

Click vào tab **"Environment"**, thêm các biến sau:

#### MongoDB
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/graduation?retryWrites=true&w=majority
```

#### Gmail SMTP
```
GMAIL_USER=21521226@gm.uit.edu.vn
GMAIL_APP_PASSWORD=your_16_char_app_password
```

> 💡 **Lấy Gmail App Password:**
> 1. Truy cập [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> 2. Chọn "Mail" và "Other (Custom name)"
> 3. Nhập tên: "Graduation Invitation"
> 4. Click "Generate"
> 5. Copy 16 ký tự (có khoảng trắng: `abcd efgh ijkl mnop`)

#### Event Info (Optional - đã có trong render.yaml)
```
NEXT_PUBLIC_EVENT_NAME=Nhat's graduation
NEXT_PUBLIC_EVENT_DATE=2025-11-27
NEXT_PUBLIC_EVENT_TIME=11:30
NEXT_PUBLIC_EVENT_LOCATION=Sảnh A - Trường Đại học Công nghệ thông tin (ĐHQG-TPHCM)
NEXT_PUBLIC_EVENT_ADDRESS=Khu Phố 6, Linh Trung, Thủ Đức, TP. Hồ Chí Minh
```

### 3.4. Deploy

1. Click **"Create Web Service"**
2. Đợi 5-10 phút để build (lần đầu sẽ lâu)
3. URL sẽ là: `https://graduation-invitation.onrender.com`

## Bước 4: Kiểm tra Deployment

### 4.1. Xem Logs

1. Vào Dashboard → Service → **"Logs"**
2. Kiểm tra:
   ```
   ✅ Build completed successfully
   ✅ Starting service...
   ✅ Server listening on port 3000
   ```

### 4.2. Test Website

1. Truy cập URL: `https://graduation-invitation.onrender.com`
2. Điền form RSVP với email của bạn
3. Kiểm tra inbox/spam → Email sẽ được gửi! ✅

### 4.3. Test Email Sending

Từ Logs, bạn sẽ thấy:
```
✅ Email đã được gửi đến: test@example.com
📧 Message ID: <...>
```

## Bước 5: Auto Deploy (Optional)

Render tự động deploy khi bạn push code lên GitHub:

```bash
# Thay đổi code
git add .
git commit -m "Update feature"
git push

# Render sẽ tự động:
# 1. Detect push event
# 2. Pull code mới
# 3. Run build command
# 4. Deploy phiên bản mới
```

## Troubleshooting

### ❌ Lỗi: "Unable to connect to MongoDB"

**Nguyên nhân:** IP chưa được whitelist

**Giải pháp:**
1. MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0`

### ❌ Lỗi: "Email not sent"

**Nguyên nhân:** Gmail credentials sai

**Giải pháp:**
1. Kiểm tra `GMAIL_USER` và `GMAIL_APP_PASSWORD`
2. Đảm bảo App Password có 16 ký tự
3. Kiểm tra 2-Step Verification đã bật

### ❌ Lỗi: "Build failed"

**Nguyên nhân:** Dependencies hoặc TypeScript errors

**Giải pháp:**
1. Xem chi tiết trong Logs
2. Test local: `npm run build`
3. Fix errors và push lại

### ⚠️ Service sleep sau 15 phút

**Nguyên nhân:** Free tier của Render

**Giải pháp:**
- **Option 1:** Upgrade lên Paid ($7/tháng) - không bao giờ sleep
- **Option 2:** Chấp nhận - request đầu tiên sẽ mất ~30s để wake up
- **Option 3:** (Không khuyến khích) Dùng cron job ping mỗi 10 phút

## So sánh với Vercel

| Feature | Vercel | Render |
|---------|--------|--------|
| **Build Speed** | ⚡ 1-2 phút | 🐢 5-10 phút |
| **SMTP Support** | ❌ Bị chặn | ✅ Đầy đủ |
| **Gmail SMTP** | ❌ Không hoạt động | ✅ Hoạt động tốt |
| **Cold Start** | ⚡ Không có | 🐢 ~30s (free tier) |
| **Free Tier** | ✅ Unlimited | ✅ 750h/tháng |
| **Custom Domain** | ✅ Free | ✅ Free |

## Custom Domain (Optional)

1. Render Dashboard → Service → **"Settings"**
2. Scroll xuống **"Custom Domain"**
3. Click **"Add Custom Domain"**
4. Nhập domain: `invitation.yourdomain.com`
5. Thêm CNAME record vào DNS provider:
   ```
   Type: CNAME
   Name: invitation
   Value: graduation-invitation.onrender.com
   ```
6. Đợi DNS propagate (~5-60 phút)

## Kết luận

🎉 **Render + Gmail SMTP = Perfect combo cho project này!**

- ✅ Email hoạt động hoàn hảo
- ✅ Free tier đủ dùng
- ✅ Dễ setup và maintain
- ⚠️ Trade-off: Build chậm hơn Vercel, có cold start

---

**Hỗ trợ thêm:**
- [Render Documentation](https://render.com/docs)
- [Next.js on Render](https://render.com/docs/deploy-nextjs-app)
- [MongoDB Atlas Network Access](https://www.mongodb.com/docs/atlas/security/ip-access-list/)

