import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import RendiaVideo from '@/components/RendiaVideo';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateMedicalConditionSchema, generateOrganizationSchema, combineSchemas } = '@/lib/schema';
import { BRAND_COLORS } from '@/lib/constants';
import pilotPages from '@/public/data/pilot-pages.json';

export default function ConditionPage({ page, relatedVideos }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (!page) {
    return <Layout><div>Page not found</div></Layout>;
  }

  const medicalSchema = generateMedicalConditionSchema(page);
  const orgSchema = generateOrganizationSchema();
  const combinedSchemas = combineSchemas([medicalSchema, orgSchema]);

  return (
    <Layout>
      <Head>
        <title>{page.title} - Silmatervis</title>
        <meta
          name="description"
          content={page.description || `Learn about ${page.title} from KSA Vision Clinic`}
        />
        <meta name="keywords" content={`${page.title}, eye health, vision, KSA`} />
        <meta property="og:title" content={`${page.title} - Silmatervis`} />
        <meta property="og:description" content={page.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://silmatervis.ksa.ee/conditions/${page.slug}`} />
        <meta name="article:published_time" content={new Date().toISOString()} />
        <meta name="article:author" content="KSA Vision Clinic" />
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
              Condition
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
            Video Overview
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
          {/* Symptoms */}
          {page.symptoms && page.symptoms.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: BRAND_COLORS.dark }}
              >
                Symptoms
              </h2>
              <ul className="space-y-3">
                {page.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: BRAND_COLORS.primary }}
                    />
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Causes */}
          {page.causes && page.causes.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: BRAND_COLORS.dark }}
              >
                Causes
              </h2>
              <ul className="space-y-3">
                {page.causes.map((cause, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: BRAND_COLORS.primary }}
                    />
                    <span className="text-gray-700">{cause}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Treatments */}
          {page.treatments && page.treatments.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: BRAND_COLORS.dark }}
              >
                Treatments
              </h2>
              <ul className="space-y-3">
                {page.treatments.map((treatment, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: BRAND_COLORS.primary }}
                    />
                    <span className="text-gray-700">{treatment}</span>
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
              Need Professional Evaluation?
            </h3>
            <p className="text-gray-700 mb-6">
              If you're experiencing symptoms or have concerns about your eye health,
              schedule an appointment with KSA Vision Clinic for a comprehensive examination.
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
      {relatedVideos && relatedVideos.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: BRAND_COLORS.dark }}
            >
              Related Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedVideos.map((related) => (
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
    (p) => p.slug === params.slug && p.category === 'conditions'
  );

  if (!page) {
    return { notFound: true };
  }

  // Get related pages (same category, different pages)
  const relatedVideos = pilotPages
    .filter((p) => p.category === page.category && p.slug !== page.slug)
    .slice(0, 4);

  return {
    props: { page, relatedVideos },
    revalidate: 3600, // ISR: revalidate every hour
  };
}

export async function getStaticPaths() {
  const paths = pilotPages
    .filter((p) => p.category === 'conditions')
    .map((page) => ({
      params: { slug: page.slug },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
}
