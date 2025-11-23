export interface Guest {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  attending: boolean;
  message?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface GuestInput {
  name: string;
  email: string;
  phone?: string;
  attending: boolean;
  message?: string;
}

export function validateGuest(data: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Tên phải có ít nhất 2 ký tự');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Email không hợp lệ');
  }

  if (typeof data.attending !== 'boolean') {
    errors.push('Vui lòng xác nhận có tham dự hay không');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

