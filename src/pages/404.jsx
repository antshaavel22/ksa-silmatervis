import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { BRAND_COLORS } from '@/lib/constants';

export default function NotFound() {
  return (
    <Layout>
      <Head>
        <title>Page Not Found - Silmatervis</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="py-20 px-4 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1
            className="text-7xl font-bold mb-4"
            style={{ color: BRAND_COLORS.primary }}
          >
            404
          </h1>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: BRAND_COLORS.dark }}
          >
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-block px-8 py-3 rounded text-white font-semibold transition hover:opacity-90"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            Return Home
          </Link>
        </div>
      </section>
    </Layout>
  );
}
