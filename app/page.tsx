'use client';

import { motion } from 'framer-motion';
import InvitationCard from '@/components/InvitationCard';
import RSVPForm from '@/components/RSVPForm';
import Link from 'next/link';

export default function Home() {
  const eventAddress = process.env.NEXT_PUBLIC_EVENT_ADDRESS || 'TBA';

  return (
    <main className="min-h-screen py-12 px-4 relative bg-white">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delay-2" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delay-4" />
      </div>

      {/* Main Content - Wider Container */}
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Invitation Card */}
        <InvitationCard />

        {/* Map Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-yellow-400 p-6"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 text-center">
            📍 Địa Điểm
          </h2>
          <p className="text-center text-gray-700 mb-6">{eventAddress}</p>
          
          {/* Google Maps Embed */}
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Bản đồ địa điểm sự kiện - UIT"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4544555933583!2d106.79829149999999!3d10.8700089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAtIMSQSFFHIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.section>

        {/* RSVP Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <RSVPForm />
        </motion.section>

        {/* Contact Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 md:p-10"
        >
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6">
              Thông Tin Liên Hệ
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                <a
                  href="tel:0346029426"
                  className="text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  0346 029 426
                </a>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Hãy liên lạc với tớ nếu có khó khăn nào nhé!
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center mt-16 pb-8"
      >
        <p className="text-gray-700 mb-2 font-medium">
          Rất mong được gặp bạn ngày hôm ấy! 💖
        </p>
        <p className="text-sm text-gray-600">
          © 2025 Graduation Invitation. All rights reserved.
        </p>
        <Link 
          href="/admin" 
          className="inline-block mt-4 text-xs text-gray-500 hover:text-yellow-600 transition-colors"
        >
          Admin Panel
        </Link>
      </motion.footer>
    </main>
  );
}

