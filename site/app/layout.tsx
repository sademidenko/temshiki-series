import type { Metadata } from 'next';
import './globals.css';
import { description, seriesMeta } from '@/lib/content';

const siteUrl = 'https://sademidenko.github.io/temshiki-series';
const pageTitle = `${seriesMeta.title} — мини-сериал`;

const favicon =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#030b1f"/><rect x="6" y="6" width="52" height="52" fill="none" stroke="#01fff0" stroke-width="3" stroke-dasharray="6 4"/><path d="M18 20h28v8H37v18h-10V28H18z" fill="#fbe953"/></svg>`,
  );

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description,
  icons: { icon: favicon },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: seriesMeta.title,
    url: `${siteUrl}/`,
    title: pageTitle,
    description,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: `${seriesMeta.title}. ${seriesMeta.formula}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description,
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
