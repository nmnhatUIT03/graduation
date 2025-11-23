import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lời Mời Tốt Nghiệp - Graduation Invitation',
  description: 'Trân trọng kính mời bạn đến tham dự lễ tốt nghiệp của chúng tôi',
  keywords: ['lời mời', 'tốt nghiệp', 'graduation', 'invitation'],
  authors: [{ name: 'Graduation Team' }],
  openGraph: {
    title: 'Lời Mời Tốt Nghiệp',
    description: 'Trân trọng kính mời bạn đến tham dự lễ tốt nghiệp của chúng tôi',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <div className="min-h-screen">
          {children}
        </div>
        
        {/* Background decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
        </div>
      </body>
    </html>
  );
}

