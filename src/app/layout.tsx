import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import '@/styles/globals.scss';
import '@/styles/rs-custom.globals.scss';
import { Provider } from '@/app/Provider';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

const METADATA = {
  title: 'Dev Toolkit',
  description: 'Web utility tools for developers',
  author: 'su-u',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // テーマのチラつきを抑えるために指定
  const className = 'rs-theme-dark';

  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
        <title>{METADATA.title}</title>
        <meta name="description" content={METADATA.description} />
        <meta name="author" content={METADATA.author} />
        <meta
          name="google-site-verification"
          content="XbfQBUU8iwwFG0-q5UtR_Rde1UfvDzdspEHt2tPs-Uw"
        />
      </head>
      <body className={className}>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
