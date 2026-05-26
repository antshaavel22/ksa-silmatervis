import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GTM_ID } from '@/lib/constants';

// Per-route language overrides for the refraktiivkirurgia guide family.
// Anything else falls through to the default "en" used for the EN
// silmatervis platform pages.
function getLangFromPath(pathname) {
  if (!pathname) return 'en';
  if (pathname.startsWith('/refraktiivkirurgia')) {
    if (pathname.endsWith('-ru')) return 'ru';
    if (pathname.endsWith('-en')) return 'en';
    return 'et'; // ET is the default for /refraktiivkirurgia* unless suffixed
  }
  return 'en';
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, lang: getLangFromPath(ctx.pathname) };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
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
}

export default MyDocument;
