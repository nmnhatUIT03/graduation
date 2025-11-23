# 📧 HƯỚNG DẪN SETUP GMAIL SMTP

## ✅ ĐÃ CÀI ĐẶT

Project đã được cấu hình để sử dụng **Gmail SMTP** thay vì Resend!

**Đã làm:**
- ✅ Cài đặt `nodemailer` và `@types/nodemailer`
- ✅ Tạo file `lib/gmail.ts` với Gmail SMTP configuration
- ✅ Update `app/api/rsvp/route.ts` để dùng Gmail
- ✅ Xóa dependencies Resend cũ

---

## 🚀 BẠN CẦN LÀM (3 BƯỚC)

### **Bước 1: Bật 2-Step Verification (5 phút)**

Gmail yêu cầu bật xác thực 2 bước trước khi tạo App Password.

1. **Truy cập:** https://myaccount.google.com/security
2. Tìm **"2-Step Verification"** (Xác minh 2 bước)
3. Click **"Get Started"** (Bắt đầu)
4. Làm theo hướng dẫn:
   - Nhập số điện thoại
   - Nhận mã xác thực
   - Xác nhận
5. ✅ Hoàn tất!

---

### **Bước 2: Tạo App Password (2 phút)**

**⚠️ QUAN TRỌNG:** Dùng App Password, KHÔNG phải password Gmail thường!

#### **Cách 1: Link trực tiếp (Nhanh nhất)**
1. Truy cập: **https://myaccount.google.com/apppasswords**
2. Đăng nhập Gmail của bạn
3. Select app: **"Mail"**
4. Select device: **"Other"** 
5. Đặt tên: `Graduation Invitation`
6. Click **"Generate"** (Tạo)
7. **Copy password** (dạng: `xxxx xxxx xxxx xxxx`)
8. ⚠️ **LƯU LẠI NGAY** - Chỉ hiển thị 1 lần!

#### **Cách 2: Từ Settings**
1. Vào: https://myaccount.google.com/security
2. Tìm **"App passwords"** (Mật khẩu ứng dụng)
3. Click vào đó
4. Làm theo bước 3-8 ở trên

**Bạn sẽ có password dạng:**
```
abcd efgh ijkl mnop
```

---

### **Bước 3: Cấu hình `.env.local` (1 phút)**

1. **Tạo file `.env.local`** trong thư mục `D:\graduationproject`

2. **Thêm nội dung sau:**

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/invitation_db

# Gmail SMTP
GMAIL_USER=21521226@gm.uit.edu.vn
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

# Thông tin sự kiện
NEXT_PUBLIC_EVENT_NAME=Lễ Tốt Nghiệp
NEXT_PUBLIC_EVENT_DATE=2024-12-31
NEXT_PUBLIC_EVENT_TIME=18:00
NEXT_PUBLIC_EVENT_LOCATION=Trung tâm Hội nghị Quốc gia
NEXT_PUBLIC_EVENT_ADDRESS=Hà Nội, Việt Nam

# Admin password
ADMIN_PASSWORD=admin123
```

3. **Thay thế các giá trị:**
   - `GMAIL_USER`: Email Gmail của bạn (`21521226@gm.uit.edu.vn`)
   - `GMAIL_APP_PASSWORD`: App Password vừa tạo ở Bước 2
   - `MONGODB_URI`: Connection string từ MongoDB Atlas
   - Các thông tin sự kiện của bạn

4. **Lưu file**

---

## 🧪 TEST THỬ

### **Chạy development server:**

```bash
npm run dev
```

### **Test RSVP:**

1. Mở http://localhost:3000
2. Điền form RSVP với:
   - Tên: Bất kỳ
   - Email: **Email thật của bạn hoặc bạn bè**
   - Chọn: "Có, tôi sẽ tham dự"
   - Số người: 2
3. Click **"Gửi xác nhận"**
4. ✅ Thông báo thành công
5. 📧 **Check email** → Nhận được email xác nhận đẹp!

### **Kiểm tra console:**

Nếu thành công, bạn sẽ thấy:
```
✅ Email đã được gửi đến: friend@gmail.com
📧 Message ID: <xxxxxx@gmail.com>
```

Nếu lỗi:
```
❌ Lỗi khi gửi email: Invalid login
💡 Kiểm tra GMAIL_USER và GMAIL_APP_PASSWORD trong .env.local
```

---

## 📊 EMAIL SẼ HIỂN THỊ

```
┌─────────────────────────────────────────┐
│ From: Lễ Tốt Nghiệp                    │
│       <21521226@gm.uit.edu.vn>         │
│                                         │
│ To: friend@gmail.com                    │
│                                         │
│ Subject: Xác nhận tham dự - Lễ Tốt     │
│          Nghiệp                         │
│                                         │
│ [Email HTML đẹp với gradient, thông     │
│  tin sự kiện đầy đủ]                   │
└─────────────────────────────────────────┘
```

**Ưu điểm:**
- ✅ Email từ **Gmail THẬT** của bạn
- ✅ Khi guest reply → Về Gmail của bạn
- ✅ Professional, đáng tin cậy
- ✅ Không cần domain, API key

---

## ⚠️ LƯU Ý QUAN TRỌNG

### **1. App Password vs Password thường**

```
❌ SAI - Dùng password Gmail:
GMAIL_APP_PASSWORD=MyPassword123

