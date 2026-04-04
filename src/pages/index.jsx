import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SchemaMarkup from '@/components/SchemaMarkup';
import { useLanguage } from '@/components/LanguageContext';
import { t } from '@/lib/i18n';
import { generateOrganizationSchema } from '@/lib/schema';
import { BRAND_COLORS, KSA_ORG } from '@/lib/constants';
import pilotPages from '@/public/data/pilot-pages.json';

export default function Home() {
  const { language } = useLanguage();
  const organizationSchema = generateOrganizationSchema();

  // Group pilot pages by category
  const pagesByCategory = pilotPages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {});

  return (
    <Layout>
      <Head>
        <title>Silmatervis - Eye Health Education Platform</title>
        <meta
          name="description"
          content="Comprehensive eye health education platform by KSA Vision Clinic. Learn about eye conditions, procedures, and vision care."
        />
        <meta
          name="keywords"
          content="eye health, vision, conditions, procedures, education, KSA"
        />
        <meta property="og:title" content="Silmatervis - Eye Health Education" />
        <meta
          property="og:description"
          content="Comprehensive eye health education platform by KSA Vision Clinic"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://silmatervis.ksa.ee" />
      </Head>

      <SchemaMarkup data={organizationSchema} includeOrganization={false} />

      {/* Hero Section */}
      <section
        className="py-20 px-4 text-center"
        style={{ backgroundColor: `${BRAND_COLORS.primary}15` }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4" style={{ color: BRAND_COLORS.dark }}>
            Silmatervis
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Comprehensive Eye Health Education Platform
          </p>
          <p className="text-gray-600 mb-8">
            Learn about eye conditions, procedures, treatments, and vision care from
            {' '}
            <a
              href="https://ksa.ee"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: BRAND_COLORS.primary }}
            >
              KSA Vision Clinic
            </a>
            , Estonia's leading eye care provider.
          </p>
          <button
            className="px-8 py-3 rounded text-white font-semibold text-lg transition hover:opacity-90"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            <Link href="#categories">
              Explore Topics
            </Link>
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: BRAND_COLORS.dark }}>
            Explore Our Resources
          </h2>

          {Object.entries(pagesByCategory).map(([category, pages]) => (
            <div key={category} className="mb-12">
              <h3
                className="text-2xl font-bold mb-6 capitalize"
                style={{ color: BRAND_COLORS.primary }}
              >
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${page.category}/${page.slug}`}
                    className="group p-6 rounded-lg border transition hover:shadow-lg"
                    style={{ borderColor: BRAND_COLORS.border }}
                  >
                    <h4
                      className="text-lg font-semibold mb-2 group-hover:underline"
                      style={{ color: BRAND_COLORS.primary }}
                    >
                      {page.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">{page.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: BRAND_COLORS.primary }}>
                      Learn More
                      <span>→</span>
                    </div>
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: BRAND_COLORS.border }}>
                      <p className="text-xs text-gray-500">
                        Priority: {page.priority}/10
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 px-4"
        style={{ backgroundColor: `${BRAND_COLORS.primary}10` }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6" style={{ color: BRAND_COLORS.dark }}>
            About Silmatervis
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Silmatervis is a comprehensive eye health education platform created by{' '}
            <strong>KSA Vision Clinic</strong>, Estonia's leading ophthalmology center.
            With over 55,000 procedures performed annually, our team of expert ophthalmologists
            brings clinical excellence to patient education.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This platform features professional educational videos from{' '}
            <strong>Rendia</strong>, integrated with detailed medical information, and
            available in multiple languages including Estonian and Russian for accessibility
            across our diverse patient community.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: `${BRAND_COLORS.primary}15` }}
            >
              <h4
                className="font-bold text-lg mb-2"
                style={{ color: BRAND_COLORS.primary }}
              >
                55,000+
              </h4>
              <p className="text-gray-600">Procedures annually</p>
            </div>
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: `${BRAND_COLORS.primary}15` }}
            >
              <h4
                className="font-bold text-lg mb-2"
                style={{ color: BRAND_COLORS.primary }}
              >
                3 Languages
              </h4>
              <p className="text-gray-600">English, Estonian, Russian</p>
            </div>
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: `${BRAND_COLORS.primary}15` }}
            >
              <h4
                className="font-bold text-lg mb-2"
                style={{ color: BRAND_COLORS.primary }}
              >
                110+ Pages
              </h4>
              <p className="text-gray-600">Comprehensive coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: BRAND_COLORS.dark }}>
            Need Professional Eye Care?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Contact KSA Vision Clinic for comprehensive eye examinations and treatment.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://ksa.ee"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded text-white font-semibold transition hover:opacity-90"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              Visit KSA.ee
            </a>
            <a
              href="tel:+37268800000"
              className="px-8 py-3 rounded border-2 font-semibold transition"
              style={{ borderColor: BRAND_COLORS.primary, color: BRAND_COLORS.primary }}
            >
              Call +372 6 88 0000
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
