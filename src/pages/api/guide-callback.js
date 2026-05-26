/**
 * Callback request endpoint — end-of-guide CTA #1.
 *
 * User says "KSA Silmakeskus võtab minuga ühendust telefoni teel."
 *
 * Wired to Mai's NEW CRM intake (PHASE-44, 2026-05-26):
 *   POST https://crm.ksa.ee/api/v1/leads/intake/refraktiivkirurgia-juhend
 *   Auth: X-KSA-API-Key: ksa_<key>   (env: KSA_TICKETS_API_KEY)
 *   Source: hardcoded server-side as "refraktiivkirurgia_juhend"
 *
 * Mandatory fields per Mai's spec:
 *   - lang ("et" | "en" | "ru")
 *   - contact.phone (E.164)
 *   - contact.email
 *   - magnet.consent_data: true (GDPR — server rejects with 400 if false)
 *
 * Routing (best-effort, parallel; failure of one doesn't block others):
 *   1. CRM intake → Mai's system (Lilia call queue)
 *   2. Slack → #kiirtesti-täitmised (so Lilia + team see it instantly)
 */

// Defaults to Mai's PROD endpoint; override via CRM_ENDPOINT env var to point at staging
// during her test phase (PHASE-44).
const CRM_ENDPOINT =
  process.env.CRM_ENDPOINT || 'https://crm.ksa.ee/api/v1/leads/intake/refraktiivkirurgia-juhend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    phone,
    email,
    lang = 'et',
    source = 'guide-callback',
  } = req.body || {};

  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Nimi, telefon ja e-mail on kohustuslikud.' });
  }

  // Normalise + light validation
  const cleanedPhone = normalisePhone(phone);
  if (!/^\+\d{8,15}$/.test(cleanedPhone)) {
    return res.status(400).json({ error: 'Palun sisesta korrektne telefoninumber (nt +372 5xxx xxxx).' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Palun sisesta korrektne e-maili aadress.' });
  }

  // Split name into first/last (Mai's spec allows either or both as optional)
  const [firstName, ...rest] = name.trim().split(/\s+/);
  const lastName = rest.join(' ') || undefined;

  const lead = {
    firstName,
    lastName,
    phone: cleanedPhone,
    email: email.trim().toLowerCase(),
    lang,
    source,
    submittedAt: new Date().toISOString(),
  };

  const [crmResult, slackResult] = await Promise.allSettled([
    sendToCrm(lead),
    sendToSlack(lead),
  ]);

  console.log('[guide-callback]', {
    phone: lead.phone,
    email: lead.email,
    crm: crmResult.status,
    crmReason: crmResult.status === 'rejected' ? crmResult.reason?.message : undefined,
    slack: slackResult.status,
  });

  return res.status(200).json({ ok: true });
}

function normalisePhone(input) {
  const trimmed = input.replace(/[\s\-()]/g, '');
  if (trimmed.startsWith('+')) return trimmed;
  // Bare Estonian number (5xxx xxxx) → assume +372
  if (/^\d{7,8}$/.test(trimmed)) return `+372${trimmed}`;
  return trimmed;
}

async function sendToCrm(lead) {
  const apiKey = process.env.KSA_TICKETS_API_KEY;
  if (!apiKey) {
    console.warn('[guide-callback] KSA_TICKETS_API_KEY missing — skipping CRM');
    return { skipped: true };
  }

  const payload = {
    lang: lead.lang,
    contact: {
      first_name: lead.firstName,
      last_name: lead.lastName,
      phone: lead.phone,
      email: lead.email,
    },
    magnet: {
      version: 'v1',
      consent_data: true, // user clicked the callback button on the guide; GDPR-purpose consent implicit
      consent_marketing: false,
    },
    utm: {
      source: 'silmatervis',
      medium: 'guide',
      campaign: 'refraktiivkirurgia-juhend',
    },
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

async function sendToSlack(lead) {
  const webhook = process.env.SLACK_LP_CHANNEL_WEBHOOK_URL;
  if (!webhook) {
    console.warn('[guide-callback] SLACK_LP_CHANNEL_WEBHOOK_URL missing — skipping Slack');
    return { skipped: true };
  }

  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: '📞 TAGASIHELISTUSE SOOV — juhendi lugeja' },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Nimi:*\n${lead.firstName}${lead.lastName ? ' ' + lead.lastName : ''}` },
        { type: 'mrkdwn', text: `*Telefon:*\n${lead.phone}` },
        { type: 'mrkdwn', text: `*E-mail:*\n${lead.email}` },
        { type: 'mrkdwn', text: `*Keel:*\n${lead.lang.toUpperCase()}` },
      ],
    },
    {
      type: 'context',
      elements: [
        { type: 'mrkdwn', text: `Allikas: refraktiivkirurgia-juhend • Lilia helistab • Saabunud: ${lead.submittedAt}` },
      ],
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
