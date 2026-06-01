/**
 * Post-Flow3-exam Guide email trigger.
 *
 * Called by Mai's CRM (or any KSA internal system) when a patient has
 * completed a Flow3 silmauuring but has NOT booked a procedure date.
 *
 * Flow:
 *   CRM detects "exam done, no procedure booked" state
 *     ↓
 *   POST /api/post-exam-guide-email
 *     headers:
 *       Content-Type: application/json
 *       X-KSA-API-Key: <shared secret>      (env: POST_EXAM_API_KEY)
 *     body:
 *       {
 *         "name":       "Mart Tamm",
 *         "email":      "mart@example.com",
 *         "language":   "et"  | "ru" | "en"  (defaults to "et")
 *         "exam_date":  "2026-06-01"          (optional, for tone)
 *       }
 *     ↓
 *   Resend sends a warm post-exam email with a link to
 *   /refraktiivkirurgia-juhend-flow3-jarel{,-ru,-en}
 *     ↓
 *   Patient reads the variant Guide → may submit the callback form at the end
 *   → that fires existing /api/guide-callback → Slack #lp-kontaktid → Lilia calls
 *
 * Auth: X-KSA-API-Key must match POST_EXAM_API_KEY env var. Without the
 * header (or wrong value) → 401. Mai sets the same secret in her CRM.
 *
 * Notes:
 *   - No Slack notification here (the SEND is internal — patient lookup
 *     stays in the CRM). Slack only fires when the patient comes back and
 *     uses the callback form on the variant Guide.
 *   - Idempotency: not enforced. If Mai's CRM calls this twice for the
 *     same patient, two emails go out. CRM-side dedupe is cleaner.
 */

const BASE_URL = 'https://silmatervis.ksa.ee';

const VARIANT_PATH = {
  et: '/refraktiivkirurgia-juhend-flow3-jarel',
  ru: '/refraktiivkirurgia-juhend-flow3-jarel-ru',
  en: '/refraktiivkirurgia-juhend-flow3-jarel-en',
};

const SUBJECTS = {
  et: 'Sinu Flow3 silmauuringu järelmaterjalid — Dr. Ants Haavel',
  ru: 'Материалы после Вашего обследования Flow3 — д-р Антс Хаавель',
  en: 'After your Flow3 eye exam — Dr. Ants Haavel',
};

function buildGreeting(lang, name, examDate) {
  const dateNote = examDate ? ` (${examDate})` : '';
  if (lang === 'ru') {
    return `Здравствуйте, ${name}!\n\nСпасибо, что прошли обследование Flow3 в KSA Silmakeskus${dateNote}. Понимаю, что за час обследования информации поступает очень много, и спокойно принять решение об операции на месте невозможно.\n\nПоэтому я подготовил для Вас подробный гид, который поможет осмыслить результаты обследования и понять, какие методы подходят именно Вашим глазам. Прочитать можно спокойно, в своём темпе — это не реклама, и Вас ни к чему не обязывает.\n\nСсылка на гид:`;
  }
  if (lang === 'en') {
    return `Hello ${name},\n\nThank you for completing your Flow3 eye exam at KSA Silmakeskus${dateNote}. I know that an hour-long exam brings a lot of new information — too much to calmly book surgery on the spot.\n\nFor that reason I have prepared a detailed guide that will help you make sense of your results and understand which methods are right for your eyes. Read it at your own pace — this is not a sales pitch, and it commits you to nothing.\n\nLink to the guide:`;
  }
  // default ET
  return `Tere, ${name}!\n\nAitäh, et käisid Flow3 silmauuringul KSA Silmakeskuses${dateNote}. Tean, et ühe tunni jooksul antud infot on palju, ja kohapeal rahulikult otsust operatsiooni kohta langetada on raske.\n\nSelleks olen koostanud Sulle põhjaliku juhendi, mis aitab Sinu uuringutulemustele konteksti leida ja mõista, millised meetodid Sinu silmadele sobivad. Loe rahulikult oma tempos — see ei ole müügimaterjal ja ei kohusta Sind millekski.\n\nLink juhendile:`;
}

function buildSignoff(lang) {
  if (lang === 'ru') {
    return `\n\nЕсли после прочтения захотите обсудить результаты — внизу гида есть простая форма обратной связи, и мы свяжемся с Вами не позднее следующего рабочего дня.\n\nС уважением,\nд-р Антс Хаавель\nоснователь и медицинский руководитель\nKSA Silmakeskus\n`;
  }
  if (lang === 'en') {
    return `\n\nIf after reading you want to talk through your results — at the end of the guide there is a simple callback form, and we will reach out within the next working day.\n\nWarm regards,\nDr. Ants Haavel\nfounder and medical director\nKSA Silmakeskus\n`;
  }
  return `\n\nKui pärast lugemist soovid oma tulemusi koos arutada — juhendi lõpus on lihtne tagasiside vorm ja võtame Sinuga ühendust hiljemalt järgmise tööpäeva jooksul.\n\nLugupidamisega,\nDr. Ants Haavel\nasutaja ja meditsiinijuht\nKSA Silmakeskus\n`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth: shared secret from Mai's CRM
  const expectedKey = process.env.POST_EXAM_API_KEY;
  const providedKey = req.headers['x-ksa-api-key'];
  if (!expectedKey) {
    console.error('[post-exam-guide-email] POST_EXAM_API_KEY env var not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }
  if (providedKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name, email, language, exam_date } = req.body || {};
  const lang = ['et', 'ru', 'en'].includes(language) ? language : 'et';

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'valid email is required' });
  }

  const guideUrl = `${BASE_URL}${VARIANT_PATH[lang]}?utm_source=crm&utm_medium=email&utm_campaign=post-exam-guide&utm_content=${lang}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[post-exam-guide-email] RESEND_API_KEY missing — cannot send');
    return res.status(500).json({ error: 'Email provider not configured' });
  }

  const greeting = buildGreeting(lang, name.trim(), exam_date);
  const signoff = buildSignoff(lang);
  const text = `${greeting}\n${guideUrl}${signoff}`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Dr. Ants Haavel — KSA Silmakeskus <noreply@ksa.ee>',
        to: [email.trim().toLowerCase()],
        subject: SUBJECTS[lang],
        text,
      }),
    });
    if (!r.ok) {
      const body = await r.text().catch(() => '');
      console.error(`[post-exam-guide-email] Resend ${r.status}: ${body}`);
      return res.status(502).json({ error: `Resend responded ${r.status}` });
    }
    const data = await r.json().catch(() => ({}));
    console.log('[post-exam-guide-email] sent', {
      to: email,
      lang,
      guideUrl,
      resendId: data.id,
    });
    return res.status(200).json({ ok: true, guideUrl, resendId: data.id });
  } catch (err) {
    console.error('[post-exam-guide-email] exception', err);
    return res.status(500).json({ error: err.message || 'Send failed' });
  }
}
