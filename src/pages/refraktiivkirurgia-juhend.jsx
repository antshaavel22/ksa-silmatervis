import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function RefraktiivkirurgiaJuhendLP() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    language: 'et',
    consent: false,
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
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
          source: 'refraktiivkirurgia-juhend-gate',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Tekkis viga. Palun proovi uuesti.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Refraktiivkirurgia tarbijajuhend — Dr. Ants Haavel | KSA Silmakeskus</title>
        <meta
          name="description"
          content="Tasuta 25-minutiline juhend, mille Dr. Ants Haavel kirjutas 21 aasta praktika ja 55 000 protseduuri baasil. 20 küsimust, mis aitavad valida õige kliiniku ja meetodi."
        />
        <meta property="og:title" content="Refraktiivkirurgia tarbijajuhend — Dr. Ants Haavel" />
        <meta
          property="og:description"
          content="Tasuta juhend, mis aitab teha teadliku otsuse oma silmade kohta. KSA Silmakeskus, 21 aastat, 55 000 protseduuri, 0 ektaasia juhtumit."
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://silmatervis.ksa.ee/images/guide/dr-haavel-portrait.jpg" />
        <link rel="canonical" href="https://silmatervis.ksa.ee/refraktiivkirurgia-juhend" />
      </Head>

      {/* HERO */}
      <section className="bg-beige-light py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: copy + form */}
          <div>
            <div className="inline-block text-xs uppercase tracking-widest font-semibold text-lime-darker mb-4">
              Tasuta juhend • 25 min lugemine
            </div>
            <h1 className="font-sans text-4xl md:text-5xl font-semibold text-ink leading-tight mb-6 tracking-tight">
              Refraktiivkirurgia tarbijajuhend
            </h1>
            <p className="text-lg text-ink-80 mb-6 leading-relaxed">
              Dr. Ants Haaveli koostatud juhend, mis aitab Sul valida õige
              meetodi ja kliiniku. Põhineb 21 aasta praktikal, 55&nbsp;000+
              protseduuril ja kümnetel teaduslikel uuringutel.
            </p>
            <p className="text-base text-ink-60 mb-8 leading-relaxed">
              Sees: 20 küsimust, mille abil hindad iga kliiniku kompetentsi.
              Aus võrdlus LASIK, SMILE, Flow3 ja silmasiseste läätsede vahel.
              Tehnoloogia, riskid ja taastumine arusaadavas keeles.
            </p>

            {/* FORM */}
            {status === 'success' ? (
              <div className="bg-lime-wash border-l-4 border-lime p-6 rounded">
                <h2 className="text-xl font-semibold text-ink mb-2">
                  Aitäh! Juhend on teel.
                </h2>
                <p className="text-ink-80">
                  Saatsime Sulle e-mailile lingi täisversioonile. Kontrolli oma
                  postkasti (ja igaks juhuks ka rämpsposti kausta).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">
                    Nimi
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-line rounded focus:border-lime focus:ring-1 focus:ring-lime outline-none transition"
                    placeholder="Sinu nimi"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-line rounded focus:border-lime focus:ring-1 focus:ring-lime outline-none transition"
                    placeholder="sinu@email.ee"
                  />
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-ink mb-1">
                    Keel
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formState.language}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-line rounded focus:border-lime focus:ring-1 focus:ring-lime outline-none transition bg-white"
                  >
                    <option value="et">Eesti</option>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
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
                    Nõustun, et KSA Silmakeskus saadab mulle juhendi lingi
                    e-mailile ja vajadusel kasulikke meeldetuletusi seoses minu
                    sooviga. Saan tellimusest igal ajal loobuda.
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
                  {status === 'submitting' ? 'Saadame…' : 'Saada mulle juhend'}
                </button>

                <p className="text-xs text-ink-40 text-center pt-1">
                  Sinu andmeid ei jaga me kunagi kolmandate osapooltega.
                </p>
              </form>
            )}
          </div>

          {/* Right: portrait */}
          <div className="hidden md:block">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-pop">
              <Image
                src="/images/guide/dr-haavel-portrait.jpg"
                alt="Dr. Ants Haavel, KSA Silmakeskuse asutaja ja meditsiinijuht"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p className="text-sm text-ink-60 mt-3 italic">
              Dr. Ants Haavel — KSA Silmakeskuse asutaja, silmakirurg, 21 aastat
              praktikat.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white py-12 px-4 border-b border-line">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-lime-darker mb-1">
              21
            </div>
            <div className="text-sm text-ink-60 uppercase tracking-wide">
              aastat praktikat
            </div>
          </div>
          <div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-lime-darker mb-1">
              55&nbsp;000+
            </div>
            <div className="text-sm text-ink-60 uppercase tracking-wide">
              protseduuri
            </div>
          </div>
          <div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-lime-darker mb-1">
              0
            </div>
            <div className="text-sm text-ink-60 uppercase tracking-wide">
              ektaasia juhtumit
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-3 text-center">
            Mida juhendist leiad
          </h2>
          <p className="text-ink-60 text-center mb-12 max-w-xl mx-auto">
            See ei ole müügimaterjal. See on materjal, mis põhineb teaduskirjandusel
            ja KSA 21 aasta kogemusel — kirjutatud nii, et oskaksid teha teadliku
            otsuse, ükskõik millisesse kliinikusse Sa lõpuks lähed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Silma anatoomia ja nägemishäirete teke',
                body: 'Miks Sa näed nii nagu näed — ja mida operatsioon tegelikult silmas muudab.',
              },
              {
                title: 'LASIK vs SMILE vs Flow3 — aus võrdlus',
                body: 'Iga meetodi tugevused, riskid ja pikaajalised tagajärjed sarvkesta tugevusele.',
              },
              {
                title: 'Sarvkesta biomehaanika — see, mida turundus ei räägi',
                body: 'Miks 20% tugevuse kadu LASIK-ist tähendab probleeme alles 10 aastat hiljem.',
              },
              {
                title: 'Taastumine päev-päevalt',
                body: 'Mis täpselt juhtub silmas 1., 3., 7. ja 30. päeval. Ilma ilustamata.',
              },
              {
                title: 'Presbüoopia ja silmaläätse vananemine',
                body: 'Miks 45+ vanuses tuleb prilliprobleem tagasi — ja mida sellega teha.',
              },
              {
                title: '20 küsimust kliinikule',
                body: 'Trüki välja ja vii kaasa. Aus kliinik vastab kõigile täpsete numbritega.',
              },
            ].map((item) => (
              <div key={item.title} className="border-l-4 border-lime pl-5 py-1">
                <h3 className="font-semibold text-ink mb-1">{item.title}</h3>
                <p className="text-sm text-ink-60 leading-snug">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR PROMISE */}
      <section className="bg-beige-light py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="font-serif italic text-2xl md:text-3xl text-ink leading-relaxed mb-6">
            "Kui Sa loed selle juhendi läbi ja otsustad minna mõnda teise kliinikusse,
            on see igati arusaadav. Aga usun, et see materjal aitab Sul leida parima
            kliiniku ja arsti just Sinu vajaduste jaoks."
          </blockquote>
          <p className="text-ink-60 text-sm">— Dr. Ants Haavel</p>
        </div>
      </section>
    </Layout>
  );
}
