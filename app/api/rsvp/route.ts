import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { validateGuest, type GuestInput } from '@/models/Guest';
import { sendConfirmationEmail } from '@/lib/gmail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language, ...guestData }: { language?: string } & GuestInput = body;

    // Validate dữ liệu
    const validation = validateGuest(guestData);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Kết nối MongoDB
    const guestsCollection = await getCollection('guests');

    // Kiểm tra email đã tồn tại chưa
    const existingGuest = await guestsCollection.findOne({ email: guestData.email });
    
    if (existingGuest) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email này đã được sử dụng để đăng ký rồi.',
        },
        { status: 400 }
      );
    }

    // Tạo guest mới
    const newGuest = {
      ...guestData,
      createdAt: new Date(),
    };

    // Lưu vào database
    const result = await guestsCollection.insertOne(newGuest);

    // Gửi email xác nhận (không chờ để response nhanh hơn)
    sendConfirmationEmail({
      to: guestData.email,
      name: guestData.name,
      attending: guestData.attending,
      language: (language as 'vi' | 'en' | 'ja') || 'vi',
    }).catch((error) => {
      console.error('Lỗi gửi email:', error);
      // Không throw error để không làm crash request
    });

    return NextResponse.json(
      {
        success: true,
        message: guestData.attending
          ? 'Cảm ơn bạn đã xác nhận tham dự! Email xác nhận đã được gửi.'
          : 'Cảm ơn bạn đã phản hồi. Rất tiếc vì bạn không thể tham dự.',
        guestId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Lỗi API RSVP:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// GET để kiểm tra trạng thái
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email không được cung cấp' },
        { status: 400 }
      );
    }

    const guestsCollection = await getCollection('guests');
    const guest = await guestsCollection.findOne({ email });

    if (!guest) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy thông tin' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      guest: {
        name: guest.name,
        email: guest.email,
        attending: guest.attending,
        createdAt: guest.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Lỗi GET RSVP:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi', error: error.message },
      { status: 500 }
    );
  }
}

