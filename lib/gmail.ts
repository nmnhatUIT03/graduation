import nodemailer from 'nodemailer';
import { translations, type Language } from './translations';

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
  name: string;
  attending: boolean;
  language?: Language;
}

export async function sendConfirmationEmail({
  to,
  name,
  attending,
  language = 'vi',
}: SendEmailParams) {
  // Kiểm tra credentials
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('⚠️ Gmail chưa được cấu hình. RSVP vẫn được lưu nhưng email không được gửi.');
    return { 
      success: true, 
      data: { message: 'RSVP saved, but email not configured' } 
    };
  }

  // Get translations for the selected language
  const t = translations[language];
  
  const eventName = t.eventName;
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE || 'TBA';
  const eventTime = process.env.NEXT_PUBLIC_EVENT_TIME || 'TBA';
  const eventLocation = process.env.NEXT_PUBLIC_EVENT_LOCATION || 'TBA';
  const eventAddress = process.env.NEXT_PUBLIC_EVENT_ADDRESS || 'TBA';
  
  // Create Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const startDateTime = new Date(`${eventDate}T${eventTime}`);
    const endDateTime = new Date(startDateTime.getTime() + 3 * 60 * 60 * 1000); // +3 hours
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventName,
      dates: `${formatDate(startDateTime)}/${formatDate(endDateTime)}`,
      details: `${t.welcomeMessage} ${eventName}`,
      location: eventAddress || eventLocation,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };
  
  const calendarUrl = getGoogleCalendarUrl();
  const subject = attending 
    ? `${t.emailSubjectAttending}${eventName}`
    : `${t.emailSubjectNotAttending}${eventName}`;

  const attendingMessage = attending
    ? `
      <p style="color: #059669; font-weight: 600; font-size: 18px;">${t.emailConfirmedAttending}</p>
    `
    : `
      <p style="color: #DC2626; font-weight: 600; font-size: 18px;">${t.emailConfirmedNotAttending}</p>
      <p style="color: #6B7280;">${t.emailSorryMessage}</p>
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
                  <h2 style="color: #1f2937; margin-top: 0; font-size: 24px;">${t.emailGreeting} ${name}!</h2>
                  
                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                    ${t.emailThankYou}
                  </p>
                  
                  ${attendingMessage}
                  
                  ${attending ? `
                  <div style="background: linear-gradient(135deg, #fdf2f8 0%, #fae8ff 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #ec4899;">
                    <h3 style="color: #831843; margin-top: 0; font-size: 18px;">${t.emailEventInfo}</h3>
                    <table style="width: 100%; color: #374151;">
                      <tr>
                        <td style="padding: 8px 0;"><strong>${t.emailDateLabel}</strong></td>
                        <td style="padding: 8px 0;">${eventDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>${t.emailTimeLabel}</strong></td>
                        <td style="padding: 8px 0;">${eventTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>${t.emailLocationLabel}</strong></td>
                        <td style="padding: 8px 0;">${eventLocation}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>${t.emailAddressLabel}</strong></td>
                        <td style="padding: 8px 0;">${eventAddress}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <!-- Google Calendar Button -->
                  <div style="text-align: center; margin: 24px 0;">
                    <a href="${calendarUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">
                      ${t.emailAddToCalendar}
                    </a>
                  </div>
                  
                  <p style="color: #4b5563; font-size: 14px; font-style: italic;">
                    ${t.emailNote}
                  </p>
                  ` : ''}
                  
                  <p style="color: #4b5563; font-size: 16px; margin-top: 24px;">
                    ${t.emailRegards},<br>
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

