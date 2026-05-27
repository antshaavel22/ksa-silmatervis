import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * InlineGate — soft content gate that sits inside the guide page.
 *
 * Behaviour:
 *   - Locked by default → shows email form, hides children
 *   - Auto-unlocks if any of:
 *       • ?unlocked=1 in URL (LP form redirect or magic-link email)
 *       • localStorage flag set from a previous submission
 *   - On submit success: stores localStorage flag, reveals children,
 *     also fires Resend magic-link via /api/guide-signup so the user
 *     gets the report URL by email for later.
 *
 * Props:
 *   lang     — 'et' | 'ru' | 'en' (for API payload + copy strings)
 *   children — gated content (rendered only when unlocked)
 */

const STRINGS = {
  et: {
    eyebrow: 'Lugemise jätkamiseks',
    title: 'Soovin lugeda juhendi täisversiooni',
    body: 'Saadame Sulle e-mailile lingi täisversioonile (5 osa, ~25 min lugemist, 20 küsimust kliinikule). Saad lugeda kohe siin või hiljem oma postkastist.',
    nameLabel: 'Nimi',
    namePh: 'Sinu nimi',
    emailLabel: 'E-mail',
    emailPh: 'sinu@email.ee',
    consent:
      'Nõustun, et KSA Silmakeskus saadab mulle juhendi lingi e-mailile ja vajadusel kasulikke meeldetuletusi. Saan tellimusest igal ajal loobuda.',
    submit: 'Loe edasi',
    submitting: 'Saadame…',
    successTitle: 'Aitäh! Avame juhendi.',
    successBody: 'E-mail on teel. Sa võid juhendiga jätkata kohe siin.',
    privacy: 'Sinu andmeid ei jaga me kunagi kolmandate osapooltega.',
    error: 'Tekkis viga. Palun proovi uuesti.',
  },
  ru: {
    eyebrow: 'Продолжить чтение',
    title: 'Хочу прочитать полную версию руководства',
    body: 'Мы пришлём вам на e-mail ссылку на полную версию (5 разделов, ~25 минут чтения, 20 вопросов к клинике). Можете продолжить чтение прямо здесь или открыть позже из почты.',
    nameLabel: 'Имя',
    namePh: 'Ваше имя',
    emailLabel: 'E-mail',
    emailPh: 'vy@email.ru',
    consent:
      'Я согласен, что KSA Silmakeskus отправит мне ссылку на руководство по e-mail и при необходимости полезные напоминания. От рассылки можно отказаться в любой момент.',
    submit: 'Читать дальше',
    submitting: 'Отправляем…',
    successTitle: 'Спасибо! Открываем руководство.',
    successBody: 'Письмо отправлено. Вы можете продолжить чтение прямо здесь.',
    privacy: 'Мы никогда не передаём ваши данные третьим лицам.',
    error: 'Произошла ошибка. Пожалуйста, попробуйте снова.',
  },
  en: {
    eyebrow: 'Keep reading',
    title: 'Send me the full guide',
    body: 'We will email you the link to the full version (5 parts, ~25 min, including the 20 questions to ask any clinic). You can keep reading here right away, or open it later from your inbox.',
    nameLabel: 'Name',
    namePh: 'Your name',
    emailLabel: 'Email',
    emailPh: 'you@email.com',
    consent:
      'I agree that KSA Silmakeskus may email me the guide link and useful reminders. I can unsubscribe at any time.',
    submit: 'Keep reading',
    submitting: 'Sending…',
    successTitle: 'Thank you — opening the guide.',
    successBody: 'The email is on its way. You can keep reading here right away.',
    privacy: 'We never share your data with third parties.',
    error: 'Something went wrong. Please try again.',
  },
};

const STORAGE_KEY = (lang) => `ksa-guide-unlocked-${lang}`;

export default function InlineGate({ lang = 'et', children }) {
  const router = useRouter();
  const t = STRINGS[lang] || STRINGS.et;
  const [unlocked, setUnlocked] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', consent: false });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Detect prior unlock on mount: query param OR localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('unlocked') === '1' || params.has('t');
    let fromStorage = false;
    try {
      fromStorage = !!window.localStorage.getItem(STORAGE_KEY(lang));
    } catch (_) {
      // localStorage may be blocked; ignore.
    }
    if (fromUrl || fromStorage) setUnlocked(true);
  }, [lang]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
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
          name: form.name,
          email: form.email,
          language: lang,
          consent: form.consent,
          source: `guide-inline-gate-${lang}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || t.error);
      }
      setStatus('success');
      // Persist unlock
      try {
        window.localStorage.setItem(STORAGE_KEY(lang), String(Date.now()));
      } catch (_) {}
      // Smooth fade to content after brief success state
      setTimeout(() => {
        setUnlocked(true);
        // Keep ?unlocked=1 in URL so reload doesn't relock
        const url = new URL(window.location.href);
        if (url.searchParams.get('unlocked') !== '1') {
          url.searchParams.set('unlocked', '1');
          router.replace(url.pathname + url.search, undefined, { shallow: true });
        }
      }, 1200);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || t.error);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <section className="px-6 my-12 md:my-16" aria-label={t.title}>
      <div className="max-w-[560px] mx-auto bg-[#faf7f0] border-l-[3px] border-[#1a1a1a] rounded-r p-8 md:p-10">
        <p className="text-[10.5px] uppercase tracking-[0.25em] text-[#6f7f80] mb-3 font-semibold">
          {t.eyebrow}
        </p>
        <h3 className="font-serif text-[26px] md:text-[30px] text-[#1a1a1a] leading-snug mb-3" style={{ letterSpacing: '-0.01em' }}>
          {t.title}
        </h3>
        <p className="text-[16px] text-[#1a1a1a] leading-relaxed mb-6">{t.body}</p>

        {status === 'success' ? (
          <div className="bg-white border-l-2 border-[#1a1a1a] pl-4 py-3">
            <p className="font-semibold text-[#1a1a1a] mb-1">{t.successTitle}</p>
            <p className="text-sm text-[#1a1a1a]">{t.successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded p-5 md:p-6 space-y-3">
            <div>
              <label htmlFor="ig-name" className="block text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1a1a1a] mb-1">
                {t.nameLabel}
              </label>
              <input
                type="text"
                id="ig-name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder={t.namePh}
                className="w-full px-3 py-2 border border-[#d0d0d0] rounded focus:border-[#86bc25] focus:ring-1 focus:ring-[#86bc25] outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="ig-email" className="block text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1a1a1a] mb-1">
                {t.emailLabel}
              </label>
              <input
                type="email"
                id="ig-email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder={t.emailPh}
                className="w-full px-3 py-2 border border-[#d0d0d0] rounded focus:border-[#86bc25] focus:ring-1 focus:ring-[#86bc25] outline-none transition"
              />
            </div>
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="ig-consent"
                name="consent"
                required
                checked={form.consent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 text-[#86bc25] border-[#d0d0d0] rounded focus:ring-[#86bc25]"
              />
              <label htmlFor="ig-consent" className="text-[13px] text-[#4a5a5b] leading-snug">
                {t.consent}
              </label>
            </div>

            {status === 'error' && (
              <p className="text-[13px] text-red-700 bg-red-50 border border-red-200 rounded p-2">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting' || !form.consent}
              className="w-full bg-[#86bc25] hover:bg-[#6fa01e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition"
            >
              {status === 'submitting' ? t.submitting : `${t.submit} →`}
            </button>

            <p className="text-[11px] text-[#92a0a1] text-center pt-1">{t.privacy}</p>
          </form>
        )}
      </div>
    </section>
  );
}
