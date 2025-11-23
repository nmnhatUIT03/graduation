import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Kiểm tra authentication đơn giản
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập' },
        { status: 401 }
      );
    }

    // Lấy danh sách guests
    const guestsCollection = await getCollection('guests');
    const guests = await guestsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Tính thống kê
    const stats = {
      total: guests.length,
      attending: guests.filter((g) => g.attending).length,
      notAttending: guests.filter((g) => !g.attending).length,
      totalPeople: guests
        .filter((g) => g.attending)
        .reduce((sum, g) => sum + (g.numberOfGuests || 1), 0),
    };

    return NextResponse.json({
      success: true,
      guests,
      stats,
    });
  } catch (error: any) {
    console.error('Lỗi GET Guests:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE một guest (optional)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    const email = searchParams.get('email');

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập' },
        { status: 401 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email không được cung cấp' },
        { status: 400 }
      );
    }

    const guestsCollection = await getCollection('guests');
    const result = await guestsCollection.deleteOne({ email });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy guest' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Đã xóa guest thành công',
    });
  } catch (error: any) {
    console.error('Lỗi DELETE Guest:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi', error: error.message },
      { status: 500 }
    );
  }
}

