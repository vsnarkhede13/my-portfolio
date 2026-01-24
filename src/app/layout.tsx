import { Metadata } from 'next';
import Script from 'next/script';
import './globals.css'; // Ensure your Tailwind styles are imported
import SmartMenu from '@/components/navigation/SmartMenu';
import Footer from '@/components/sections/Footer';
import { Analytics } from "@vercel/analytics/next";

// 1. Your existing Metadata
export const metadata: Metadata = {
  title: {
    default: 'Vishal | Developer, Creator & Storyteller',
    template: '%s | Vishal'
  },
  description: 'Full-stack developer sharing insights on tech, design, and personal growth. Based in India.',
  keywords: ['Vishal Portfolio', 'Fullstack Developer', 'India Tech Blog'],
  authors: [{ name: 'Vishal' }],
  openGraph: {
    title: 'Vishal | Developer & Creator',
    description: 'Explore my projects, read my blog, and book a meeting.',
    url: 'https://yourdomain.com',
    siteName: 'Vishal Portfolio',
    images: [{ url: 'https://yourdomain.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishal | Developer & Creator',
    description: 'Building products with purpose and code.',
    creator: '@yourhandle',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
};

// 2. The Root Layout function (The "Upsert" part)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const G_ID = "G-KYY5YW8GJT"; // REPLACE THIS with your actual ID from Google

  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${G_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${G_ID}');
          `}
        </Script>
      </head>
      <body className="antialiased selection:bg-blue-100" suppressHydrationWarning={true}>
        <SmartMenu />
        <main>{children}</main>
        <Footer />
        
        {/* Vercel Analytics (Optional but recommended) */}
        <Analytics />
      </body>
    </html>
  );
}