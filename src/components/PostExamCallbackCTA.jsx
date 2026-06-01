import { useState } from 'react';

/**
 * Post-Flow3-exam Guide — callback-only CTA at end of document.
 *
 * Used by the /refraktiivkirurgia-juhend-flow3-jarel{,-ru,-en} pages.
 * Different from the cold-funnel `EndOfGuideCTAs` (which has dual callback +
 * self-booking): here we ONLY offer callback, because:
 *   - The patient already came to the Flow3 exam and didn't self-book.
 *     If they wanted self-serve, they'd have used the booking link at the exam.
 *   - The bottleneck is human reassurance (Lilia call), not friction at booking.
 *
 * Slack notification fires into the same #lp-kontaktid channel via the
 * existing /api/guide-callback endpoint, with source='post-exam-guide-callback'
 * so Lilia/Mai can prioritise these (warm leads from post-exam state).
 */

const STRINGS = {
  et: {
    eyebrow: 'Järgmine samm',
    title: 'Soovid arutada oma uuringutulemusi ja võimalikku järgnevat protseduuri?',
    sub: 'Jäta oma andmed ja KSA Silmakeskuse spetsialist võtab Sinuga ühendust hiljemalt järgmise tööpäeva jooksul. Saame koos vaadata, mida Sinu uuringutulemused tähendavad ning kuidas edasi liikuda.',
    nameLabel: 'Nimi',
    namePlaceholder: 'Sinu nimi',
    phoneLabel: 'Telefon',
    emailLabel: 'E-mail',
    submitting: 'Saadame…',
    submit: 'Palun helistage mulle →',
    success: 'Aitäh. KSA Silmakeskus võtab Sinuga ühendust hiljemalt järgmise tööpäeva jooksul.',
    error: 'Tekkis viga. Palun proovi uuesti.',
  },
  ru: {
    eyebrow: 'Следующий шаг',
    title: 'Хотите обсудить результаты обследования и возможную процедуру?',
    sub: 'Оставьте свои данные и специалист KSA Silmakeskus свяжется с Вами не позднее следующего рабочего дня. Вместе посмотрим, что означают результаты Вашего обследования и как двигаться дальше.',
    nameLabel: 'Имя',
    namePlaceholder: 'Ваше имя',
    phoneLabel: 'Телефон',
    emailLabel: 'E-mail',
    submitting: 'Отправляем…',
    submit: 'Прошу связаться со мной →',
    success: 'Спасибо. KSA Silmakeskus свяжется с Вами не позднее следующего рабочего дня.',
    error: 'Произошла ошибка. Пожалуйста, попробуйте снова.',
  },
  en: {
    eyebrow: 'Next step',
    title: 'Want to talk through your exam results and a possible procedure?',
    sub: 'Leave your details and a KSA Silmakeskus specialist will call you back no later than the next working day. Together we can review what your results mean and how to proceed.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    submitting: 'Sending…',
    submit: 'Please call me →',
    success: 'Thank you. KSA Silmakeskus will call you back no later than the next working day.',
    error: 'Something went wrong. Please try again.',
  },
};

export default function PostExamCallbackCTA({ lang = 'et' }) {
  const t = STRINGS[lang] || STRINGS.et;
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/guide-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'post-exam-guide-callback',
          lang,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || t.error);
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <section className="px-6 py-16 md:py-20 border-t border-[#1a1a1a]">
      <div className="max-w-[680px] mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#1a1a1a] mb-6 font-medium">
          {t.eyebrow}
        </p>
        <h2 className="font-serif text-[28px] md:text-[34px] text-[#1a1a1a] leading-snug mb-5" style={{ letterSpacing: '-0.012em' }}>
          {t.title}
        </h2>
        <p className="text-[16px] text-[#1a1a1a] leading-relaxed mb-8 max-w-[600px]">
          {t.sub}
        </p>

        {status === 'success' ? (
          <div className="bg-[#faf7f0] border-l-[3px] border-[#1a1a1a] p-6">
            <p className="text-[15px] text-[#1a1a1a]">{t.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pe-cb-name" className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] mb-1.5">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="pe-cb-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a] text-[16px]"
                />
              </div>
              <div>
                <label htmlFor="pe-cb-phone" className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] mb-1.5">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  id="pe-cb-phone"
                  required
                  placeholder="+372…"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a] text-[16px]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="pe-cb-email" className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] mb-1.5">
                {t.emailLabel}
              </label>
              <input
                type="email"
                id="pe-cb-email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a] text-[16px]"
              />
            </div>

            {status === 'error' && (
              <p className="text-[13px] text-red-700 bg-red-50 border border-red-200 rounded p-3">{errorMsg}</p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:opacity-60 disabled:opacity-30 transition"
              >
                {status === 'submitting' ? t.submitting : t.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
