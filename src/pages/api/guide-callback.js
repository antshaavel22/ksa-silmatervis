/**
 * Callback request endpoint — end-of-guide CTA #1.
 *
 * User says "KSA Silmakeskus võtab minuga ühendust telefoni teel."
 * Routing:
 *   1. CRM intake with source=guide-callback
 *   2. Slack → #kiirtesti-täitmised (high priority — same-day callback)
 */

const CRM_ENDPOINT = 'https://crm.ksa.ee/api/v1/tickets/intake/flow3';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, source = 'guide-callback' } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Nimi ja telefon on kohustuslikud.' });
  }

  const cleanedPhone = phone.replace(/\s+/g, '');
  if (cleanedPhone.length < 7) {
    return res.status(400).json({ error: 'Palun sisesta korrektne telefoninumber.' });
  }

  const lead = {
    name: name.trim(),
    phone: cleanedPhone,
    source,
    submittedAt: new Date().toISOString(),
  };

  const [crmResult, slackResult] = await Promise.allSettled([
    sendToCrm(lead),
    sendToSlack(lead),
  ]);

  console.log('[guide-callback]', {
    phone: lead.phone,
    crm: crmResult.status,
    slack: slackResult.status,
  });

  return res.status(200).json({ ok: true });
}

async function sendToCrm(lead) {
  const apiKey = process.env.KSA_TICKETS_API_KEY;
  if (!apiKey) {
    console.warn('[guide-callback] KSA_TICKETS_API_KEY missing — skipping CRM');
    return { skipped: true };
  }

  const res = await fetch(CRM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      source: lead.source,
      priority: 'high',
      callback_requested: true,
      submitted_at: lead.submittedAt,
    }),
  });

  if (!res.ok) throw new Error(`CRM responded ${res.status}`);
  return { ok: true };
}

async function sendToSlack(lead) {
  const webhook = process.env.SLACK_KIIRTESTI_WEBHOOK;
  if (!webhook) {
    console.warn('[guide-callback] SLACK_KIIRTESTI_WEBHOOK missing — skipping Slack');
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
        { type: 'mrkdwn', text: `*Nimi:*\n${lead.name}` },
        { type: 'mrkdwn', text: `*Telefon:*\n${lead.phone}` },
      ],
    },
    {
      type: 'context',
      elements: [
        { type: 'mrkdwn', text: `Allikas: refraktiivkirurgia-juhend • Helistada hiljemalt järgmise tööpäeva jooksul • Saabunud: ${lead.submittedAt}` },
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
