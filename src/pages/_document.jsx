import { Html, Head, Main, NextScript } from 'next/document';
import { GTM_ID } from '@/lib/constants';

/**
 * Document shell.
 * NOTE on lang: we keep this simple (lang="en") to avoid runtime
 * getInitialProps which Vercel was deploying as middleware and crashing
 * (MIDDLEWARE_INVOCATION_FAILED 2026-05-26).
 *
 * Per-language semantics are handled inside <GuideLayout> via the
 * lang prop on a wrapper <div lang="...">, which screen readers and
 * our CSS [lang="ru"] / [lang="en"] cascades respect correctly.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTM_ID}');
            `,
          }}
        />
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="preload"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
