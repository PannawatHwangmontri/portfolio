import type { Metadata } from 'next';
import { IBM_Plex_Sans_Thai, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai'],
  variable: '--font-ibm-thai',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pannawat Hwangmontri | Full-Stack Developer Portfolio',
  description:
    'Personal portfolio of Pannawat Hwangmontri. Full-Stack Developer specializing in Next.js, NestJS, Supabase, and GSAP.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      className={`${ibmPlexSansThai.variable} ${ibmPlexSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-sky-100 selection:text-sky-900">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
