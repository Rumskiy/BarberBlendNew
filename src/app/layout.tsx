// app/layout.tsx
import {Inter} from 'next/font/google';
import Script from 'next/script';
import type {Metadata} from 'next';
import {Providers} from "@/app/providers";
import {getAllCategory} from "@/lib/api/category";
import {MainLayout} from '@/components/MainLayout/MainLayout';

// Поліпшення: Оптимізоване завантаження шрифту через next/font
const inter = Inter({subsets: ['latin', 'cyrillic']});

// Поліпшення: Централізоване керування мета-тегами для SEO
export const metadata: Metadata = {
    title: 'BARBER BLEND - Твій домашній догляд із вайбом барбершопу',
    description: 'Твій домашній догляд із вайбом барбершопу',
    verification: {
        // Верифікація для Facebook
        other: {
            'facebook-domain-verification': 'v1jbezxsz8s9n9jpf0kqg4a0t04606',
        },
    },
};

const categories = await getAllCategory();

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uk">
        <head>
            {/* Скрипти GTM та TikTok краще завантажувати тут,
            бо вони мають бути в <head> згідно з документацією */}
            <Script id="google-tag-manager" strategy="afterInteractive">
                {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PPTN429M');
          `}
            </Script>
            <Script id="tiktok-pixel" strategy="afterInteractive">
                {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq.load('D127QJJC77UCOE1UCOMG'),ttq.page()}(window,document,'ttq');
          `}
            </Script>
            <title>BARBER BLEND - Твій домашній догляд із вайбом барбершопу</title>
        </head>
        <body className={inter.className}>
        {/* GTM noscript */}
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-PPTN429M"
                height="0"
                width="0"
                style={{display: 'none', visibility: 'hidden'}}
            ></iframe>
        </noscript>

        <Providers>
            {/* Передаємо категорії в компонент-обгортку */}
            <MainLayout categories={categories}>
                {children}
            </MainLayout>
        </Providers>

        <div id="modal-root"></div>

        {/* Facebook Pixel краще завантажувати в кінці body */}
        <Script id="facebook-pixel" strategy="lazyOnload">
            {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '562548883084675');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
            <img
                height="1"
                width="1"
                style={{display: 'none'}}
                src="https://www.facebook.com/tr?id=562548883084675&ev=PageView&noscript=1"
            />
        </noscript>
        </body>
        </html>
    );
}