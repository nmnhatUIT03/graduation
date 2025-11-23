import nodemailer from 'nodemailer';

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.warn('⚠️ GMAIL_USER và GMAIL_APP_PASSWORD chưa được cấu hình trong .env.local');
  console.warn('📧 Email sẽ không được gửi. Vui lòng xem GMAIL_SETUP.md để cấu hình.');
}

// Tạo transporter với Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface SendEmailParams {
  to: string;
  subject: string;
  name: string;
  attending: boolean;
}

export async function sendConfirmationEmail({
  to,
  subject,
  name,
  attending,
}: SendEmailParams) {
  // Kiểm tra credentials
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('⚠️ Gmail chưa được cấu hình. RSVP vẫn được lưu nhưng email không được gửi.');
    return { 
      success: true, 
      data: { message: 'RSVP saved, but email not configured' } 
    };
  }

  const eventName = process.env.NEXT_PUBLIC_EVENT_NAME || 'Sự Kiện';
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE || 'TBA';
  const eventTime = process.env.NEXT_PUBLIC_EVENT_TIME || 'TBA';
  const eventLocation = process.env.NEXT_PUBLIC_EVENT_LOCATION || 'TBA';
  const eventAddress = process.env.NEXT_PUBLIC_EVENT_ADDRESS || 'TBA';

  const attendingMessage = attending
    ? `
      <p style="color: #059669; font-weight: 600; font-size: 18px;">✓ Bạn đã xác nhận tham dự!</p>
    `
    : `
      <p style="color: #DC2626; font-weight: 600; font-size: 18px;">✗ Bạn đã xác nhận không thể tham dự</p>
      <p style="color: #6B7280;">Chúng tôi rất tiếc vì bạn không thể đến. Hy vọng sẽ gặp bạn vào dịp khác!</p>
    `;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f9fafb;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
                    ${eventName}
                  </h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="background-color: white; padding: 40px;">
                  <h2 style="color: #1f2937; margin-top: 0; font-size: 24px;">Xin chào ${name}!</h2>
                  
                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                    Cảm ơn bạn đã phản hồi lời mời của chúng tôi.
                  </p>
                  
                  ${attendingMessage}
                  
                  ${attending ? `
                  <div style="background: linear-gradient(135deg, #fdf2f8 0%, #fae8ff 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #ec4899;">
                    <h3 style="color: #831843; margin-top: 0; font-size: 18px;">📅 Thông Tin Sự Kiện</h3>
                    <table style="width: 100%; color: #374151;">
                      <tr>
                        <td style="padding: 8px 0;"><strong>🗓 Ngày:</strong></td>
                        <td style="padding: 8px 0;">${eventDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>🕐 Thời gian:</strong></td>
                        <td style="padding: 8px 0;">${eventTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>📍 Địa điểm:</strong></td>
                        <td style="padding: 8px 0;">${eventLocation}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>🗺 Địa chỉ:</strong></td>
                        <td style="padding: 8px 0;">${eventAddress}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <p style="color: #4b5563; font-size: 14px; font-style: italic;">
                    💡 Lưu ý: Vui lòng đến đúng giờ để không bỏ lỡ những khoảnh khắc đáng nhớ!
                  </p>
                  ` : ''}
                  
                  <p style="color: #4b5563; font-size: 16px; margin-top: 24px;">
                    Trân trọng,<br>
                    <strong style="color: #1f2937;">Nguyễn Minh Nhật</strong>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 24px; text-align: center;">
                  <p style="color: #6b7280; font-size: 12px; margin: 0;">
                    Email này được gửi tự động từ ${process.env.GMAIL_USER}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const mailOptions = {
    from: {
      name: eventName,
      address: process.env.GMAIL_USER,
    },
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email đã được gửi đến:', to);
    console.log('📧 Message ID:', info.messageId);
    return { success: true, data: info };
  } catch (error: any) {
    console.error('❌ Lỗi khi gửi email:', error);
    console.error('💡 Kiểm tra GMAIL_USER và GMAIL_APP_PASSWORD trong .env.local');
    console.error('📖 Xem hướng dẫn trong file GMAIL_SETUP.md');
    
    // Vẫn return success để RSVP không bị fail
    return { success: false, error: error.message };
  }
}

