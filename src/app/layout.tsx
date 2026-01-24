import SmartMenu from '@/components/navigation/SmartMenu';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmartMenu />
        {children}
      </body>
    </html>
  );
}