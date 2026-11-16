import './globals.css';

export const metadata = {
  title: '¡Hola Amigos! ספרדית לילדים',
  description: 'לימוד ספרדית לילדים ישראלים בספרד',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Hola Amigos', statusBarStyle: 'default' },
  icons: { icon: '/icons/icon-192.png', apple: '/apple-touch-icon.png' },
};

export const viewport = {
  width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: false,
  themeColor: '#ffb400', viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
