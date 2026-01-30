import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Scripts from '@/components/Scripts';

export const metadata: Metadata = {
  title: 'High Speed Broadband Internet Connection Service in Bogura - Net Point BD',
  description: 'Are you looking for a reliable Internet Connection provider in Bogura? Net Point BD will be your best ISP in Bogura.',
  keywords: 'wifi internet, isp in Bogura, superfast internet, fiber internet, broadband internet, bogura isp, bogura internet provider',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/x-icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/img/logo/favicon.png`} />

        {/* CSS Links */}
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/bootstrap.min.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/owl.theme.default.min.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/owl.carousel.min.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/animate.min.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/boxicons.min.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/magnific-popup.min.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/flaticon.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/meanmenu.min.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/nice-select.min.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/odometer.min.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/style.css`} />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/css/responsive.css`} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
