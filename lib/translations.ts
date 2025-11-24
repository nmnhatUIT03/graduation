export type Language = 'vi' | 'en' | 'ja';

export interface Translations {
  // Common
  eventName: string;
  
  // Invitation Card
  welcomeMessage: string;
  quote: string;
  date: string;
  time: string;
  location: string;
  address: string;
  addToCalendar: string;
  countdownTitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  
  // Map Section
  mapTitle: string;
  
  // RSVP Form
  rsvpTitle: string;
  attending: string;
  attendingYes: string;
  attendingNo: string;
  name: string;
  nameOptional: string;
  email: string;
  phone: string;
  phoneOptional: string;
  message: string;
  submit: string;
  submitting: string;
  
  // Success/Error Messages
  thankYou: string;
  thankYouAttending: string;
  emailSent: string;
  thankYouNotAttending: string;
  wishYouWell: string;
  yourMessage: string;
  
  // Validation Messages
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneInvalid: string;
  
  // Contact Section
  contactTitle: string;
  phoneLabel: string;
  contactMessage: string;
  
  // Footer
  footerMessage: string;
  footerCopyright: string;
  adminPanel: string;
  
  // Music
  pauseMusic: string;
  playMusic: string;
  clickToPlay: string;
}

export const translations: Record<Language, Translations> = {
  vi: {
    // Common
    eventName: "Nhat's graduation",
    
    // Invitation Card
    welcomeMessage: "Trân trọng kính mời bạn đến tham dự",
    quote: "Sự hiện diện của bạn là món quà tuyệt vời nhất của tui :3",
    date: "Ngày",
    time: "Thời gian",
    location: "Địa điểm",
    address: "Địa chỉ",
    addToCalendar: "Thêm vào Google Calendar",
    countdownTitle: "Đếm ngược đến sự kiện",
    days: "Ngày",
    hours: "Giờ",
    minutes: "Phút",
    seconds: "Giây",
    
    // Map Section
    mapTitle: "📍 Địa Điểm",
    
    // RSVP Form
    rsvpTitle: "Xác Nhận Tham Dự",
    attending: "Bạn có thể tham dự không?",
    attendingYes: "✓ Có, tôi sẽ tham dự",
    attendingNo: "✗ Không, tôi không thể đến",
    name: "Họ và tên",
    nameOptional: "Họ và tên (nếu muốn)",
    email: "Email",
    phone: "Số điện thoại",
    phoneOptional: "Số điện thoại (nếu có)",
    message: "Lời nhắn gửi",
    submit: "Gửi xác nhận",
    submitting: "Đang gửi...",
    
    // Success/Error Messages
    thankYou: "Cảm ơn bạn!",
    thankYouAttending: "Chúng tôi đã nhận được xác nhận tham dự của bạn. Email xác nhận đã được gửi!",
    emailSent: "Email xác nhận đã được gửi!",
    thankYouNotAttending: "Cảm ơn bạn rất nhiều!",
    wishYouWell: "Mong bạn có thật nhiều sức khỏe và hạnh phúc",
    yourMessage: "Lời nhắn của bạn:",
    
    // Validation Messages
    nameRequired: "Vui lòng nhập tên của bạn",
    emailRequired: "Vui lòng nhập email",
    emailInvalid: "Email không hợp lệ",
    phoneInvalid: "Số điện thoại phải có 10-11 chữ số",
    
    // Contact Section
    contactTitle: "Thông Tin Liên Hệ",
    phoneLabel: "Số điện thoại",
    contactMessage: "Hãy liên lạc với tớ nếu có khó khăn nào nhé!",
    
    // Footer
    footerMessage: "Rất mong được gặp bạn ngày hôm ấy! 💖",
    footerCopyright: "© 2025 Graduation Invitation. All rights reserved.",
    adminPanel: "Admin Panel",
    
    // Music
    pauseMusic: "⏸ Tạm dừng",
    playMusic: "▶️ Phát nhạc",
    clickToPlay: "🎵 Click anywhere để bật nhạc nền",
  },
  
  en: {
    // Common
    eventName: "Nhat's graduation",
    
    // Invitation Card
    welcomeMessage: "You are cordially invited to attend",
    quote: "Your presence is the best gift I could ask for :3",
    date: "Date",
    time: "Time",
    location: "Venue",
    address: "Address",
    addToCalendar: "Add to Google Calendar",
    countdownTitle: "Countdown to Event",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    
    // Map Section
    mapTitle: "📍 Location",
    
    // RSVP Form
    rsvpTitle: "RSVP",
    attending: "Will you be attending?",
    attendingYes: "✓ Yes, I will attend",
    attendingNo: "✗ No, I cannot attend",
    name: "Full Name",
    nameOptional: "Full Name (optional)",
    email: "Email",
    phone: "Phone Number",
    phoneOptional: "Phone Number (optional)",
    message: "Message",
    submit: "Submit",
    submitting: "Submitting...",
    
    // Success/Error Messages
    thankYou: "Thank you!",
    thankYouAttending: "We have received your RSVP. A confirmation email has been sent!",
    emailSent: "Confirmation email sent!",
    thankYouNotAttending: "Thank you so much!",
    wishYouWell: "Wishing you all the best and good health",
    yourMessage: "Your message:",
    
    // Validation Messages
    nameRequired: "Please enter your name",
    emailRequired: "Please enter your email",
    emailInvalid: "Invalid email address",
    phoneInvalid: "Phone number must be 10-11 digits",
    
    // Contact Section
    contactTitle: "Contact Information",
    phoneLabel: "Phone Number",
    contactMessage: "Please contact me if you have any questions!",
    
    // Footer
    footerMessage: "Looking forward to seeing you there! 💖",
    footerCopyright: "© 2025 Graduation Invitation. All rights reserved.",
    adminPanel: "Admin Panel",
    
    // Music
    pauseMusic: "⏸ Pause",
    playMusic: "▶️ Play Music",
    clickToPlay: "🎵 Click anywhere to play background music",
  },
  
  ja: {
    // Common
    eventName: "ニャットの卒業式",
    
    // Invitation Card
    welcomeMessage: "ご出席いただきたく、謹んでご案内申し上げます",
    quote: "あなたの出席は私にとって最高の贈り物です :3",
    date: "日付",
    time: "時間",
    location: "会場",
    address: "住所",
    addToCalendar: "Googleカレンダーに追加",
    countdownTitle: "イベントまでのカウントダウン",
    days: "日",
    hours: "時間",
    minutes: "分",
    seconds: "秒",
    
    // Map Section
    mapTitle: "📍 場所",
    
    // RSVP Form
    rsvpTitle: "出欠確認",
    attending: "ご出席いただけますか？",
    attendingYes: "✓ はい、出席します",
    attendingNo: "✗ いいえ、欠席します",
    name: "お名前",
    nameOptional: "お名前（任意）",
    email: "メールアドレス",
    phone: "電話番号",
    phoneOptional: "電話番号（任意）",
    message: "メッセージ",
    submit: "送信",
    submitting: "送信中...",
    
    // Success/Error Messages
    thankYou: "ありがとうございます！",
    thankYouAttending: "出席のご連絡を承りました。確認メールをお送りしました！",
    emailSent: "確認メールを送信しました！",
    thankYouNotAttending: "ご連絡ありがとうございます！",
    wishYouWell: "ご健康とご多幸をお祈りいたします",
    yourMessage: "メッセージ：",
    
    // Validation Messages
    nameRequired: "お名前を入力してください",
    emailRequired: "メールアドレスを入力してください",
    emailInvalid: "有効なメールアドレスを入力してください",
    phoneInvalid: "電話番号は10〜11桁で入力してください",
    
    // Contact Section
    contactTitle: "連絡先",
    phoneLabel: "電話番号",
    contactMessage: "ご不明な点がございましたら、お気軽にご連絡ください！",
    
    // Footer
    footerMessage: "お会いできることを楽しみにしています！💖",
    footerCopyright: "© 2025 Graduation Invitation. All rights reserved.",
    adminPanel: "管理パネル",
    
    // Music
    pauseMusic: "⏸ 一時停止",
    playMusic: "▶️ 音楽を再生",
    clickToPlay: "🎵 クリックしてバックグラウンドミュージックを再生",
  },
};

