'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play sau khi user tương tác với trang (browser requirement)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current) {
          audioRef.current.play().catch(() => {
            // Autoplay bị chặn, user sẽ cần click button
            console.log('Autoplay prevented, user needs to click play button');
          });
          setIsPlaying(true);
        }
      }
    };

    // Listen cho bất kỳ interaction nào
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        src="/music/Như Ngày Hôm Qua.mp3"
      />

      {/* Floating music button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5, type: 'spring' }}
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-yellow-400 to-blue-500 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
      >
        {isPlaying ? (
          // Pause icon
          <svg 
            className="w-6 h-6" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          // Play icon
          <svg 
            className="w-6 h-6 ml-1" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
        
        {/* Tooltip */}
        <span className="absolute bottom-full mb-2 right-0 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          {isPlaying ? '⏸ Tạm dừng' : '▶️ Phát nhạc'}
        </span>

        {/* Sound wave animation khi đang play */}
        {isPlaying && (
          <>
            <motion.div 
              className="absolute -inset-2 border-2 border-yellow-400 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -inset-1 border-2 border-blue-400 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
          </>
        )}
      </motion.button>

      {/* Hint message - chỉ hiện nếu chưa interact */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="fixed bottom-24 right-6 z-40 bg-white border-2 border-yellow-400 px-4 py-2 rounded-lg shadow-lg text-sm text-gray-800 max-w-xs"
        >
          <p className="font-medium">🎵 Click anywhere để bật nhạc nền</p>
        </motion.div>
      )}
    </>
  );
}

