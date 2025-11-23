'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    phone: '',
    attending: true,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return 'Thiếu họ và tên kìaa';
    }
    if (name.trim().length < 2) {
      return 'Tên gì có 2 chữ vậy fen';
    }
    if (name.trim().length > 100) {
      return 'Tên dài dữ bây';
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Nhập mail ik tí có bất ngờ';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email không hợp lệ (VD: example@gmail.com)';
    }
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (phone && phone.trim()) {
      // Chỉ validate nếu user đã nhập
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return 'Số điện thoại phải có 10-11 chữ số';
      }
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
    };

    setValidationErrors(errors);
    
    // Check if any errors exist
    return !Object.values(errors).some(error => error !== undefined);
  };

  const handleFieldBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    
    // Validate specific field
    let fieldError: string | undefined;
    if (field === 'name') {
      fieldError = validateName(formData.name);
    } else if (field === 'email') {
      fieldError = validateEmail(formData.email);
    } else if (field === 'phone') {
      fieldError = validatePhone(formData.phone);
    }

    setValidationErrors({
      ...validationErrors,
      [field]: fieldError,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Nếu chọn "Không tham dự", hiển thị lời cảm ơn (kèm tên nếu có)
    if (!formData.attending) {
      setSubmitted(true);
      // Reset form sau 6 giây
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          attending: true,
          message: '',
        });
        setSubmitted(false);
      }, 6000);
      return;
    }

    // Validate form (chỉ khi chọn "Có tham dự")
    if (!validateForm()) {
      setError('Vui lòng kiểm tra lại thông tin đã nhập');
      // Mark all fields as touched to show errors
      setTouched({
        name: true,
        email: true,
        phone: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        // Reset form sau 6 giây
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            attending: true,
            message: '',
          });
          setSubmitted(false);
        }, 6000);
      } else {
        setError(data.errors?.join(', ') || data.message || 'Đã xảy ra lỗi');
      }
    } catch (err) {
      setError('Không thể kết nối đến server. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    if (!formData.attending) {
      // Message đặc biệt cho người không tham dự
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl shadow-xl border-4 border-pink-300 p-8 md:p-12 text-center"
        >
          <div className="text-7xl mb-6">❤️</div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {formData.name ? `Cảm ơn ${formData.name} rất nhiều!` : 'Cảm ơn bạn rất nhiều!'}
          </h3>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-4">
            Mong bạn có thật nhiều sức khỏe và hạnh phúc
          </p>
          {formData.message && (
            <div className="mt-6 p-4 bg-white/50 rounded-lg border-2 border-pink-200">
              <p className="text-sm text-gray-600 mb-1">Lời nhắn của bạn:</p>
              <p className="text-gray-800 italic">&quot;{formData.message}&quot;</p>
            </div>
          )}
        </motion.div>
      );
    }

    // Message cho người tham dự
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl border-4 border-yellow-400 p-8 text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Cảm ơn bạn!
        </h3>
        <p className="text-gray-700">
          Chúng tôi đã nhận được xác nhận tham dự của bạn. Email xác nhận đã được gửi!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl border-4 border-blue-400 p-8 space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Xác Nhận Tham Dự
        </h3>
        <p className="text-gray-700">
          {formData.attending 
            ? 'Vui lòng điền thông tin của bạn bên dưới'
            : 'Cảm ơn bạn đã phản hồi'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Có tham dự không - ĐẦU TIÊN */}
      <div className="bg-gradient-to-r from-yellow-50 to-blue-50 border-2 border-yellow-400 p-6 rounded-lg">
        <label className="block text-gray-900 font-semibold mb-3">
          Bạn có thể tham dự không? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="attending"
              checked={formData.attending === true}
              onChange={() => setFormData({ ...formData, attending: true })}
              className="mr-2 w-5 h-5 text-yellow-500 focus:ring-yellow-500"
            />
            <span className="text-lg text-gray-900">✓ Có, tôi sẽ tham dự</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="attending"
              checked={formData.attending === false}
              onChange={() =>
                setFormData({ ...formData, attending: false })
              }
              className="mr-2 w-5 h-5 text-gray-500 focus:ring-gray-500"
            />
            <span className="text-lg text-gray-900">✗ Không, tôi không thể đến</span>
          </label>
        </div>
      </div>

      {/* Form fields */}
      {/* Họ và tên - LUÔN HIỆN */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Họ và tên {formData.attending && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          className={`input-elegant ${
            touched.name && validationErrors.name
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : ''
          }`}
          placeholder="Nguyễn Văn A"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (touched.name) {
              setValidationErrors({
                ...validationErrors,
                name: validateName(e.target.value),
              });
            }
          }}
          onBlur={() => handleFieldBlur('name')}
        />
        {touched.name && validationErrors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <span>⚠️</span>
            {validationErrors.name}
          </motion.p>
        )}
        {touched.name && !validationErrors.name && formData.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500 text-sm mt-1 flex items-center gap-1"
          >
            <span>✓</span>
            Hợp lệ
          </motion.p>
        )}
      </div>

      {/* Email và Phone - CHỈ HIỆN KHI CHỌN "CÓ" */}
      {formData.attending && (
        <>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          className={`input-elegant ${
            touched.email && validationErrors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : ''
          }`}
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (touched.email) {
              setValidationErrors({
                ...validationErrors,
                email: validateEmail(e.target.value),
              });
            }
          }}
          onBlur={() => handleFieldBlur('email')}
        />
        {touched.email && validationErrors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <span>⚠️</span>
            {validationErrors.email}
          </motion.p>
        )}
        {touched.email && !validationErrors.email && formData.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500 text-sm mt-1 flex items-center gap-1"
          >
            <span>✓</span>
            Email hợp lệ
          </motion.p>
        )}
      </div>

      {/* Số điện thoại */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Số điện thoại <span className="text-gray-400 text-sm">(Tùy chọn)</span>
        </label>
        <input
          type="tel"
          className={`input-elegant ${
            touched.phone && validationErrors.phone
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : ''
          }`}
          placeholder="0123456789"
          value={formData.phone}
          onChange={(e) => {
            // Only allow numbers
            const value = e.target.value.replace(/[^0-9]/g, '');
            setFormData({ ...formData, phone: value });
            if (touched.phone) {
              setValidationErrors({
                ...validationErrors,
                phone: validatePhone(value),
              });
            }
          }}
          onBlur={() => handleFieldBlur('phone')}
          maxLength={11}
        />
        {touched.phone && validationErrors.phone && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <span>⚠️</span>
            {validationErrors.phone}
          </motion.p>
        )}
        {touched.phone && !validationErrors.phone && formData.phone && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500 text-sm mt-1 flex items-center gap-1"
          >
            <span>✓</span>
            Hợp lệ
          </motion.p>
        )}
      </div>
        </>
      )}

      {/* Lời nhắn - LUÔN HIỆN */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Lời nhắn gửi
        </label>
        <textarea
          className="input-elegant min-h-[100px] resize-none"
          placeholder={formData.attending 
            ? "Gửi lời chúc hoặc lời nhắn của bạn..." 
            : "Để lại lời nhắn của bạn nếu muốn..."}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Đang gửi...
          </span>
        ) : (
          'Gửi xác nhận'
        )}
      </button>
    </motion.form>
  );
}

