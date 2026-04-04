import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import RendiaVideo from '@/components/RendiaVideo';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateMedicalConditionSchema, generateOrganizationSchema, combineSchemas } from '@/lib/schema';
import { BRAND_COLORS } from '@/lib/constants';
import pilotPages from '@/public/data/pilot-pages.json';

export default function AnatomyPage({ page, relatedPages }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (!page) {
    return <Layout><div>Page not found</div></Layout>;
  }

  const schema = generateMedicalConditionSchema(page);
  const orgSchema = generateOrganizationSchema();
  const combinedSchemas = combineSchemas([schema, orgSchema]);

  return (
    <Layout>
      <Head>
        <title>{page.title} - Silmatervis</title>
        <meta
          name="description"
          content={page.description || `Learn about ${page.title} from KSA Vision Clinic`}
        />
        <meta name="keywords" content={`${page.title}, eye anatomy, vision, KSA`} />
        <meta property="og:title" content={`${page.title} - Silmatervis`} />
        <meta property="og:description" content={page.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://silmatervis.ksa.ee/anatomy/${page.slug}`} />
      </Head>

      <SchemaMarkup data={combinedSchemas} includeOrganization={false} />

      {/* Hero Section */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: `${BRAND_COLORS.primary}10` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              Anatomy
            </span>
          </div>
          <h1
            className="text-5xl font-bold mb-4"
            style={{ color: BRAND_COLORS.dark }}
          >
            {page.title}
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            {page.description}
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="mb-12">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: BRAND_COLORS.dark }}
          >
            Visual Guide
          </h2>
          <div className="rounded-lg overflow-hidden" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <RendiaVideo
              id={page.videoId}
              title={page.title}
              lazy={true}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {page.symptoms && page.symptoms.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: BRAND_COLORS.dark }}
              >
                Structure & Components
              </h2>
              <ul className="space-y-3">
                {page.symptoms.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: BRAND_COLORS.primary }}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {page.causes && page.causes.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: BRAND_COLORS.dark }}
              >
                Functions & Physiology
              </h2>
              <ul className="space-y-3">
                {page.causes.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: BRAND_COLORS.primary }}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {page.treatments && page.treatments.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: BRAND_COLORS.dark }}
              >
                Key Points
              </h2>
              <ul className="space-y-3">
                {page.treatments.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: BRAND_COLORS.primary }}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div
            className="p-8 rounded-lg mt-12"
            style={{ backgroundColor: `${BRAND_COLORS.primary}10` }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: BRAND_COLORS.dark }}
            >
              Learn More About Eye Health
            </h3>
            <p className="text-gray-700 mb-6">
              Understanding eye anatomy is the first step to protecting your vision.
              Our experts are here to answer any questions about eye health.
            </p>
            <a
              href="https://ksa.ee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded text-white font-semibold transition hover:opacity-90"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              Contact KSA Vision Clinic
            </a>
          </div>
        </div>
      </section>

      {/* Related Topics */}
      {relatedPages && relatedPages.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: BRAND_COLORS.dark }}
            >
              Related Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPages.map((related) => (
                <a
                  key={related.slug}
                  href={`/${related.category}/${related.slug}`}
                  className="p-4 rounded-lg border transition hover:shadow-md"
                  style={{ borderColor: BRAND_COLORS.border }}
                >
                  <h4
                    className="font-semibold hover:underline"
                    style={{ color: BRAND_COLORS.primary }}
                  >
                    {related.title}
                  </h4>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const page = pilotPages.find(
    (p) => p.slug === params.slug && p.category === 'anatomy'
  );

  if (!page) {
    return { notFound: true };
  }

  const relatedPages = pilotPages
    .filter((p) => p.slug !== page.slug)
    .slice(0, 4);

  return {
    props: { page, relatedPages },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const paths = pilotPages
    .filter((p) => p.category === 'anatomy')
    .map((page) => ({
      params: { slug: page.slug },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
}
