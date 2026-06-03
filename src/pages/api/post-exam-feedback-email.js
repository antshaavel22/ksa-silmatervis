/**
 * Post-Flow3-exam satisfaction-feedback email.
 *
 * Sent ~2 hours after a patient completes a Flow3 silmauuring at KSA.
 * Feedback-first (service-quality follow-up) so it can be sent to patients
 * who did NOT opt into marketing — the email's primary purpose is a genuine
 * satisfaction rating, not an offer. The Guide link is a soft secondary
 * mention only.
 *
 * NOTE: This endpoint is the OPTIONAL "we send via Resend" path. If Mai's
 * CRM sends the email itself (recommended — it owns deliverability, consent
 * records and unsubscribe), the CRM only needs the copy below + the star-link
 * URLs; this endpoint is then unused. Kept so either architecture works.
 *
 * Flow (if used):
 *   CRM (2h post-exam, no procedure booked) → POST /api/post-exam-feedback-email
 *     headers: Content-Type: application/json
 *              X-KSA-API-Key: <POST_EXAM_API_KEY>
 *     body:    { name, email, language: et|ru|en, ref? }
 *   → Resend sends the feedback email from Dr. Ants Haavel
 *   → patient clicks a ★ → /api/exam-feedback logs score → /tagasiside thanks
 *
 * The ★ links and Guide link inside the email are the same URLs Mai would
 * embed if her CRM sends instead.
 */

const BASE = 'https://silmatervis.ksa.ee';

const GUIDE_PATH = {
  et: '/refraktiivkirurgia-juhend-flow3-jarel',
  ru: '/refraktiivkirurgia-juhend-flow3-jarel-ru',
  en: '/refraktiivkirurgia-juhend-flow3-jarel-en',
};

const SUBJECTS = {
  et: 'Kuidas jäite oma Flow3 silmauuringuga rahule?',
  ru: 'Насколько Вы остались довольны обследованием Flow3?',
  en: 'How was your Flow3 eye exam experience?',
};

function starLinks(lang, ref) {
  const refParam = ref ? `&ref=${encodeURIComponent(ref)}` : '';
  return [1, 2, 3, 4, 5]
    .map((n) => `${n}: ${BASE}/api/exam-feedback?score=${n}&lang=${lang}${refParam}`)
    .join('\n');
}

function guideUrl(lang) {
  return `${BASE}${GUIDE_PATH[lang]}?utm_source=crm&utm_medium=email&utm_campaign=post-exam-feedback&utm_content=${lang}`;
}

function buildText(lang, name, ref) {
  const stars = starLinks(lang, ref);
  const g = guideUrl(lang);

  if (lang === 'ru') {
    // Final RU copy approved by Jana 2026-06-01 (Slack DM).
    return `Здравствуйте, ${name}!\n\n`
      + `Спасибо, что недавно прошли обследование Flow3 в KSA Silmakeskus. Буду признателен, если Вы поделитесь своим мнением о визите — Ваш отзыв помогает нам становиться лучше и предоставлять ещё более качественную услугу.\n\n`
      + `Как Вы оцениваете своё обследование и обслуживание в KSA Silmakeskus? (нажмите на оценку)\n\n${stars}\n\n`
      + `Если Вы всё ещё обдумываете лазерную коррекцию зрения и хотите спокойно разобраться в теме, я подготовил подробное руководство по рефракционной хирургии. В нём собраны ответы на самые распространённые вопросы об обследовании, процедурах и выборе метода коррекции зрения. Прочитать можно здесь:\n${g}\n\n`
      + `С уважением,\nд-р Антс Хаавель\nKSA Silmakeskus\n`;
  }
  if (lang === 'en') {
    return `Hello ${name},\n\n`
      + `Thank you for your recent Flow3 eye exam at KSA Silmakeskus. I would like to know how satisfied you were with your visit — your feedback helps us provide a better service.\n\n`
      + `How would you rate today's exam experience? (click a rating)\n\n${stars}\n\n`
      + `If you are still considering laser surgery and would like to explore the topic calmly, I have written a detailed refractive surgery guide that answers most of the questions related to the exam and the procedure. You can read it here:\n${g}\n\n`
      + `Kind regards,\nDr. Ants Haavel\nKSA Silmakeskus\n`;
  }
  // ET — final agreed copy, formal Te throughout
  return `Tere, ${name}!\n\n`
    + `Aitäh, et käisite hiljuti KSA Silmakeskuses Flow3 silmauuringul. Tahaksin teada, kuidas Te oma külastusega rahule jäite — Teie tagasiside aitab meil pakkuda paremat teenust.\n\n`
    + `Kuidas hindate oma tänast uuringukogemust? (klõpsake hinnangul)\n\n${stars}\n\n`
    + `Kui kaalute edasi silma laserprotseduuri ja soovite teemasse rahulikult süveneda, siis koostasin põhjaliku refraktiivkirurgia tarbijajuhendi, mis peaks vastama enamikele uuringu ja protseduuriga seotud küsimustele. Saate seda lugeda siit:\n${g}\n\n`
    + `Lugupidamisega,\nDr. Ants Haavel\nKSA Silmakeskus\n`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const expectedKey = process.env.POST_EXAM_API_KEY;
  if (!expectedKey) {
    console.error('[post-exam-feedback-email] POST_EXAM_API_KEY not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }
  if (req.headers['x-ksa-api-key'] !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name, email, language, ref } = req.body || {};
  const lang = ['et', 'ru', 'en'].includes(language) ? language : 'et';

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'valid email is required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[post-exam-feedback-email] RESEND_API_KEY missing');
    return res.status(500).json({ error: 'Email provider not configured' });
  }

  const text = buildText(lang, name.trim(), typeof ref === 'string' ? ref : '');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: 'Dr. Ants Haavel — KSA Silmakeskus <noreply@ksa.ee>',
        to: [email.trim().toLowerCase()],
        subject: SUBJECTS[lang],
        text,
      }),
    });
    if (!r.ok) {
      const body = await r.text().catch(() => '');
      console.error(`[post-exam-feedback-email] Resend ${r.status}: ${body}`);
      return res.status(502).json({ error: `Resend responded ${r.status}` });
    }
    const data = await r.json().catch(() => ({}));
    console.log('[post-exam-feedback-email] sent', { to: email, lang, resendId: data.id });
    return res.status(200).json({ ok: true, resendId: data.id });
  } catch (err) {
    console.error('[post-exam-feedback-email] exception', err);
    return res.status(500).json({ error: err.message || 'Send failed' });
  }
}
