'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'vi', label: 'VN', flag: '🇻🇳' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ja', label: 'JP', flag: '🇯🇵' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-6 right-6 z-50 flex gap-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2 border-2 border-yellow-300"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            px-3 py-2 rounded-full font-medium transition-all duration-300
            flex items-center gap-1.5
            ${
              language === lang.code
                ? 'bg-gradient-to-r from-yellow-400 to-blue-500 text-white shadow-md scale-110'
                : 'text-gray-700 hover:bg-gray-100'
            }
          `}
          aria-label={`Switch to ${lang.label}`}
        >
          <span className="text-lg">{lang.flag}</span>
          <span className="text-sm font-bold">{lang.label}</span>
        </button>
      ))}
    </motion.div>
  );
}

