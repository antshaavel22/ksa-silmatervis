import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function RefraktiivkirurgiaJuhendLpEn() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    language: 'en',
    consent: false,
  });
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
          source: 'refraktiivkirurgia-juhend-gate-en',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/refraktiivkirurgia-tarbijajuhend-en');
      }, 1400);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Refractive Surgery — A Patient Guide | KSA Silmakeskus</title>
        <meta
          name="description"
          content="A free 25-minute patient guide written by Dr. Ants Haavel from 21 years of practice and 55,000+ procedures. 20 questions to ask any clinic before deciding."
        />
        <link rel="canonical" href="https://silmatervis.ksa.ee/refraktiivkirurgia-juhend-en" />
      </Head>

      <div lang="en">

      {/* TITLE BAND */}
      <section className="bg-beige-light py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block text-xs uppercase tracking-widest font-semibold text-lime-darker mb-5">
            Free patient guide • 25 min read
          </div>
          <h1 className="font-sans text-4xl md:text-5xl font-semibold text-ink leading-tight mb-5 tracking-tight">
            Refractive Surgery — A Patient Guide
          </h1>
          <p className="font-serif italic text-xl text-ink leading-relaxed max-w-xl mx-auto">
            What you need to know before choosing a clinic and a method for your eyes.
          </p>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white py-10 px-4 border-b border-line">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-lime-darker mb-1">21</div>
            <div className="text-xs md:text-sm text-ink-60 uppercase tracking-wide">years of practice</div>
          </div>
          <div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-lime-darker mb-1">55,000+</div>
            <div className="text-xs md:text-sm text-ink-60 uppercase tracking-wide">procedures</div>
          </div>
          <div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-lime-darker mb-1">0</div>
            <div className="text-xs md:text-sm text-ink-60 uppercase tracking-wide">registered ectasia cases</div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION PREVIEW */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-[680px] mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-60 mb-4 font-semibold">
            Introduction
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-ink mb-8 leading-tight">
            Why I wrote this guide
          </h2>

          <div className="prose-v2">
            <p>In 21 years of practice I have seen thousands of patients who arrive with high expectations and a long list of questions, and who leave the examination saying: "I need to think this through." This is not because we fail to explain. Refractive surgery is genuinely multilayered, and the volume of information a patient receives in a one-hour examination is simply too much.</p>

            <p>New and unfamiliar terms — Flow, SMILE, Femto-LASIK, corneal biomechanics, lens exchange, ectasia — can leave a person disoriented. How do you make a decision that will change your daily quality of life if you do not fully understand what will happen to your eyes?</p>

            <p>Over time I came to see that Estonia lacks a patient-facing guide to laser vision correction: a document that is technically accurate but written so that a non-medical reader can understand it.</p>

            <p>This is not a sales brochure. If you read it and decide to go to a different clinic, that is a perfectly reasonable outcome. My aim is different: to help you better understand your options and choose a clinic and a doctor you can calmly trust with your eyes.</p>
          </div>

          <div className="mt-10 pt-8 border-t border-line flex items-center gap-5">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/images/guide/dr-haavel-portrait.jpg"
                alt="Dr. Ants Haavel"
                fill
                sizes="64px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <p className="font-serif italic text-lg text-ink leading-tight">Dr. Ants Haavel</p>
              <p className="text-sm text-ink-60">founder and medical director, KSA Silmakeskus</p>
            </div>
          </div>
        </div>
      </section>

      {/* GATE */}
      <section className="bg-beige-light py-16 md:py-20 px-4 border-t border-b border-line">
        <div className="max-w-[560px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-60 mb-3 font-semibold">
              Keep reading
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-3 leading-tight">
              Send me the full guide
            </h2>
            <p className="text-base text-ink-60 leading-relaxed">
              We'll email you the link to the full version (5 parts, ~25 min read,
              including the 20 questions to ask any clinic). Read it now, save it for
              later, or share it with a loved one.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-lime-wash border-l-4 border-lime p-6 rounded">
              <h3 className="text-lg font-semibold text-ink mb-2">
                Thank you — the guide is on its way.
              </h3>
              <p className="text-ink-80 mb-1">
                The email has been sent. We'll take you straight to the full version now…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card p-6 md:p-8 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-line rounded focus:border-lime focus:ring-1 focus:ring-lime outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-line rounded focus:border-lime focus:ring-1 focus:ring-lime outline-none transition"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-ink mb-1">Language</label>
                <select
                  id="language"
                  name="language"
                  value={formState.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-line rounded focus:border-lime focus:ring-1 focus:ring-lime outline-none transition bg-white"
                >
                  <option value="en">English</option>
                  <option value="et">Eesti</option>
                  <option value="ru">Русский</option>
                </select>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={formState.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-lime border-line rounded focus:ring-lime"
                />
                <label htmlFor="consent" className="text-sm text-ink-60 leading-snug">
                  I agree that KSA Silmakeskus may email me the guide link and useful
                  reminders. I can unsubscribe at any time.
                </label>
              </div>

              {status === 'error' && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || !formState.consent}
                className="w-full bg-lime hover:bg-lime-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition"
              >
                {status === 'submitting' ? 'Sending…' : 'Send the guide and keep reading'}
              </button>

              <p className="text-xs text-ink-40 text-center pt-1">
                We never share your data with third parties.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-ink mb-3 text-center">
            What's in the guide
          </h2>
          <p className="text-ink-60 text-center mb-12 max-w-xl mx-auto text-sm leading-relaxed">
            Built on peer-reviewed literature and 21 years of clinical experience at
            KSA — written so that you can make an informed decision, no matter which
            clinic you ultimately choose.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Eye anatomy and how vision problems develop', body: 'Why you see the way you do — and what surgery actually changes inside the eye.' },
              { title: 'LASIK vs SMILE vs Flow3 — honest comparison', body: 'Each method’s strengths, risks, and long-term effects on corneal strength.' },
              { title: 'Corneal biomechanics', body: 'Why a 20% strength loss from LASIK shows up as problems only a decade later.' },
              { title: 'Recovery day by day', body: 'Exactly what happens inside the eye on days 1, 3, 7 and 30. Without sugar-coating.' },
              { title: 'Presbyopia and lens ageing', body: 'Why reading glasses come back around age 45 — and what to do about it.' },
              { title: '20 questions to ask any clinic', body: 'Print and take with you. An honest clinic answers all of them with precise numbers.' },
            ].map((item) => (
              <div key={item.title} className="border-l-4 border-lime pl-5 py-1">
                <h3 className="font-semibold text-ink mb-1">{item.title}</h3>
                <p className="text-sm text-ink-60 leading-snug">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>
    </Layout>
  );
}
