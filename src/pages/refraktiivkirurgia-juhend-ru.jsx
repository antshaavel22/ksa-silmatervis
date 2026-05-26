import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function RefraktiivkirurgiaJuhendLpRu() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    language: 'ru',
    consent: false,
  });
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
          source: 'refraktiivkirurgia-juhend-gate-ru',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Произошла ошибка. Пожалуйста, попробуйте снова.');
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/refraktiivkirurgia-tarbijajuhend-ru');
      }, 1400);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Рефракционная хирургия — Руководство для пациента | KSA Silmakeskus</title>
        <meta
          name="description"
          content="Бесплатное руководство д-ра Антса Хаавела для пациента: 25 минут чтения, основано на 21 году практики и 55 000+ процедур. 20 вопросов, которые стоит задать клинике."
        />
        <link rel="canonical" href="https://silmatervis.ksa.ee/refraktiivkirurgia-juhend-ru" />
      </Head>

      <div lang="ru">

      {/* TITLE BAND */}
      <section className="bg-beige-light py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block text-xs uppercase tracking-widest font-semibold text-lime-darker mb-5">
            Бесплатное руководство • 25 мин чтения
          </div>
          <h1 className="font-sans text-4xl md:text-5xl font-semibold text-ink leading-tight mb-5 tracking-tight">
            Рефракционная хирургия — руководство для пациента
          </h1>
          <p className="font-serif italic text-xl text-ink leading-relaxed max-w-xl mx-auto">
            Что нужно знать перед тем, как выбрать клинику и метод для своих глаз.
          </p>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white py-10 px-4 border-b border-line">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-lime-darker mb-1">21</div>
            <div className="text-xs md:text-sm text-ink-60 uppercase tracking-wide">год практики</div>
          </div>
          <div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-lime-darker mb-1">55&nbsp;000+</div>
            <div className="text-xs md:text-sm text-ink-60 uppercase tracking-wide">процедур</div>
          </div>
          <div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-lime-darker mb-1">0</div>
            <div className="text-xs md:text-sm text-ink-60 uppercase tracking-wide">случаев эктазии</div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION PREVIEW */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-[680px] mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-60 mb-4 font-semibold">
            Предисловие
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-ink mb-8 leading-tight">
            Почему я написал это руководство
          </h2>

          <div className="prose-v2">
            <p>За 21 год своей практики я видел тысячи пациентов, которые приходили в клинику с большими ожиданиями и множеством вопросов, но после обследования уходили со словами: «Мне нужно всё это ещё переварить и обдумать».</p>

            <p>Это происходит не потому, что мы плохо объясняем. Просто рефракционная хирургия — чрезвычайно многогранная область, и объём информации, который пациент получает за час обследования, слишком велик.</p>

            <p>Со временем я понял, что в Эстонии не хватает руководства по лазерной коррекции зрения, написанного именно для пациента: технически точного, но понятного человеку без медицинского образования.</p>

            <p>Это руководство не является рекламной брошюрой. Если после прочтения вы решите обратиться в другую клинику, это нормальное решение. Моя цель в другом: помочь вам лучше понять свои варианты и выбрать клинику и врача, которым вы сможете спокойно доверить свои глаза.</p>
          </div>

          <div className="mt-10 pt-8 border-t border-line flex items-center gap-5">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/images/guide/dr-haavel-portrait.jpg"
                alt="д-р Антс Хаавель"
                fill
                sizes="64px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <p className="font-serif italic text-lg text-ink leading-tight">д-р Антс Хаавель</p>
              <p className="text-sm text-ink-60">основатель и медицинский руководитель, KSA Silmakeskus</p>
            </div>
          </div>
        </div>
      </section>

      {/* GATE */}
      <section className="bg-beige-light py-16 md:py-20 px-4 border-t border-b border-line">
        <div className="max-w-[560px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-60 mb-3 font-semibold">
              Продолжить чтение
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-3 leading-tight">
              Отправьте мне полную версию
            </h2>
            <p className="text-base text-ink-60 leading-relaxed">
              Мы пришлём вам на e-mail ссылку на полную версию (5 разделов, ~25 минут
              чтения, включая 20 вопросов к клинике). Сможете прочитать сразу, сохранить
              на потом или поделиться с близким.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-lime-wash border-l-4 border-lime p-6 rounded">
              <h3 className="text-lg font-semibold text-ink mb-2">
                Спасибо! Руководство уже в пути.
              </h3>
              <p className="text-ink-80 mb-1">
                Письмо отправлено. Сейчас перенаправим вас к полной версии…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card p-6 md:p-8 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-line rounded focus:border-lime focus:ring-1 focus:ring-lime outline-none transition"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-line rounded focus:border-lime focus:ring-1 focus:ring-lime outline-none transition"
                  placeholder="vy@email.ru"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-ink mb-1">Язык</label>
                <select
                  id="language"
                  name="language"
                  value={formState.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-line rounded focus:border-lime focus:ring-1 focus:ring-lime outline-none transition bg-white"
                >
                  <option value="ru">Русский</option>
                  <option value="et">Eesti</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={formState.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-lime border-line rounded focus:ring-lime"
                />
                <label htmlFor="consent" className="text-sm text-ink-60 leading-snug">
                  Я согласен, что KSA Silmakeskus отправит мне ссылку на руководство
                  по e-mail и при необходимости полезные напоминания. От рассылки можно
                  отказаться в любой момент.
                </label>
              </div>

              {status === 'error' && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || !formState.consent}
                className="w-full bg-lime hover:bg-lime-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition"
              >
                {status === 'submitting' ? 'Отправляем…' : 'Отправить руководство и продолжить'}
              </button>

              <p className="text-xs text-ink-40 text-center pt-1">
                Мы никогда не передаём ваши данные третьим лицам.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-ink mb-3 text-center">
            Что вы найдёте в руководстве
          </h2>
          <p className="text-ink-60 text-center mb-12 max-w-xl mx-auto text-sm leading-relaxed">
            Материал основан на научной литературе и 21-летнем клиническом опыте KSA —
            написан так, чтобы вы могли принять осознанное решение, в какую бы клинику
            вы в итоге ни обратились.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Анатомия глаза и происхождение нарушений зрения', body: 'Почему вы видите так, как видите — и что операция реально меняет в глазу.' },
              { title: 'LASIK vs SMILE vs Flow3 — честное сравнение', body: 'Сильные стороны, риски и долгосрочные последствия каждого метода.' },
              { title: 'Биомеханика роговицы', body: 'Почему потеря 20% прочности после LASIK проявляется проблемами спустя годы.' },
              { title: 'Восстановление по дням', body: 'Что именно происходит в глазу в 1-й, 3-й, 7-й и 30-й день. Без прикрас.' },
              { title: 'Пресбиопия и старение хрусталика', body: 'Почему после 45 очки могут понадобиться снова — и что с этим делать.' },
              { title: '20 вопросов к клинике', body: 'Распечатайте и возьмите с собой. Честная клиника ответит на все цифрами.' },
            ].map((item) => (
              <div key={item.title} className="border-l-4 border-lime pl-5 py-1">
                <h3 className="font-semibold text-ink mb-1">{item.title}</h3>
                <p className="text-sm text-ink-60 leading-snug">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>
    </Layout>
  );
}
