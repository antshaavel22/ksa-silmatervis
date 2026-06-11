/**
 * Lead capture endpoint for refraktiivkirurgia-juhend LP (light email-only gate).
 *
 * CRM (2026-06-12 update, supersedes earlier 26.05 decision):
 *   Email-gate leads NOW also flow to Mai's CRM intake as cold leads so Lilia
 *   can follow up. Best-effort POST — failure does not block the gate UX or
 *   the magic-link email. Phone is omitted (gate is email-only).
 *
 * Routing (parallel, best-effort):
 *   1. CRM intake → Mai's system (cold lead, no phone)
 *   2. Slack → #lp-kontaktid (visibility for marketing/staff)
 *   3. Resend staff email → registreerumised@ksa.ee
 *   4. Resend magic-link email → lead's email with guide URL
 *
 * Env vars (gracefully degrades if missing):
 *   KSA_TICKETS_API_KEY           — CRM intake key (same env name as guide-callback)
 *   CRM_ENDPOINT                  — optional override (defaults to prod)
 *   SLACK_LP_CHANNEL_WEBHOOK_URL  — Slack incoming webhook
 *   RESEND_API_KEY                — Resend for outbound email
 *   GUIDE_SECRET                  — HMAC secret for magic-link token generation
 */

import crypto from 'crypto';

const GUIDE_BASE_URL = 'https://silmatervis.ksa.ee/refraktiivkirurgia-tarbijajuhend';

const CRM_ENDPOINT =
  process.env.CRM_ENDPOINT || 'https://crm.ksa.ee/api/v1/leads/intake/refraktiivkirurgia-juhend';

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
  const [crmResult, slackResult, emailResult, mandrillResult] = await Promise.allSettled([
    sendToCrm(lead),
    sendToSlack(lead),
    notifyKsaEmail(lead, guideUrl),
    sendMagicLinkEmail(lead, guideUrl),
  ]);

  // Log per-destination outcome (Vercel logs)
  console.log('[guide-signup]', {
    email: lead.email,
    source: lead.source,
    crm: crmResult.status,
    crmReason: crmResult.status === 'rejected' ? crmResult.reason?.message : undefined,
    slack: slackResult.status,
    staffEmail: emailResult.status,
    magicLink: mandrillResult.status,
  });

  // Return 200 to user regardless — we don't want UX failure if one downstream is briefly down.
  return res.status(200).json({ ok: true });
}

async function sendToCrm(lead) {
  const apiKey = process.env.KSA_TICKETS_API_KEY;
  if (!apiKey) {
    console.warn('[guide-signup] KSA_TICKETS_API_KEY missing — skipping CRM');
    return { skipped: true };
  }

  const [firstName, ...rest] = lead.name.split(/\s+/);
  const lastName = rest.join(' ') || undefined;

  const payload = {
    lang: lead.language,
    contact: {
      first_name: firstName,
      last_name: lastName,
      email: lead.email,
    },
    magnet: {
      version: 'v1',
      consent_data: true,
      consent_marketing: false,
    },
    utm: {
      source: 'silmatervis',
      medium: 'guide-gate',
      campaign: 'refraktiivkirurgia-juhend',
    },
    source_url: 'https://silmatervis.ksa.ee/refraktiivkirurgia-juhend',
  };

  const res = await fetch(CRM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-KSA-API-Key': apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`CRM responded ${res.status} ${body}`);
  }
  return { ok: true };
}

function generateGuideToken(email) {
  const secret = process.env.GUIDE_SECRET || 'dev-secret-replace-in-prod';
  const payload = `${email}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex').slice(0, 16);
  return Buffer.from(`${payload}:${hmac}`).toString('base64url');
}

async function sendToSlack(lead) {
  const webhook = process.env.SLACK_LP_CHANNEL_WEBHOOK_URL;
  if (!webhook) {
    console.warn('[guide-signup] SLACK_LP_CHANNEL_WEBHOOK_URL missing — skipping Slack');
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[guide-signup] RESEND_API_KEY missing — skipping staff email');
    return { skipped: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'KSA Lead Magnet <noreply@ksa.ee>',
      to: ['registreerumised@ksa.ee'],
      subject: `Uus juhendi tellimus: ${lead.name}`,
      text: `Nimi: ${lead.name}\nE-mail: ${lead.email}\nKeel: ${lead.language}\nAllikas: ${lead.source}\nAeg: ${lead.submittedAt}\n\nJuhendi link: ${guideUrl}\n`,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend staff notify responded ${res.status} ${body}`);
  }
  return { ok: true };
}

async function sendMagicLinkEmail(lead, guideUrl) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[guide-signup] RESEND_API_KEY missing — skipping magic-link');
    return { skipped: true };
  }

  const subjects = {
    et: 'Sinu refraktiivkirurgia tarbijajuhend',
    ru: 'Ваш гид по рефракционной хирургии',
    en: 'Your refractive surgery consumer guide',
  };

  const greetings = {
    et: `Tere, ${lead.name}!\n\nAitäh, et tellisid Dr. Ants Haaveli koostatud refraktiivkirurgia tarbijajuhendi. Allpool on link täisversioonile — võta aega, see on ca 25-minutiline lugemine.`,
    ru: `Здравствуйте, ${lead.name}!\n\nСпасибо, что заказали гид по рефракционной хирургии от д-ра Антса Хаавела. Ссылка на полную версию ниже — выделите примерно 25 минут на чтение.`,
    en: `Hello ${lead.name},\n\nThank you for requesting Dr. Ants Haavel's refractive surgery consumer guide. The full version is linked below — set aside about 25 minutes for the read.`,
  };

  const greeting = greetings[lead.language] || greetings.et;
  const subject = subjects[lead.language] || subjects.et;

  const text = `${greeting}\n\n${guideUrl}\n\nSinu silmade ja eluaegse vabaduse heaks,\nDr. Ants Haavel\nKSA Silmakeskus\n`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'Dr. Ants Haavel — KSA Silmakeskus <noreply@ksa.ee>',
      to: [lead.email],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend magic-link responded ${res.status} ${body}`);
  }
  return { ok: true };
}
