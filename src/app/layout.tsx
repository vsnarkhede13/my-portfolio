import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
// import ThemeToggle from '@/components/ThemeToggle';  // COMMENT THIS OUT
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vishal | Developer & Creator',
  description: 'Portfolio of Vishal - Developer, Creator & Storyteller',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-200`}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          {/* <ThemeToggle /> */}  {/* COMMENT THIS OUT */}
        </ThemeProvider>
      </body>
    </html>
  );
}