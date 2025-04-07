import type { ResolvingMetadata } from 'next';
import { Inter } from 'next/font/google';
import { dir } from 'i18next';
import { LocaleType, availableLocales } from '@/i18n/settings';

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
// import AdSense from '@/components/shared/ads';
import './globals.css';

/* import Script from 'next/script'; */
import { getDefaultMetaData } from '@/lib/seo';
import { ThemeProvider } from 'next-themes';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
const AppSidebar = lazy(() => import('@/components/layout/sidebar/app-sidebar'));

export type SharedPageProps = {
  params: { locale: LocaleType };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

type LocaleRouteLayout = SharedPageProps & {
  children: React.ReactNode;
};

const pageKey = 'layout';
export default function RootLayout(props: LocaleRouteLayout) {
  const { params, children } = props;
  return (
    <html lang={params.locale} dir={dir(params.locale)} className="scroll-smooth">
      <head>
        {/* <meta name="google-adsense-account" content="ca-pub-9880416599476522"></meta> */}

        {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KCYH24DV1Q"></Script> */}
        {/*  <Script
        src={`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KCYH24DV1Q');`}
      ></Script> */}
        {/*  <Script
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9880416599476522"
          crossOrigin="anonymous"
        /> */}
      </head>
      <body className={`${inter.variable} scroll-smooth`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <Suspense fallback={<>Loading...</>}>
                <AppSidebar />
              </Suspense>
              {/* <AdSense /> */}
              {/* <CollapsibleNavbar /> */}
              <Suspense fallback={<LoadingSpinner />}>
                <main className="flex-1 overflow-auto">
                  <SidebarTrigger />
                  {children}
                </main>
              </Suspense>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  // generates default paths for each locale domain/locale1, domain/locale2, etc.
  return availableLocales.map((lng) => ({ lng }));
}

export async function generateMetadata({ params }: SharedPageProps, parent: ResolvingMetadata) {
  return getDefaultMetaData(params.locale, parent, pageKey);
}
