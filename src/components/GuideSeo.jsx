import Head from 'next/head';

/**
 * Search and AI-assistant metadata for the refractive-surgery consumer guide:
 * language alternates (so Google shows the right language and treats the three
 * as one guide) and structured data (who wrote it, who publishes it, and the
 * FAQ in a form Google and assistants can quote directly).
 */
const BASE = 'https://silmatervis.ksa.ee';
const PATHS = {
  intro: { et: '/refraktiivkirurgia-juhend', ru: '/refraktiivkirurgia-juhend-ru', en: '/refraktiivkirurgia-juhend-en' },
  full: {
    et: '/refraktiivkirurgia-tarbijajuhend',
    ru: '/refraktiivkirurgia-tarbijajuhend-ru',
    en: '/refraktiivkirurgia-tarbijajuhend-en',
  },
};

const AUTHOR = {
  '@type': 'Person',
  name: 'Dr. Ants Haavel',
  jobTitle: { et: 'Silmakirurg', ru: 'Офтальмохирург', en: 'Ophthalmic surgeon' },
  worksFor: { '@type': 'MedicalClinic', name: 'KSA Silmakeskus', url: 'https://ksa.ee/' },
};

export default function GuideSeo({ variant = 'intro', lang = 'et', title, description, faq = [], datePublished = '2026-05-26' }) {
  const paths = PATHS[variant];
  const url = BASE + paths[lang];
  const graph = [
    {
      '@type': 'MedicalWebPage',
      '@id': `${url}#page`,
      url,
      name: title,
      description,
      inLanguage: lang,
      datePublished,
      audience: { '@type': 'PeopleAudience', healthCondition: { '@type': 'MedicalCondition', name: 'Myopia' } },
      about: { '@type': 'MedicalProcedure', name: 'Laser vision correction (refractive surgery)' },
      author: { ...AUTHOR, jobTitle: AUTHOR.jobTitle[lang] },
      publisher: { '@type': 'MedicalClinic', name: 'KSA Silmakeskus', url: 'https://ksa.ee/', foundingDate: '2005' },
    },
  ];
  if (faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: lang,
      mainEntity: faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }
  return (
    <Head>
      {['et', 'ru', 'en'].map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={BASE + paths[l]} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={BASE + paths.et} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
      />
    </Head>
  );
}
