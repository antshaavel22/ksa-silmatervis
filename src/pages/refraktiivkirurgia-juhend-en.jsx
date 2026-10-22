import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import GuideLayout from '@/components/GuideLayout';
import GuideSeo from '@/components/GuideSeo';
import GuideFaq from '@/components/GuideFaq';
import { GOOGLE_ADS_CONVERSIONS } from '@/lib/constants';

const FAQ = [{"q": "Is laser eye surgery safe?", "a": "KSA Vision Clinic has performed over 55,000 surface procedures with no registered case of corneal ectasia. About 2.9% of patients need a repeat procedure, and the package guarantee covers it."}, {"q": "Who is Flow3 for?", "a": "Flow3 is a cut-free, touch-free surface procedure for people aged 18–45 with confirmed myopia. Whether it suits you is decided at a thorough eye examination; if it doesn't, the doctor recommends another option."}, {"q": "How long is recovery?", "a": "About a week. In the first days the eyes are more sensitive, they water and vision fluctuates — a normal part of healing."}, {"q": "Does it hurt?", "a": "No. Numbing drops are used beforehand; you spend about 15 minutes in the treatment room and the laser works for a few seconds per eye. Some discomfort in the first days passes quickly."}, {"q": "How much does it cost?", "a": "Flow3 packages cost €2,490–5,990 and include a guarantee of 1 to 10 years. The Flow3 eye exam costs €149; for people aged 18–45 with confirmed myopia, the guide reader code FLOW39 makes it €39. The exam fee is deducted from the procedure price if the procedure takes place within 60 days."}];

