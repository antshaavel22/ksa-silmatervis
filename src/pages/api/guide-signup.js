/**
 * Lead capture endpoint for refraktiivkirurgia-juhend LP (light email-only gate).
 *
 * NOTE on CRM (2026-05-26 architecture decision):
 *   Mai's new CRM intake endpoint (/api/v1/leads/intake/refraktiivkirurgia-juhend)
 *   REQUIRES contact.phone. The LP gate only collects email (Ants' light-gate design)
 *   so we DO NOT create CRM tickets at this stage. Email-only subscribers become
 *   Lilia tickets only if/when they submit the in-guide callback CTA (which has phone).
 *
 *   This keeps the CRM queue full of "raise-your-hand" leads instead of cold opt-ins.
 *
 * Routing (parallel, best-effort):
 *   1. Slack → #kiirtesti-täitmised (visibility for marketing/staff)
 *   2. Mandrill staff email → registreerumised@ksa.ee
 *   3. Mandrill magic-link email → lead's email with guide URL
 *
 * Env vars (gracefully degrades if missing):
 *   SLACK_KIIRTESTI_WEBHOOK  — Slack incoming webhook for #kiirtesti-täitmised
 *   MANDRILL_API_KEY         — Mailchimp Transactional (Mandrill) for outbound email
 *   GUIDE_SECRET             — HMAC secret for magic-link token generation
 */

import crypto from 'crypto';

const GUIDE_BASE_URL = 'https://silmatervis.ksa.ee/refraktiivkirurgia-tarbijajuhend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, language = 'et', consent, source = 'refraktiivkirurgia-juhend-gate' } = req.body || {};

  if (!name || !email || !consent) {
    return res.status(400).json({ error: 'Nimi, e-mail ja nõusolek on kohustuslikud.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Palun sisesta korrektne e-maili aadress.' });
  }

  const lead = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    language,
    source,
    submittedAt: new Date().toISOString(),
  };

  // Generate magic-link token (HMAC of email + timestamp)
  const token = generateGuideToken(lead.email);
  const guideUrl = `${GUIDE_BASE_URL}?t=${token}`;

  // Fan out to all destinations in parallel; capture each result.
  // No CRM call here — see file header note.
  const [slackResult, emailResult, mandrillResult] = await Promise.allSettled([
    sendToSlack(lead),
    notifyKsaEmail(lead, guideUrl),
    sendMagicLinkEmail(lead, guideUrl),
  ]);

  // Log per-destination outcome (Vercel logs)
  console.log('[guide-signup]', {
    email: lead.email,
    source: lead.source,
    slack: slackResult.status,
    staffEmail: emailResult.status,
    magicLink: mandrillResult.status,
  });

  // Return 200 to user regardless — we don't want UX failure if one downstream is briefly down.
  return res.status(200).json({ ok: true });
}

function generateGuideToken(email) {
  const secret = process.env.GUIDE_SECRET || 'dev-secret-replace-in-prod';
  const payload = `${email}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex').slice(0, 16);
  return Buffer.from(`${payload}:${hmac}`).toString('base64url');
}

async function sendToSlack(lead) {
  const webhook = process.env.SLACK_KIIRTESTI_WEBHOOK;
  if (!webhook) {
    console.warn('[guide-signup] SLACK_KIIRTESTI_WEBHOOK missing — skipping Slack');
    return { skipped: true };
  }

  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: '📘 Refraktiivkirurgia juhendi tellimus' },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Nimi:*\n${lead.name}` },
        { type: 'mrkdwn', text: `*E-mail:*\n${lead.email}` },
        { type: 'mrkdwn', text: `*Keel:*\n${lead.language.toUpperCase()}` },
        { type: 'mrkdwn', text: `*Allikas:*\n${lead.source}` },
      ],
    },
    {
      type: 'context',
      elements: [{ type: 'mrkdwn', text: `Saabunud: ${lead.submittedAt}` }],
    },
  ];

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocks }),
  });

  if (!res.ok) throw new Error(`Slack webhook responded ${res.status}`);
  return { ok: true };
}

async function notifyKsaEmail(lead, guideUrl) {
  // For V1 we route the staff notification through Mandrill too; keeps a single transport.
  // Real-world: prefer dedicated SMTP if available.
  const apiKey = process.env.MANDRILL_API_KEY;
  if (!apiKey) {
    console.warn('[guide-signup] MANDRILL_API_KEY missing — skipping staff email');
    return { skipped: true };
  }

  const message = {
    from_email: 'noreply@ksa.ee',
    from_name: 'KSA Lead Magnet',
    subject: `Uus juhendi tellimus: ${lead.name}`,
    text: `Nimi: ${lead.name}\nE-mail: ${lead.email}\nKeel: ${lead.language}\nAllikas: ${lead.source}\nAeg: ${lead.submittedAt}\n\nJuhendi link: ${guideUrl}\n`,
    to: [{ email: 'registreerumised@ksa.ee', type: 'to' }],
  };

  const res = await fetch('https://mandrillapp.com/api/1.0/messages/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: apiKey, message }),
  });

  if (!res.ok) throw new Error(`Mandrill staff notify responded ${res.status}`);
  return { ok: true };
}

async function sendMagicLinkEmail(lead, guideUrl) {
  const apiKey = process.env.MANDRILL_API_KEY;
  if (!apiKey) {
    console.warn('[guide-signup] MANDRILL_API_KEY missing — skipping magic-link');
    return { skipped: true };
  }

  const subjects = {
    et: 'Sinu refraktiivkirurgia tarbijajuhend',
    ru: 'Ваш справочник о рефракционной хирургии',
    en: 'Your refractive surgery consumer guide',
  };

  const greetings = {
    et: `Tere, ${lead.name}!\n\nAitäh, et tellisid Dr. Ants Haaveli koostatud refraktiivkirurgia tarbijajuhendi. Allpool on link täisversioonile — võta aega, see on ca 25-minutiline lugemine.`,
    ru: `Здравствуйте, ${lead.name}!\n\nСпасибо, что заказали справочник о рефракционной хирургии от д-ра Антса Хаавела. Ссылка на полную версию ниже — выделите примерно 25 минут на чтение.`,
    en: `Hello ${lead.name},\n\nThank you for requesting Dr. Ants Haavel's refractive surgery consumer guide. The full version is linked below — set aside about 25 minutes for the read.`,
  };

  const greeting = greetings[lead.language] || greetings.et;
  const subject = subjects[lead.language] || subjects.et;

  const text = `${greeting}\n\n${guideUrl}\n\nSinu silmade ja eluaegse vabaduse heaks,\nDr. Ants Haavel\nKSA Silmakeskus\n`;

  const message = {
    from_email: 'noreply@ksa.ee',
    from_name: 'Dr. Ants Haavel — KSA Silmakeskus',
    subject,
    text,
    to: [{ email: lead.email, name: lead.name, type: 'to' }],
  };

  const res = await fetch('https://mandrillapp.com/api/1.0/messages/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: apiKey, message }),
  });

  if (!res.ok) throw new Error(`Mandrill magic-link responded ${res.status}`);
  return { ok: true };
}
