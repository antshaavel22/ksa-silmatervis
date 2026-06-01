/**
 * Post-Flow3-exam satisfaction feedback capture.
 *
 * Hit by the star-rating links in the post-exam feedback email:
 *   https://silmatervis.ksa.ee/api/exam-feedback?score=4&lang=et[&ref=...]
 *
 * GET (link click) → validate score → notify Slack #lp-kontaktid →
 * 302 redirect to /tagasiside?score=N&lang=xx (localized thank-you page).
 *
 * Why GET: email clients only fire GET on a link click. One click, no form,
 * works even with JS disabled.
 *
 * GDPR note: by default we log only the score + language (anonymous, aggregate
 * service-quality metric — clean basis for non-marketing-consented patients).
 * If Mai's CRM appends an optional &ref= token (e.g. a CRM record id, NOT raw
 * personal data), it passes through to Slack so a low score can be followed up.
 * Keep ref as an opaque id, not name/email.
 */

const SLACK_WEBHOOK = process.env.SLACK_LP_CHANNEL_WEBHOOK_URL;

export default async function handler(req, res) {
  const score = parseInt(req.query.score, 10);
  const lang = ['et', 'ru', 'en'].includes(req.query.lang) ? req.query.lang : 'et';
  const ref = typeof req.query.ref === 'string' ? req.query.ref.slice(0, 64) : '';

  // Validate score 1–5; if bad, still redirect to thank-you (don't show an error to a patient)
  const validScore = Number.isInteger(score) && score >= 1 && score <= 5;

  if (validScore && SLACK_WEBHOOK) {
    const stars = '★'.repeat(score) + '☆'.repeat(5 - score);
    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:star: *Flow3 uuringu tagasiside*\n${stars}  (${score}/5)`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Keel: ${lang.toUpperCase()}${ref ? ` · Ref: ${ref}` : ' · (anonüümne)'} · Allikas: post-exam-feedback-email`,
          },
        ],
      },
    ];
    try {
      await fetch(SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks }),
      });
    } catch (err) {
      console.error('[exam-feedback] Slack notify failed', err);
      // swallow — never block the patient's redirect on a Slack hiccup
    }
  }

  console.log('[exam-feedback]', { score: validScore ? score : 'invalid', lang, ref: ref || null });

  const dest = `/tagasiside?score=${validScore ? score : ''}&lang=${lang}`;
  res.redirect(302, dest);
}