export default function RefraktiivkirurgiaJuhendLpEn() {
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
          language: 'en',
          source: 'refraktiivkirurgia-juhend-gate-en',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      // Google Ads conversion fire — Consumer Guide Email Signup
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: GOOGLE_ADS_CONVERSIONS.consumerGuideEmailSignup,
        });
      }
      setTimeout(() => {
        router.push('/refraktiivkirurgia-tarbijajuhend-en?unlocked=1');
      }, 1400);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <GuideLayout publicationDate="2026-05-26" lang="en" showBackLink={false}>
      <Head>
        <title>Refractive surgery guide: laser eye surgery | KSA</title>
        <meta
          name="description"
          content="A free guide to laser eye surgery: methods, safety, recovery and 20 questions to ask any clinic. Written by Dr. Ants Haavel, 21 years of practice."
        />
        <meta property="og:title" content="Refractive surgery guide: laser eye surgery | KSA" />
        <meta property="og:description" content="Dr. Ants Haavel's guide helps you make a calm, informed decision. KSA Vision Clinic: experience since 2005, over 300,000 eye examinations, guarantee of up to 10 years." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://silmatervis.ksa.ee/images/guide/dr-haavel-portrait.jpg" />
        <link rel="canonical" href="https://silmatervis.ksa.ee/refraktiivkirurgia-juhend-en" />
      </Head>
      <GuideSeo variant="intro" lang="en" title="Refractive surgery guide: laser eye surgery | KSA" description="A free guide to laser eye surgery: methods, safety, recovery and 20 questions to ask any clinic. Written by Dr. Ants Haavel, 21 years of practice." faq={FAQ} />

      {/* TITLE PAGE */}
      <section className="max-w-[680px] mx-auto px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="border-b border-[#e8e4dc] pb-6 mb-10">
          <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#6f7f80] font-semibold">
            Consumer guide &nbsp;·&nbsp; KSA Silmakeskus &nbsp;·&nbsp; introduction
          </p>
        </div>

        <h1
          aria-label="Refractive surgery — a consumer guide"
          className="font-serif text-[40px] md:text-[56px] font-medium text-[#1a1a1a] leading-[1.04] mb-6"
          style={{ letterSpacing: '-0.018em' }}
        >
          Refractive surgery
        </h1>

        <p className="font-serif italic text-[19px] md:text-[22px] text-[#1a1a1a] mb-10 leading-[1.4] max-w-[580px]">
          What you need to know before choosing a clinic and a method for your eyes.
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[#6f7f80] tracking-wide">
          <span><strong className="text-[#1a1a1a] font-medium">Author:</strong> Dr. Ants Haavel</span>
          <span className="text-[#bbbbbb]">·</span>
          <span><strong className="text-[#1a1a1a] font-medium">Reading time:</strong> ~25 min</span>
          <span className="text-[#bbbbbb]">·</span>
          <span><strong className="text-[#1a1a1a] font-medium">Published:</strong> May 2026</span>
        </div>
        <a href="#telli" className="inline-block mt-6 text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 no-underline hover:opacity-60">Get the free guide by email ↓</a>
      </section>

      {/* COVER PHOTO */}
      <section className="max-w-[680px] mx-auto px-6 mb-8">
        <figure className="not-prose">
          <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] overflow-hidden">
            <Image
              src="/images/guide/dr-haavel-portrait.jpg"
              alt="Dr. Ants Haavel — founder and medical director of KSA Silmakeskus"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 680px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <figcaption className="text-[12.5px] text-[#4a5a5b] mt-3 pt-2 border-t border-[#e8e4dc]" style={{ lineHeight: 1.5 }}>
            Dr. Ants Haavel — founder of KSA Silmakeskus, ophthalmic surgeon with 21 years of practice. Photo: KSA Silmakeskus.
          </figcaption>
        </figure>
        <p className="text-center text-[12px] uppercase tracking-[0.22em] text-[#6f7f80] mt-8 font-medium">
          Read the introduction below&nbsp;↓
        </p>
      </section>

      <article className="prose-v2 px-6 md:px-0 pt-12 md:pt-16 pb-10">

        <div className="callout-disclosure">
          <span className="callout-label">Author's position</span>
          <p>KSA Silmakeskus specialises in the Flow3 method and considers it the most tissue-sparing choice for patients whose eye anatomy is suitable. At the same time, Flow3 is not for everyone — in some cases intraocular lenses (ICL), lens replacement (RLE), or simply continuing with glasses or contact lenses may be the more sensible option.</p>
        </div>

        <h2 id="introduction">
          <span className="chapter-eyebrow">Introduction</span>
          <span className="chapter-title">Why I wrote this guide</span>
        </h2>

        <p>In 21 years of practice I have seen thousands of patients who arrive at the clinic with high expectations and many questions, but who leave the examination saying: "I need to take all of this in and think about it." This is not because we explain things poorly. Refractive surgery is simply an unusually multi-layered field, and the volume of information a patient receives during a one-hour examination is too much.</p>

        <p>New and complex terms — Flow, SMILE, Femto-LASIK, corneal biomechanics, lens replacement, ectasia — can be disorienting at first. How do you make a decision this important, one that can change your quality of life, when you don't fully understand what will actually happen to your eyes?</p>

        <p>Over time I realised that Estonia is missing a guide to laser vision correction written for the patient: technically accurate, but understandable to someone without a medical background.</p>

        <p className="pull-quote">21 years, more than 55,000 surface procedures, and not a single registered case of corneal&nbsp;ectasia.</p>

        {/* TRUST LINE — "not a booking page" */}
        <p className="font-serif italic text-[17px] text-[#1a1a1a] leading-[1.55] border-l-2 border-[#1a1a1a] pl-5 my-10">
          The aim of this guide is not to persuade you to have surgery, but to help you understand the decision before you make&nbsp;it.
        </p>

        <h3>What you'll find in the guide</h3>

        <p>The full version (~25 minutes of reading) is in five parts and contains 20 questions you can use to evaluate the competence of any clinic.</p>

        <ul>
          <li>A clear comparison: LASIK, SMILE and touch-free Flow3</li>
          <li>What corneal biomechanics, safety and recovery mean for you</li>
          <li>How to tell whether laser eye surgery suits you</li>
          <li>20 questions to ask any clinic before you decide</li>
        </ul>

        <nav aria-label="Contents" className="guide-toc">
          <span className="callout-label">Contents</span>
          <ol style={{ listStyleType: 'upper-roman' }}>
            <li>Eye anatomy and how refractive errors arise</li>
            <li>Comparison of LASIK, SMILE and Flow3</li>
            <li>Corneal biomechanics, ectasia risk and retinal safety</li>
            <li>The clinical truth — who is a candidate and who is not</li>
            <li>Recovery, presbyopia and 20 questions to ask the clinic</li>
          </ol>
        </nav>

        {/* SOFT FADE — preview ends here */}
        <div className="mt-12 pt-8 text-center" style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(248,245,237,0.6) 100%)',
        }}>
          <p className="text-[13px] italic text-[#4a5a5b] leading-[1.55]">
            The full guide continues from the link we email you&nbsp;↓
          </p>
        </div>

      </article>

      <section id="telli" className="px-6 pb-16 md:pb-20 scroll-mt-6">
        <div className="max-w-[560px] mx-auto">
          <div className="border-t-2 border-[#1a1a1a] pt-10">
            <p className="text-[10.5px] uppercase tracking-[0.25em] text-[#6f7f80] mb-3 font-semibold">
              Get the guide
            </p>
            <h2 className="font-serif text-[28px] md:text-[34px] text-[#1a1a1a] leading-snug mb-4" style={{ letterSpacing: '-0.012em' }}>
              Send me the link to the full version by email
            </h2>
            <p className="text-[16px] text-[#1a1a1a] leading-relaxed mb-8">
              We'll send you an email with a link to the full version (5 parts, ~25 minutes of reading, including the 20 questions for the clinic). You can read it in your browser right away or open it later from your inbox.
            </p>

            {status === 'success' ? (
              <div className="bg-[#faf7f0] border-l-[3px] border-[#1a1a1a] p-6">
                <p className="font-semibold text-[#1a1a1a] mb-1">Thank you. The guide is on its way.</p>
                <p className="text-[15px] text-[#1a1a1a]">Taking you to the full version now…</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lp-name-en" className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#1a1a1a] mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    id="lp-name-en"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your first name"
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a] text-[16px]"
                  />
                </div>

                <div>
                  <label htmlFor="lp-email-en" className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#1a1a1a] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="lp-email-en"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a] text-[16px]"
                  />
                </div>

                <div className="flex items-start gap-3 pt-3">
                  <input
                    type="checkbox"
                    id="lp-consent-en"
                    name="consent"
                    required
                    checked={formState.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-[#86bc25] border-[#1a1a1a] rounded-none focus:ring-0"
                  />
                  <label htmlFor="lp-consent-en" className="text-[13.5px] text-[#4a5a5b] leading-snug">
                    I agree that KSA Silmakeskus may email me the link to the guide and, if useful, occasional reminders on the same topic. You can unsubscribe at any time.
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
                    {status === 'submitting' ? 'Sending…' : 'Get the free guide by email →'}
                  </button>
                </div>

                <p className="text-[12px] text-[#92a0a1] pt-2">
                  The guide is free. We never share your details with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      <GuideFaq lang="en" faq={FAQ} />
    </GuideLayout>
  );
}
