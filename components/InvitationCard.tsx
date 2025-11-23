'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function InvitationCard() {
  const eventName = process.env.NEXT_PUBLIC_EVENT_NAME || "Nhat's graduation";
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE || '2025-11-27';
  const eventTime = process.env.NEXT_PUBLIC_EVENT_TIME || '11:30';
  const eventLocation = process.env.NEXT_PUBLIC_EVENT_LOCATION || 'Sảnh A - Trường Đại học Công nghệ thông tin (ĐHQG-TPHCM)';
  const eventAddress = process.env.NEXT_PUBLIC_EVENT_ADDRESS || 'Khu Phố 6, Linh Trung, Thủ Đức, TP. Hồ Chí Minh';

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  // Function to create Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const startDateTime = new Date(`${eventDate}T${eventTime}`);
    const endDateTime = new Date(startDateTime.getTime() + 3 * 60 * 60 * 1000); // +3 hours
    
    // Format: YYYYMMDDTHHmmssZ
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventName,
      dates: `${formatDate(startDateTime)}/${formatDate(endDateTime)}`,
      details: `Trân trọng kính mời bạn đến tham dự ${eventName}`,
      location: eventAddress || eventLocation,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const eventDateTime = new Date(`${eventDate}T${eventTime}`);
      const now = new Date();
      const difference = eventDateTime.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return null;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate, eventTime]);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-2xl border-4 border-yellow-400 overflow-hidden"
    >
      {/* Decorative Header with Icons */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-400 p-4">
        <div className="flex justify-center gap-4">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-5xl"
          >
            🎓
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            className="text-5xl"
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-5xl"
          >
            🎉
          </motion.span>
        </div>
      </div>

      {/* Main Content Area - Horizontal Layout */}
      <div className="p-6 md:p-10">
        {/* Top Section: Image Left, Info Right - HORIZONTAL */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
          {/* Left: Graduate Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-shrink-0 mx-auto md:mx-0"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl border-4 border-yellow-400 overflow-hidden shadow-2xl">
              <Image
                src="/images/1763910064620frame.jpeg"
                alt="Graduate"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Event Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 flex flex-col justify-center"
          >
            {/* Event Name */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3">
              {eventName}
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-400 mb-4 rounded-full" />

            {/* Welcome Message */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              &quot;Trân trọng mời bạn đến buổi lễ của tớ ❤️&quot;
            </p>
          </motion.div>
        </div>

        {/* Event Details Box - HORIZONTAL Rectangle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-br from-yellow-50 to-blue-50 border-2 border-yellow-400 p-6 md:p-8 rounded-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 text-gray-900">
              <span className="text-4xl flex-shrink-0">📅</span>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Ngày</p>
                <p className="text-lg font-bold leading-tight">
                  {new Date(eventDate).toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-900">
              <span className="text-4xl flex-shrink-0">🕐</span>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Thời gian</p>
                <p className="text-lg font-bold">{eventTime}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-900">
              <span className="text-4xl flex-shrink-0">📍</span>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Địa điểm</p>
                <p className="text-lg font-bold leading-tight">{eventLocation}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Countdown Timer - Horizontal */}
        {timeLeft && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
              Đếm ngược đến sự kiện
            </h3>
            <div className="flex justify-center gap-3 md:gap-6">
              {[
                { value: timeLeft.days, label: 'Ngày' },
                { value: timeLeft.hours, label: 'Giờ' },
                { value: timeLeft.minutes, label: 'Phút' },
                { value: timeLeft.seconds, label: 'Giây' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-gradient-to-br from-yellow-400 to-blue-600 text-white rounded-xl p-4 md:p-6 lg:p-8 shadow-lg border-2 border-yellow-300 min-w-[80px] md:min-w-[100px] lg:min-w-[120px]"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm font-medium mt-2">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Add to Calendar Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mb-8 text-center"
        >
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl">📅</span>
            <span className="text-lg">Thêm vào Google Calendar</span>
          </a>
        </motion.div>

        {/* Decorative Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="border-l-4 border-yellow-400 bg-yellow-50 pl-4 pr-4 py-3 italic text-gray-700 rounded-r-lg"
        >
          &quot;Sự hiện diện của bạn là món quà tuyệt vời nhất của tui :3&quot;
        </motion.div>
      </div>
    </motion.div>
  );
}
