import Head from 'next/head';
import { useRouter } from 'next/router';
import GuideLayout from '@/components/GuideLayout';

/**
 * Thank-you page after a post-exam satisfaction rating.
 * Reached via 302 from /api/exam-feedback?score=N&lang=xx (which already
 * logged the score). This page is display-only — it does NOT re-log.
 *
 * Soft Guide link kept here too, in case the patient lands here first.
 */

const STRINGS = {
  et: {
    eyebrow: 'Tagasiside',
    title: 'Aitäh tagasiside eest!',
    bodyGeneric: 'Sinu hinnang on meieni jõudnud. Iga tagasiside aitab meil oma tööd paremaks muuta.',
    bodyLow: 'Aitäh, et andsid teada. Kui midagi jäi häirima, võtame Sinuga hea meelega ühendust — kirjuta info@ksa.ee või helista +372 644 5060.',
    bodyHigh: 'Meil on hea meel, et jäid külastusega rahule!',
    guideLine: 'Kui kaalud veel silma laserprotseduuri, leiad Dr. Ants Haaveli põhjaliku juhendi siit:',
    guideLink: 'Loe juhendit →',
    guideHref: 'https://silmatervis.ksa.ee/refraktiivkirurgia-juhend-flow3-jarel',
    home: 'ksa.ee',
  },
  ru: {
    eyebrow: 'Отзыв',
    title: 'Спасибо за Ваш отзыв!',
    bodyGeneric: 'Ваша оценка получена. Каждый отзыв помогает нам делать нашу работу лучше.',
    bodyLow: 'Спасибо, что сообщили нам об этом. Если Ваш визит не оправдал ожиданий или у Вас остались замечания, мы будем рады помочь. Напишите нам на info@ksa.ee или позвоните по телефону +372 644 5060.',
    bodyHigh: 'Мы рады, что Вы остались довольны визитом!',
    guideLine: 'Если Вы всё ещё обдумываете лазерную коррекцию зрения, подробное руководство д-ра Антса Хаавеля здесь:',
    guideLink: 'Читать руководство →',
    guideHref: 'https://silmatervis.ksa.ee/refraktiivkirurgia-juhend-flow3-jarel-ru',
    home: 'ksa.ee',
  },
  en: {
    eyebrow: 'Feedback',
    title: 'Thank you for your feedback!',
    bodyGeneric: 'Your rating has reached us. Every piece of feedback helps us do our work better.',
    bodyLow: 'Thank you for letting us know. If something fell short, we would be glad to follow up — email info@ksa.ee or call +372 644 5060.',
    bodyHigh: 'We are glad you were happy with your visit!',
    guideLine: "If you're still considering laser surgery, Dr. Ants Haavel's detailed guide is here:",
    guideLink: 'Read the guide →',
    guideHref: 'https://silmatervis.ksa.ee/refraktiivkirurgia-juhend-flow3-jarel-en',
    home: 'ksa.ee',
  },
};

export default function Tagasiside() {
  const router = useRouter();
  const lang = ['et', 'ru', 'en'].includes(router.query.lang) ? router.query.lang : 'et';
  const score = parseInt(router.query.score, 10);
  const t = STRINGS[lang];

  let body = t.bodyGeneric;
  if (Number.isInteger(score)) {
    if (score <= 3) body = t.bodyLow;
    else body = t.bodyHigh;
  }

  return (
    <GuideLayout lang={lang} showBackLink={false}>
      <Head>
        <title>{t.title} | KSA Silmakeskus</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <section className="max-w-[600px] mx-auto px-6 pt-24 md:pt-32 pb-24 md:pb-32">
        <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#6f7f80] font-semibold mb-6">
          {t.eyebrow}
        </p>

        {Number.isInteger(score) && score >= 1 && score <= 5 && (
          <p className="text-[28px] mb-6 tracking-[0.15em] text-[#87be23]" aria-label={`${score}/5`}>
            {'★'.repeat(score)}<span className="text-[#d8d8d8]">{'★'.repeat(5 - score)}</span>
          </p>
        )}

        <h1 className="font-serif text-[34px] md:text-[42px] font-medium text-[#1a1a1a] leading-tight mb-6" style={{ letterSpacing: '-0.015em' }}>
          {t.title}
        </h1>

        <p className="text-[17px] text-[#1a1a1a] leading-relaxed mb-10">
          {body}
        </p>

        <div className="border-t border-[#e8e4dc] pt-8">
          <p className="text-[15px] text-[#4a5a5b] leading-relaxed mb-3">
            {t.guideLine}
          </p>
          <a
            href={t.guideHref}
            className="inline-block text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1a1a1a] border-b-2 border-[#87be23] pb-1 hover:opacity-60 transition no-underline"
          >
            {t.guideLink}
          </a>
        </div>
      </section>
    </GuideLayout>
  );
}
