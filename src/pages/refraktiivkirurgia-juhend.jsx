import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import GuideLayout from '@/components/GuideLayout';

/**
 * Refraktiivkirurgia tarbijajuhend — landing page (ET) — V3
 *
 * Editorial-restraint teaser, designed to match the guide's typography
 * and tone. Concept inspired by the Codex teaser handoff (Kindle-preview
 * of a medical booklet) but rebuilt in our existing publication style:
 * Fraunces display, Source Serif 4 body, restrained palette, single
 * conversion moment.
 *
 * Reader flow:
 *   1. Title page with author + reading time + date metadata
 *   2. Cover photo (small inline, journal style)
 *   3. Author position disclosure (Flow3 + alternatives, honest)
 *   4. Eessõna preview — 3 real paragraphs from the guide
 *   5. Pull-quote (21 / 55,000+ / 0)
 *   6. Contents (5 chapters with Roman numerals)
 *   7. Single email gate ("Saada juhend mulle e-postile")
 *   8. After submit → Resend magic-link + Slack + auto-redirect to full guide
 */
export default function RefraktiivkirurgiaJuhendLP() {
  const router = useRouter();
  const [formState, setFormState] = useState({ name: '', email: '', consent: false });
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
          language: 'et',
          source: 'refraktiivkirurgia-juhend-gate',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Tekkis viga. Palun proovi uuesti.');
      }
      setStatus('success');
      setTimeout(() => {
        router.push('/refraktiivkirurgia-tarbijajuhend?unlocked=1');
      }, 1400);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <GuideLayout publicationDate="2026-05-26" lang="et" showBackLink={false}>
      <Head>
        <title>Refraktiivkirurgia tarbijajuhend — tutvustus | KSA Silmakeskus</title>
        <meta
          name="description"
          content="Rahulik ja arusaadav patsiendijuhend inimesele, kes kaalub silma laseroperatsiooni ja tahab enne otsust mõista meetodeid, riske ja taastumist."
        />
        <meta property="og:title" content="Refraktiivkirurgia tarbijajuhend — Dr. Ants Haavel" />
        <meta property="og:description" content="Tasuta 25-minutiline juhend. 21 aastat praktikat, 55 000+ protseduuri, 0 registreeritud ektaasiat." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://silmatervis.ksa.ee/images/guide/dr-haavel-portrait.jpg" />
        <link rel="canonical" href="https://silmatervis.ksa.ee/refraktiivkirurgia-juhend" />
      </Head>

      {/* TITLE PAGE — matches guide title page */}
      <section className="max-w-[680px] mx-auto px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="border-b border-[#e8e4dc] pb-6 mb-10">
          <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#6f7f80] font-semibold">
            Patsiendijuhend &nbsp;·&nbsp; KSA Silmakeskus &nbsp;·&nbsp; tutvustus
          </p>
        </div>

        <h1
          aria-label="Refraktiivkirurgia tarbijajuhend"
          className="font-serif text-[40px] md:text-[56px] font-medium text-[#1a1a1a] leading-[1.04] mb-6"
          style={{ letterSpacing: '-0.018em' }}
        >
          Refraktiivkirurgia tarbijajuhend
        </h1>

        <p className="font-serif italic text-[19px] md:text-[22px] text-[#1a1a1a] mb-10 leading-[1.4] max-w-[580px]">
          Mida pead teadma enne, kui valid kliiniku ja meetodi oma silmadele.
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[#6f7f80] tracking-wide">
          <span><strong className="text-[#1a1a1a] font-medium">Autor:</strong> Dr. Ants Haavel</span>
          <span className="text-[#bbbbbb]">·</span>
          <span><strong className="text-[#1a1a1a] font-medium">Lugemine:</strong> ~25 min</span>
          <span className="text-[#bbbbbb]">·</span>
          <span><strong className="text-[#1a1a1a] font-medium">Avaldatud:</strong> mai 2026</span>
        </div>
      </section>

      {/* COVER PHOTO — journal-style inline figure */}
      <section className="max-w-[680px] mx-auto px-6 mb-8">
        <figure className="not-prose">
          <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] overflow-hidden">
            <Image
              src="/images/guide/dr-haavel-portrait.jpg"
              alt="Dr. Ants Haavel, KSA Silmakeskuse asutaja ja meditsiinijuht"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 680px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <figcaption className="text-[12.5px] text-[#4a5a5b] mt-3 pt-2 border-t border-[#e8e4dc]" style={{ lineHeight: 1.5 }}>
            Dr. Ants Haavel — KSA Silmakeskuse asutaja, silmakirurg, 21 aastat praktikat.
          </figcaption>
        </figure>
        <p className="text-center text-[12px] uppercase tracking-[0.22em] text-[#6f7f80] mt-8 font-medium">
          Loe sissejuhatust allpool&nbsp;↓
        </p>
      </section>

      <article className="prose-v2 px-6 md:px-0 pt-12 md:pt-16 pb-10">

        {/* AUTHOR POSITION DISCLOSURE — same as guide */}
        <div className="callout-disclosure">
          <span className="callout-label">Autori positsioon</span>
          <p>KSA Silmakeskus on spetsialiseerunud Flow3 meetodile ja peab seda sobivatele patsientidele kõige säästvamaks valikuks. Samas ei sobi Flow3 kõigile — mõnel juhul on mõistlikum valida silmasisesed läätsed (ICL), läätsevahetus (RLE) või jätkata prillide ja kontaktläätsede kandmist.</p>
        </div>

        {/* EESSÕNA — 3 real paragraphs from the guide */}
        <h2 id="introduction">
          <span className="chapter-eyebrow">Eessõna</span>
          <span className="chapter-title">Miks ma selle juhendi kirjutasin</span>
        </h2>

        <p>Oma 21-aastase praktika jooksul olen näinud tuhandeid patsiente, kes tulevad kliinikusse suurte ootuste ja paljude küsimustega, kuid lahkuvad uuringult sõnadega: "Ma pean seda veel seedima ja mõtlema." See ei juhtu seetõttu, et me ei püüaks asju selgitada, vaid seetõttu, et refraktiivkirurgia on äärmiselt mitmetahuline ning ühetunnise uuringu jooksul antav infotulv on patsiendi jaoks lihtsalt liiga suur.</p>

        <p>Uued ja keerulised terminid nagu "Flow", "SMILE", "Femto-LASIK", "sarvkesta biomehaanika", "läätsevahetus" ja "ektaasia" võivad esialgu tekitada tõelise peapöörituse. Kuidas teha nii oluline ja elukvaliteeti muutev otsus, kui sa ei mõista täielikult, mis Sinu silmadega tegelikult toimuma hakkab?</p>

        <p>Olen aastate jooksul mõistnud, et Eestis puudub üks tõeline, patsiendikeskne teejuht silmade laserkirurgia maailma – dokument, mis ei oleks pelgalt turundusmaterjal, vaid tehniliselt täpne, kuid samas lihtsalt ja arusaadavalt kirjutatud.</p>

        {/* PULL-QUOTE — same device as in guide */}
        <p className="pull-quote">21 aastat, üle 55&nbsp;000 pinnameetodi protseduuri ja ühtegi registreeritud sarvkesta ektaasia juhtumit&nbsp;ei&nbsp;ole.</p>

        {/* TRUST LINE — "not a booking page" */}
        <p className="font-serif italic text-[17px] text-[#1a1a1a] leading-[1.55] border-l-2 border-[#1a1a1a] pl-5 my-10">
          Juhendi eesmärk ei ole veenda Sind operatsiooni tegema, vaid aidata Sul enne otsust rahulikult järele mõelda.
        </p>

        {/* CONTENTS — what the full guide covers */}
        <h3>Mida juhendist leiad</h3>

        <p>Täisversioon (~25 min lugemist) jaguneb viieks osaks ja sisaldab 20 küsimust, millega hindad iga kliiniku kompetentsi.</p>

        <nav aria-label="Sisukord" className="guide-toc">
          <span className="callout-label">Sisukord</span>
          <ol style={{ listStyleType: 'upper-roman' }}>
            <li>Silma anatoomia ja nägemishäirete teke</li>
            <li>LASIK, SMILE ja Flow3 meetodite võrdlus</li>
            <li>Sarvkesta biomehaanika, ektaasia risk ja võrkkesta ohutus</li>
            <li>Kliiniline tõde — kes sobib operatsiooniks ja kes mitte</li>
            <li>Taastumine, presbüoopia ja 20 küsimust kliinikule</li>
          </ol>
        </nav>

        {/* SOFT FADE — preview ends here */}
        <div className="mt-12 pt-8 text-center" style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(248,245,237,0.6) 100%)',
        }}>
          <p className="text-[13px] italic text-[#4a5a5b] leading-[1.55]">
            Täisjuhend jätkub e-postile saadetavast lingist&nbsp;↓
          </p>
        </div>

      </article>

      {/* EMAIL GATE — single conversion moment, in callout style */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-[560px] mx-auto">
          <div className="border-t-2 border-[#1a1a1a] pt-10">
            <p className="text-[10.5px] uppercase tracking-[0.25em] text-[#6f7f80] mb-3 font-semibold">
              Saada juhend
            </p>
            <h2 className="font-serif text-[28px] md:text-[34px] text-[#1a1a1a] leading-snug mb-4" style={{ letterSpacing: '-0.012em' }}>
              Saada täisversiooni link mu e-postile
            </h2>
            <p className="text-[16px] text-[#1a1a1a] leading-relaxed mb-8">
              Saadame Sulle e-mailile lingi juhendi täisversioonile (5 osa, ~25 min lugemist, 20 küsimust kliinikule). Saad lugeda kohe veebis või avada hiljem postkastist.
            </p>

            {status === 'success' ? (
              <div className="bg-[#faf7f0] border-l-[3px] border-[#1a1a1a] p-6">
                <p className="font-semibold text-[#1a1a1a] mb-1">Aitäh. Juhend on teel.</p>
                <p className="text-[15px] text-[#1a1a1a]">Suuname Sind kohe juhendi täisversiooni juurde…</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lp-name" className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#1a1a1a] mb-1.5">
                    Eesnimi
                  </label>
                  <input
                    type="text"
                    id="lp-name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Sinu eesnimi"
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a] text-[16px]"
                  />
                </div>

                <div>
                  <label htmlFor="lp-email" className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#1a1a1a] mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="lp-email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="sinu@email.ee"
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a] text-[16px]"
                  />
                </div>

                <div className="flex items-start gap-3 pt-3">
                  <input
                    type="checkbox"
                    id="lp-consent"
                    name="consent"
                    required
                    checked={formState.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-[#86bc25] border-[#1a1a1a] rounded-none focus:ring-0"
                  />
                  <label htmlFor="lp-consent" className="text-[13.5px] text-[#4a5a5b] leading-snug">
                    Nõustun, et KSA Silmakeskus saadab mulle juhendi lingi e-mailile ja vajadusel sama teemaga seotud kasulikke meeldetuletusi. Saan tellimusest igal ajal loobuda.
                  </label>
                </div>

                {status === 'error' && (
                  <p className="text-[13px] text-red-700 bg-red-50 border border-red-200 rounded p-3">{errorMsg}</p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !formState.consent}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:opacity-60 disabled:opacity-30 transition"
                  >
                    {status === 'submitting' ? 'Saadame…' : 'Saada juhend mulle e-postile →'}
                  </button>
                </div>

                <p className="text-[12px] text-[#92a0a1] pt-2">
                  Juhend on tasuta. Sinu andmeid ei jaga me kunagi kolmandate osapooltega.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}
