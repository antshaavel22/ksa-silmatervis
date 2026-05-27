import Link from 'next/link';
import Head from 'next/head';

/**
 * GuideLayout — minimal document chrome for long-form editorial pages.
 *
 * Deliberately strips the regular Silmatervis nav/footer to make the
 * page feel like a publication, not a website.
 *
 * Pass `lang` ("et" | "ru" | "en") to render localised chrome strings
 * and lang attribute. LP back-link adjusts to language version.
 */

const STRINGS = {
  et: {
    backToLP: '← Juhendi avaleht',
    backToLPHref: '/refraktiivkirurgia-juhend',
    authorRole: 'asutaja ja meditsiinijuht, KSA Silmakeskus',
    authorName: 'Dr. Ants Haavel',
    publishedPrefix: 'Avaldatud',
    publishedSuffix: '• KSA Silmakeskus, Tallinn ja Tartu',
    bookingLabel: 'Broneeri Flow3 uuring',
  },
  ru: {
    backToLP: '← На главную руководства',
    backToLPHref: '/refraktiivkirurgia-juhend-ru',
    authorRole: 'основатель и медицинский руководитель, KSA Silmakeskus',
    authorName: 'д-р Антс Хаавель',
    publishedPrefix: 'Опубликовано',
    publishedSuffix: '• KSA Silmakeskus, Таллинн и Тарту',
    bookingLabel: 'Записаться на обследование перед Flow3',
  },
  en: {
    backToLP: '← Guide landing page',
    backToLPHref: '/refraktiivkirurgia-juhend-en',
    authorRole: 'founder and medical director, KSA Silmakeskus',
    authorName: 'Dr. Ants Haavel',
    publishedPrefix: 'Published',
    publishedSuffix: '• KSA Silmakeskus, Tallinn and Tartu',
    bookingLabel: 'Book a Flow3 suitability evaluation',
  },
};

export default function GuideLayout({ children, publicationDate = '2026-05-26', lang = 'et', showBackLink = true }) {
  const t = STRINGS[lang] || STRINGS.et;

  return (
    <div lang={lang} className="min-h-screen bg-white text-[#1a1a1a] flex flex-col">
      <Head>
        <meta name="theme-color" content="#ffffff" />
      </Head>

      {/* Minimal header */}
      <header className="border-b border-[#e8e4dc]">
        <div className="max-w-[920px] mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="https://ksa.ee"
            className="text-sm font-medium tracking-wide text-[#1a1a1a] hover:text-[#5a8518] transition no-underline"
          >
            KSA Silmakeskus
          </Link>
          {showBackLink && (
            <Link
              href={t.backToLPHref}
              className="text-sm text-[#6f7f80] hover:text-[#1a1a1a] transition no-underline"
            >
              {t.backToLP}
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Minimal document footer */}
      <footer className="border-t border-[#e8e4dc] mt-24">
        <div className="max-w-[720px] mx-auto px-6 py-12 text-center">
          <p className="font-serif italic text-[#1a1a1a] text-lg mb-1">
            {t.authorName}
          </p>
          <p className="text-sm text-[#6f7f80] mb-6">
            {t.authorRole}
          </p>
          <p className="text-xs text-[#92a0a1] uppercase tracking-widest">
            {t.publishedPrefix} {publicationDate} {t.publishedSuffix}
          </p>
          <div className="mt-8 flex justify-center gap-6 text-sm">
            <Link
              href="https://ksa.ee"
              className="text-[#6f7f80] hover:text-[#1a1a1a] no-underline"
            >
              ksa.ee
            </Link>
            <Link
              href={`https://booking.ksa.ee/?promokood=G39&utm_source=silmatervis&utm_medium=guide-footer&utm_content=${lang}`}
              className="text-[#6f7f80] hover:text-[#1a1a1a] no-underline"
            >
              {t.bookingLabel}
            </Link>
            <Link
              href="mailto:info@ksa.ee"
              className="text-[#6f7f80] hover:text-[#1a1a1a] no-underline"
            >
              info@ksa.ee
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