✅ ĐÚNG - Dùng App Password:
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

### **2. Giới hạn Gmail**

Gmail có giới hạn:
- **500 emails/ngày** cho Gmail cá nhân
- **2000 emails/ngày** cho Google Workspace

→ Quá đủ cho vài chục người!

### **3. Tránh Spam**

- ✅ Gửi từ từ (không gửi hàng trăm email cùng lúc)
- ✅ Gửi đến email thật (không gửi test liên tục)
- ✅ Nội dung email có ý nghĩa (đã có sẵn trong code)

### **4. Security**

- ⚠️ **KHÔNG commit** file `.env.local` lên Git
- ⚠️ **KHÔNG share** App Password với ai
- ✅ File `.env.local` đã có trong `.gitignore`

---

## 🆘 TROUBLESHOOTING

### **Lỗi: "Invalid login"**

**Nguyên nhân:** Sai email hoặc App Password

**Giải pháp:**
1. Kiểm tra `GMAIL_USER` đúng email chưa
2. Kiểm tra `GMAIL_APP_PASSWORD` có đầy đủ 16 ký tự không
3. Thử tạo lại App Password

### **Lỗi: "Less secure app access"**

**Giải pháp:** 
- KHÔNG CẦN bật "Less secure apps"
- Chỉ cần App Password là đủ
- Nếu vẫn lỗi → Tạo lại App Password

### **Email không đến**

**Kiểm tra:**
1. ✅ Spam folder
2. ✅ Console log có message ID không
3. ✅ Gmail của bạn có bị block không (check Gmail Sent)

### **Lỗi: "Connection timeout"**

**Nguyên nhân:** Firewall/Antivirus block port 587/465

**Giải pháp:**
- Tắt tạm firewall/antivirus
- Hoặc allow Node.js trong firewall

---

## 📝 CHECKLIST

- [ ] Bật 2-Step Verification trên Gmail
- [ ] Tạo App Password (16 ký tự)
- [ ] Tạo file `.env.local`
- [ ] Thêm `GMAIL_USER` và `GMAIL_APP_PASSWORD`
- [ ] Chạy `npm run dev`
- [ ] Test RSVP với email thật
- [ ] Check email nhận được
- [ ] ✅ Hoàn thành!

---

## 🎯 TÓM TẮT

**Đã có sẵn:**
- ✅ Code đã được cấu hình xong
- ✅ Package đã cài đặt
- ✅ Email template đẹp

**Bạn chỉ cần:**
1. Tạo App Password từ Gmail (2 phút)
2. Điền vào `.env.local` (1 phút)
3. Test thử (1 phút)

**Tổng thời gian:** ~5 phút

---

## 💡 FAQ

**Q: Tôi có thể dùng email domain khác (@outlook, @yahoo) không?**

A: Có! Nhưng cần đổi config trong `lib/gmail.ts`:
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.outlook.com', // hoặc smtp.mail.yahoo.com
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

**Q: App Password có hết hạn không?**

A: Không! App Password không hết hạn trừ khi bạn xóa hoặc đổi password Gmail.

**Q: Có an toàn không?**

A: Rất an toàn! App Password chỉ dùng cho app này, không truy cập được toàn bộ Gmail.

**Q: Nếu quên App Password?**

A: Tạo lại App Password mới, cập nhật vào `.env.local`

---

**Chúc bạn thành công! Có câu hỏi cứ hỏi nhé! 😊**

📧 Email bây giờ sẽ gửi từ Gmail THẬT của bạn!

