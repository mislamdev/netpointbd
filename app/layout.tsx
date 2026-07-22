import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Scripts from '@/components/Scripts';
import NotificationBanner from '@/components/NotificationBanner';
import { readJSON } from '@/lib/db';
import type { SettingsFile } from '@/lib/types';

export const metadata: Metadata = {
  title: 'High Speed Broadband Internet Connection Service in Bogura - Net Point BD',
  description: 'Are you looking for a reliable Internet Connection provider in Bogura? Net Point BD will be your best ISP in Bogura.',
  keywords: 'wifi internet, isp in Bogura, superfast internet, fiber internet, broadband internet, bogura isp, bogura internet provider',
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await readJSON<SettingsFile>('settings');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/x-icon" href={`${basePath}/assets/img/logo/favicon.png`} />

        {/* CSS Links */}
        <link rel="stylesheet" href={`${basePath}/assets/css/bootstrap.min.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/owl.theme.default.min.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/owl.carousel.min.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/animate.min.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/boxicons.min.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/magnific-popup.min.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/flaticon.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/meanmenu.min.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/nice-select.min.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/odometer.min.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/style.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/emergency-notice.css`} />
        <link rel="stylesheet" href={`${basePath}/assets/css/responsive.css`} />
        <title>NetPoint BD</title>
      </head>
      <body>
        <NotificationBanner value={settings.notification} />
        <Header contact={settings.contact} home={settings.home} />
        {children}
        <Footer blurb={settings.footer.companyBlurb} contact={settings.contact} />
        <Scripts />
      </body>
    </html>
  );
}
