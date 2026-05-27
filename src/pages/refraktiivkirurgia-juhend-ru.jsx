import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import GuideLayout from '@/components/GuideLayout';
import { GOOGLE_ADS_CONVERSIONS } from '@/lib/constants';

export default function RefraktiivkirurgiaJuhendLpRu() {
  const router = useRouter();
  const [formState, setFormState] = useState({ name: '', email: '', consent: false });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/guide-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          language: 'ru',
          source: 'refraktiivkirurgia-juhend-gate-ru',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Произошла ошибка. Пожалуйста, попробуйте снова.');
      }
      setStatus('success');
      // Google Ads conversion fire — Consumer Guide Email Signup
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: GOOGLE_ADS_CONVERSIONS.consumerGuideEmailSignup,
        });
      }
      setTimeout(() => {
        router.push('/refraktiivkirurgia-tarbijajuhend-ru?unlocked=1');
      }, 1400);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <GuideLayout publicationDate="2026-05-26" lang="ru" showBackLink={false}>
      <Head>
        <title>Рефракционная хирургия — потребительское руководство | KSA Silmakeskus</title>
        <meta
          name="description"
          content="Спокойное и понятное руководство для тех, кто думает о лазерной коррекции зрения и хочет заранее разобраться в методах, рисках и восстановлении."
        />
        <link rel="canonical" href="https://silmatervis.ksa.ee/refraktiivkirurgia-juhend-ru" />
      </Head>

      {/* TITLE PAGE */}
      <section className="max-w-[680px] mx-auto px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="border-b border-[#e8e4dc] pb-6 mb-10">
          <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#6f7f80] font-semibold">
            Потребительское руководство &nbsp;·&nbsp; KSA Silmakeskus &nbsp;·&nbsp; вводная страница
          </p>
        </div>

        <h1
          aria-label="Рефракционная хирургия — потребительское руководство"
          className="font-serif text-[40px] md:text-[56px] font-medium text-[#1a1a1a] leading-[1.04] mb-6"
          style={{ letterSpacing: '-0.018em' }}
        >
          Рефракционная хирургия
        </h1>

        <p className="font-serif italic text-[19px] md:text-[22px] text-[#1a1a1a] mb-10 leading-[1.4] max-w-[580px]">
          Что нужно знать перед тем, как выбрать клинику и метод для своих глаз.
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[#6f7f80] tracking-wide">
          <span><strong className="text-[#1a1a1a] font-medium">Автор:</strong> д-р Антс Хаавель</span>
          <span className="text-[#bbbbbb]">·</span>
          <span><strong className="text-[#1a1a1a] font-medium">Чтение:</strong> ~25 мин</span>
          <span className="text-[#bbbbbb]">·</span>
          <span><strong className="text-[#1a1a1a] font-medium">Опубликовано:</strong> май 2026</span>
        </div>
      </section>

      {/* COVER PHOTO */}
      <section className="max-w-[680px] mx-auto px-6 mb-8">
        <figure className="not-prose">
          <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] overflow-hidden">
            <Image
              src="/images/guide/dr-haavel-portrait.jpg"
              alt="д-р Антс Хаавель — основатель и медицинский руководитель KSA Silmakeskus"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 680px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <figcaption className="text-[12.5px] text-[#4a5a5b] mt-3 pt-2 border-t border-[#e8e4dc]" style={{ lineHeight: 1.5 }}>
            д-р Антс Хаавель — основатель KSA Silmakeskus, офтальмохирург, 21 год практики. Фото: KSA Silmakeskus.
          </figcaption>
        </figure>
        <p className="text-center text-[12px] uppercase tracking-[0.22em] text-[#6f7f80] mt-8 font-medium">
          Прочитайте введение ниже&nbsp;↓
        </p>
      </section>

      <article className="prose-v2 px-6 md:px-0 pt-12 md:pt-16 pb-10">

        <div className="callout-disclosure">
          <span className="callout-label">Позиция автора</span>
          <p>KSA Silmakeskus специализируется на методе Flow3 и считает его наиболее щадящим выбором для пациентов с подходящей анатомией глаза. При этом Flow3 подходит не всем — в ряде случаев более разумным решением могут быть внутриглазные линзы (ICL), замена хрусталика (RLE) или продолжение ношения очков и контактных линз.</p>
        </div>

        <h2 id="introduction">
          <span className="chapter-eyebrow">Предисловие</span>
          <span className="chapter-title">Почему я написал это руководство</span>
        </h2>

        <p>За 21 год своей практики я видел тысячи пациентов, которые приходили в клинику с большими ожиданиями и множеством вопросов, но после обследования уходили со словами: «Мне нужно всё это ещё переварить и обдумать». Это происходит не потому, что мы плохо объясняем. Просто рефракционная хирургия — чрезвычайно многогранная область, и объём информации, который пациент получает за час обследования, слишком велик.</p>

        <p>Новые и сложные термины — Flow, SMILE, Femto-LASIK, биомеханика роговицы, замена хрусталика, эктазия — поначалу могут вызвать растерянность. Как принять настолько важное решение, способное изменить качество жизни, если вы до конца не понимаете, что именно будет происходить с вашими глазами?</p>

        <p>Со временем я понял, что в Эстонии не хватает руководства по лазерной коррекции зрения, написанного именно для пациента: технически точного, но понятного человеку без медицинского образования.</p>

        <p className="pull-quote">21 год, более 55&nbsp;000 поверхностных процедур и ни одного зарегистрированного случая эктазии&nbsp;роговицы.</p>

        {/* TRUST LINE — "not a booking page" */}
        <p className="font-serif italic text-[17px] text-[#1a1a1a] leading-[1.55] border-l-2 border-[#1a1a1a] pl-5 my-10">
          Цель руководства — не убедить вас сделать операцию, а помочь спокойно разобраться перед&nbsp;решением.
        </p>

        <h3>Что вы найдёте в руководстве</h3>

        <p>Полная версия (~25 минут чтения) состоит из пяти частей и содержит 20 вопросов, которые помогают оценить компетенцию любой клиники.</p>

        <nav aria-label="Содержание" className="guide-toc">
          <span className="callout-label">Содержание</span>
          <ol style={{ listStyleType: 'upper-roman' }}>
            <li>Анатомия глаза и возникновение нарушений зрения</li>
            <li>Сравнение методов LASIK, SMILE и Flow3</li>
            <li>Биомеханика роговицы, риск эктазии и безопасность сетчатки</li>
            <li>Клиническая правда — кому подходит операция, а кому нет</li>
            <li>Восстановление, пресбиопия и 20 вопросов клинике</li>
          </ol>
        </nav>

        {/* SOFT FADE — preview ends here */}
        <div className="mt-12 pt-8 text-center" style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(248,245,237,0.6) 100%)',
        }}>
          <p className="text-[13px] italic text-[#4a5a5b] leading-[1.55]">
            Полное руководство продолжается по ссылке, которую мы отправим на&nbsp;e-mail&nbsp;↓
          </p>
        </div>

      </article>

      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-[560px] mx-auto">
          <div className="border-t-2 border-[#1a1a1a] pt-10">
            <p className="text-[10.5px] uppercase tracking-[0.25em] text-[#6f7f80] mb-3 font-semibold">
              Получить руководство
            </p>
            <h2 className="font-serif text-[28px] md:text-[34px] text-[#1a1a1a] leading-snug mb-4" style={{ letterSpacing: '-0.012em' }}>
              Отправьте ссылку на полную версию мне на e-mail
            </h2>
            <p className="text-[16px] text-[#1a1a1a] leading-relaxed mb-8">
              Мы пришлём вам на e-mail ссылку на полную версию (5 разделов, ~25 минут чтения, включая 20 вопросов к клинике). Сможете прочитать сразу в браузере или открыть позже из почты.
            </p>

            {status === 'success' ? (
              <div className="bg-[#faf7f0] border-l-[3px] border-[#1a1a1a] p-6">
                <p className="font-semibold text-[#1a1a1a] mb-1">Спасибо. Руководство уже в пути.</p>
                <p className="text-[15px] text-[#1a1a1a]">Сейчас перенаправим вас к полной версии…</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lp-name-ru" className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#1a1a1a] mb-1.5">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="lp-name-ru"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a] text-[16px]"
                  />
                </div>

                <div>
                  <label htmlFor="lp-email-ru" className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#1a1a1a] mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="lp-email-ru"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="vy@email.ru"
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a] text-[16px]"
                  />
                </div>

                <div className="flex items-start gap-3 pt-3">
                  <input
                    type="checkbox"
                    id="lp-consent-ru"
                    name="consent"
                    required
                    checked={formState.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-[#86bc25] border-[#1a1a1a] rounded-none focus:ring-0"
                  />
                  <label htmlFor="lp-consent-ru" className="text-[13.5px] text-[#4a5a5b] leading-snug">
                    Я согласен, что KSA Silmakeskus отправит мне ссылку на руководство по e-mail и при необходимости полезные напоминания по этой теме. От рассылки можно отказаться в любой момент.
                  </label>
                </div>

                {status === 'error' && (
                  <p className="text-[13px] text-red-700 bg-red-50 border border-red-200 rounded p-3">{errorMsg}</p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !formState.consent}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:opacity-60 disabled:opacity-30 transition"
                  >
                    {status === 'submitting' ? 'Отправляем…' : 'Получить руководство на e-mail →'}
                  </button>
                </div>

                <p className="text-[12px] text-[#92a0a1] pt-2">
                  Руководство бесплатное. Мы никогда не передаём ваши данные третьим лицам.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}
