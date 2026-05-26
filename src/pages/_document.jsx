import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GTM_ID } from '@/lib/constants';

// Routes that serve Estonian-only content. Anything matching these prefixes
// gets <html lang="et"> instead of the default "en" used for the EN/RU
// silmatervis platform pages.
const ET_ROUTE_PREFIXES = ['/refraktiivkirurgia'];

function getLangFromPath(pathname) {
  if (!pathname) return 'en';
  return ET_ROUTE_PREFIXES.some((p) => pathname.startsWith(p)) ? 'et' : 'en';
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
