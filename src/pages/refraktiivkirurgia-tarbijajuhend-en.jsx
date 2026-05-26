import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import GuideLayout from '@/components/GuideLayout';

/**
 * English version of the refractive surgery patient guide.
 * Independent article written in Dr. Haavel's voice — not a translation.
 * Same structure as the bystander-polished ET version.
 * lang="en" routing handled by _document.jsx + GuideLayout.
 */
export default function RefraktiivkirurgiaTarbijajuhendEn() {
  return (
    <GuideLayout publicationDate="2026-05-26" lang="en">
      <Head>
        <title>Refractive Surgery — A Patient Guide | KSA Silmakeskus</title>
        <meta
          name="description"
          content="A patient guide to refractive surgery, written by Dr. Ants Haavel from 21 years of practice and 55,000+ procedures at KSA Silmakeskus."
        />
        <link rel="canonical" href="https://silmatervis.ksa.ee/refraktiivkirurgia-tarbijajuhend-en" />
      </Head>

      {/* TITLE PAGE */}
      <section className="max-w-[680px] mx-auto px-6 pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="border-b border-[#e8e4dc] pb-6 mb-12">
          <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#6f7f80] font-semibold">
            Patient Guide &nbsp;·&nbsp; KSA Silmakeskus &nbsp;·&nbsp; Vol. I, May 2026
          </p>
        </div>

        <h1
          aria-label="Refractive Surgery — A Patient Guide"
          className="font-serif text-[40px] md:text-[56px] font-medium text-[#1a1a1a] leading-[1.04] mb-6"
          style={{ letterSpacing: '-0.018em' }}
        >
          Refractive Surgery
        </h1>

        <p className="font-serif italic text-[19px] md:text-[22px] text-[#1a1a1a] mb-12 leading-[1.4] max-w-[560px]">
          What you need to know before choosing a clinic and a method for your eyes.
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[#6f7f80] tracking-wide">
          <span><strong className="text-[#1a1a1a] font-medium">Author:</strong> Dr. Ants Haavel</span>
          <span className="text-[#bbbbbb]">·</span>
          <span><strong className="text-[#1a1a1a] font-medium">Published:</strong> 26 May 2026</span>
          <span className="text-[#bbbbbb]">·</span>
          <span><strong className="text-[#1a1a1a] font-medium">Reading time:</strong> ~25 min</span>
        </div>
      </section>

      {/* Cover photo — journal-style inline figure */}
      <section className="max-w-[680px] mx-auto px-6 mb-8">
        <figure className="not-prose">
          <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] overflow-hidden">
            <Image
              src="/images/guide/flow3-oproom.jpg"
              alt="KSA Silmakeskus operating room — Schwind Amaris 1050RS laser"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 680px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <figcaption className="text-[12.5px] text-[#4a5a5b] mt-3 pt-2 border-t border-[#e8e4dc]" style={{ lineHeight: 1.5 }}>
            KSA Silmakeskus operating room, equipped with the Schwind Amaris 1050RS laser. Photo: KSA Silmakeskus.
          </figcaption>
        </figure>
      </section>

      <article className="prose-v2 px-6 md:px-0 pt-16 md:pt-24 pb-8">

        {/* ABSTRACT */}
        <div className="callout-abstract">
          <span className="callout-label">Read this first</span>
          <p>This guide explains how LASIK, SMILE and Flow3 differ, what examinations are needed before surgery, and which questions you should ask your doctor. It reflects clinical experience at KSA Silmakeskus, where the primary method is Flow3, but the final decision always depends on the anatomy of the individual eye.</p>
        </div>

        {/* AUTHOR POSITION */}
        <div className="callout-disclosure">
          <span className="callout-label">Author position</span>
          <p>KSA Silmakeskus specialises in Flow3 and considers it the most tissue-sparing method for suitable patients. That said, Flow3 is not right for everyone. In some cases ICL, refractive lens exchange (RLE) or continuing with glasses or contacts may be the more reasonable choice.</p>
        </div>

        {/* TOC */}
        <nav aria-label="Contents" className="guide-toc">
          <span className="callout-label">Contents</span>
          <ol>
            <li><a href="#introduction">Introduction and my position</a></li>
            <li><a href="#part-1">Part I. How glasses and lenses affect quality of life</a></li>
            <li><a href="#part-2">Part II. Comparing the methods of refractive surgery</a></li>
            <li><a href="#part-3">Part III. Invisible safety — biomechanics, ectasia, retina</a></li>
            <li><a href="#part-4">Part IV. Who is a candidate, and who is not</a></li>
            <li><a href="#part-5">Part V. Recovery and 20 questions to ask your doctor</a></li>
            <li><a href="#conclusion">Conclusion</a></li>
            <li><a href="#references">Scientific literature and sources</a></li>
          </ol>
        </nav>
      </article>

      <article className="prose-v2 px-6 md:px-0 pb-16 md:pb-24">

        <h2 id="introduction">
          <span className="chapter-eyebrow">Introduction</span>
          <span className="chapter-title">Why I wrote this guide</span>
        </h2>

        <p>In 21 years of practice I have seen thousands of patients who arrive with high expectations and a long list of questions, and who leave the examination saying: "I need to think this through." This is not because we fail to explain. Refractive surgery is genuinely multilayered, and the volume of information a patient receives in a one-hour examination is simply too much.</p>

        <p>New and unfamiliar terms — Flow, SMILE, Femto-LASIK, corneal biomechanics, lens exchange, ectasia — can leave a person disoriented. How do you make a decision that will change your daily quality of life if you do not fully understand what will happen to your eyes?</p>

        <p>Over time I came to see that Estonia lacks a patient-facing guide to laser vision correction: a document that is technically accurate but written so that a non-medical reader can understand it.</p>

        <p>Each clinic mostly talks about itself and its own methods. The patient is left to assemble the terms, risks, promises and competing approaches on their own. This guide was written to make that choice calmer and clearer.</p>

        <h3>What this guide is — and what it is not</h3>

        <p>This is not a sales brochure. If you read it and decide to go to a different clinic, that is a perfectly reasonable outcome. My aim is different: to help you better understand your options and choose a clinic and a doctor you can calmly trust with your eyes.</p>

        <p>This guide is built on:</p>

        <ul>
          <li>the clinical experience of KSA Silmakeskus;</li>
          <li>peer-reviewed scientific literature;</li>
          <li>clinical facts rather than marketing claims.</li>
        </ul>

        <p>You will find:</p>

        <ul>
          <li>links to peer-reviewed studies behind the main claims;</li>
          <li>the experience of KSA over 21 years and more than 55,000 procedures;</li>
          <li>an honest look at alternatives such as ICL and lens exchange, even though our clinic does not routinely offer them.</li>
        </ul>

        <p>And most importantly, at the end of the guide you will find <strong>20 questions</strong> that help you take stock of your own situation — or evaluate the competence of any specialist or clinic you may visit.</p>

        <h3>My position</h3>

        <p>My position is open: at KSA Silmakeskus the primary method is Flow3 — transepithelial PRK. I consider this approach particularly tissue-sparing for patients whose eye anatomy suits it. This view is based on corneal biomechanics and more than 20 years of accumulated clinical data.</p>

        <p>That said, Flow3 is not right for everyone. In some cases the more reasonable option is ICL (an implantable lens), refractive lens exchange, careful observation, or simply continuing with glasses or contacts. The long-term health of your eyes always matters more than where, or with whom, the procedure is done.</p>

        <h3>One more important point</h3>

        <p>If, after reading this guide, you decide to come to KSA Silmakeskus for an examination, we would be happy to examine you. But let me be direct: not every person is a candidate for Flow3.</p>

        <p>We say "no" to roughly one in four candidates. This is not a formality and not caution "just in case." It is part of a strict medical safety standard. If a person cannot safely undergo laser correction, an honest refusal is not bad news — it is protection from a risk they may not have known existed.</p>

        <p>With care for the health of your eyes and the quality of your life for many years to come,</p>

        <p>
          <strong>Dr. Ants Haavel</strong><br />
          founder and medical director<br />
          KSA Silmakeskus
        </p>

        <hr />

        <h2 id="part-1">
          <span className="chapter-eyebrow">Part I</span>
          <span className="chapter-title">How glasses and lenses affect quality of life. Eye anatomy</span>
        </h2>

        <h3>The everyday weight of vision correction</h3>

        <p>Glasses and contact lenses become so familiar that the dependence on them turns into a routine you stop noticing. Underneath the routine, though, are a number of small daily compromises that quietly limit quality of life.</p>

        <ul>
          <li>Glasses fog up with temperature changes.</li>
          <li>Sports and physical activity have to be planned around your correction.</li>
          <li>Eyes feel dry and tired after a full day in contacts.</li>
        </ul>

        <p>Over years, the body of small adjustments grows.</p>

        <p>On top of the daily discomfort, glasses and contacts become a meaningful long-term expense. Clinical and economic estimates suggest that a typical contact-lens wearer spends roughly €18,000 over 20 years on glasses, lenses, solutions, care products and prescription sunglasses. For comparison: a Flow3 procedure at KSA Silmakeskus costs €2,990. Stepping away from glasses and contacts is therefore not only a quality-of-life decision — over the long term it is also a logical and economically sound medical choice.</p>

        <h3>The eye as an optical system</h3>

        <p>To understand how laser surgery improves vision, it helps to revisit the basic anatomy. The eye is a sophisticated optical system in which light rays must focus precisely on the retina.</p>

        <p><strong>Cornea.</strong> The cornea is the transparent front layer of the eye, only about half a millimetre thick (500–600 microns). Despite its thinness, it is the eye's most powerful "lens" — it does roughly two-thirds of the focusing work (about 43 dioptres). Because the cornea bends light the most, microscopic and precise reshaping of its surface is the main target of modern laser surgery.</p>

        <p><strong>Lens.</strong> The crystalline lens sits deeper in the eye, behind the iris. It is responsible for the remaining third of focusing. In youth the lens is elastic and reshapes itself through the action of tiny muscles, letting us see both far and near. With age, that elasticity fades, producing age-related near-vision difficulty — presbyopia.</p>

        <p><strong>Retina.</strong> The retina is the light-sensitive nerve layer at the back of the eye. It receives incoming light, converts it into electrical signals and sends them through the optic nerve to the brain, where the image we see is formed.</p>

        <h3>Vision problems and what causes them</h3>

        <p>Medical projections suggest that by 2050 about half of the world's population will be myopic. Genetics, time on screens and reduced exposure to daylight all push this trend further.</p>

        <p>Vision problems — refractive errors — happen when the eye's anatomy does not let light focus properly on the retina.</p>

        <p><strong>Myopia (short-sightedness).</strong> The eyeball is slightly too long, or the cornea too steep. Light focuses in front of the retina. The person sees clearly up close but the distance is blurred. During laser correction the central cornea is gently flattened so that the focus moves back onto the retina.</p>

        <p><strong>Hyperopia (long-sightedness).</strong> The eyeball is too short, or the cornea too flat, so light focuses behind the retina. At a younger age the lens can compensate, but with time focusing becomes tiring — first near vision suffers, then distance vision too.</p>

        <p><strong>Astigmatism.</strong> The cornea is not perfectly round (like a basketball) but slightly oval and uneven (like a rugby ball). Light bends differently along different axes, creating multiple focal points, so vision is blurred and distorted at all distances.</p>

        <hr />

        <h2 id="part-2">
          <span className="chapter-eyebrow">Part II</span>
          <span className="chapter-title">Refractive surgery methods and how they compare</span>
        </h2>

        <p>Laser vision correction has come a long way over the past fifty years, both medically and technologically. Three main approaches dominate today: flap-based methods (LASIK), small-incision methods (SMILE) and surface methods (PRK, tPRK, Flow3). All of them change how light bends at the cornea and can deliver sharp vision. Their technical execution and — crucially — long-term effect on the health and anatomy of the eye are very different.</p>

        {/* COMPARISON TABLE */}
        <table className="prose-v2-table">
          <caption>A comparison of the three main refractive surgery methods: mechanics, primary benefit, key trade-off.</caption>
          <thead>
            <tr>
              <th>Method</th>
              <th>How it is performed</th>
              <th>Main benefit</th>
              <th>Key trade-off</th>
              <th>When alternatives deserve a serious discussion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LASIK / Femto-LASIK</td>
              <td>A laser creates a corneal flap; the correction is performed underneath it</td>
              <td>Quick recovery; sharp vision often by the next day</td>
              <td>Biomechanical strength of the eye is reduced by 20–25%; some risk of flap displacement remains long-term</td>
              <td>Active or contact sports; high myopia; thinner corneas</td>
            </tr>
            <tr>
              <td>SMILE</td>
              <td>A small lenticule of tissue is shaped within deep corneal layers and removed through a 2–3 mm incision</td>
              <td>No large flap; relatively fast recovery</td>
              <td>Tissue is removed from deep stromal layers; a vacuum is used that briefly raises intraocular pressure</td>
              <td>High myopia; thin retina; cases where future re-treatment may be needed</td>
            </tr>
            <tr>
              <td>Flow3 (transepithelial PRK)</td>
              <td>Only the surface epithelium is removed; the laser reshapes the cornea directly on its surface</td>
              <td>About 85–90% of biomechanical strength preserved; no flap, no vacuum</td>
              <td>Recovery of 3–5 days; vision unstable in the first days</td>
              <td>When immediate sharp vision is required, or when untreated severe dry eye is present</td>
            </tr>
          </tbody>
        </table>

        <h3>An important lesson from medical history</h3>

        <p>To understand why many leading clinics are now returning to surface methods, it helps to know the history of the field. In the 1970s and 80s, short-sightedness was corrected with radial keratotomy (RK): the surgeon made deep microscopic incisions around the corneal periphery. Initial results looked good. Ten to twenty years later, however, a serious pattern emerged — the incisions had permanently weakened the eye. In nearly 43% of treated eyes the cornea biomechanically gave way over time, causing unpredictable vision changes.</p>

        <p>The lesson for ophthalmology was foundational: any procedure that cuts through deep corneal structures reduces the eye's strength and carries long-term risk.</p>

        <h3>Flap methods: LASIK and Femto-LASIK</h3>

        <p>LASIK is known worldwide for its quick recovery, minimal discomfort and good vision often by the next day.</p>

        <p><strong>How it works.</strong> The surgeon creates a thin corneal flap using a laser or a mechanical blade. The flap is lifted, an excimer laser removes the necessary amount of tissue underneath, and the flap is then repositioned.</p>

        <p><strong>Clinical advantages:</strong> vision often becomes sharp the next day; recovery is fast; postoperative discomfort is minimal.</p>

        <p><strong>Medical limits and risks.</strong> Creating the flap cuts through the strongest anterior collagen fibres of the cornea. As a result:</p>

        <ul>
          <li>biomechanical strength of the eye drops by roughly 20–25%;</li>
          <li>a significant portion of corneal nerves is severed;</li>
          <li>the risk of chronic dry-eye syndrome increases.</li>
        </ul>

        <p>Research shows that the flap does not fully recover its original biological strength. A small risk of flap displacement therefore remains long-term, especially in trauma or contact sports.</p>

        <h3>SMILE</h3>

        <p>SMILE — Small Incision Lenticule Extraction — was developed as an alternative to LASIK to avoid creating a large flap.</p>

        <p><strong>How it works.</strong> A femtosecond laser shapes a small lens-like piece of tissue (a lenticule) within the deeper layers of the cornea. A 2–3 mm incision is then made on the surface and the surgeon manually extracts the lenticule.</p>

        <p><strong>Clinical advantages:</strong> no large flap; some surface strength preserved; recovery is relatively fast.</p>

        <p>SMILE is often described as "flapless." It is — in the sense that no large flap is created. But tissue is still removed from the deep corneal layers, so the biomechanical strength of the cornea is also reduced. SMILE should not be judged on incision size alone.</p>

        <p>Another important point is the use of vacuum. During the procedure the eye is fixated by a suction cup that briefly raises intraocular pressure to 4–5 times its normal value (up to 65–90 mmHg). This creates mechanical load on the back of the eye and warrants particular caution in patients with high myopia, a thin retina, or a longer eyeball. Later touch-up corrections after SMILE are also technically harder.</p>

        <h3>Modern surface methods and the no-touch Flow3</h3>

        <p>Recognising the long-term risks of cutting, many leading surgeons and KSA Silmakeskus have returned to the most tissue-sparing surface methods: PRK, tPRK and Flow3. The approach places long-term ocular health above short-term comfort.</p>

        <p>In Flow3 no flap is created and no incisions are made in the deep layers of the cornea. The laser works on the surface, after the epithelium is removed, and the epithelium then regrows naturally.</p>

        <p>As a result, the anterior — strongest — layers of the cornea are better preserved. For the patient that means a more biomechanically sparing approach, no flap-related risks and no vacuum fixation during the procedure.</p>

        <p><strong>Clinical advantages:</strong></p>

        <ul>
          <li><strong>Preserved biomechanical strength.</strong> Because deep corneal structures are not cut, the eye keeps almost all of its natural strength. Strength loss is only about 10–15%, which keeps the risk of corneal ectasia to a minimum.</li>
          <li><strong>No flap-related risks.</strong> With no flap, flap-displacement risk is avoided. The method suits athletes, people with active lifestyles, young parents and anyone in contact sports.</li>
          <li><strong>No vacuum-related pressure spike.</strong> Because no vacuum is used, the brief rise in intraocular pressure seen with flap-based methods is avoided. This may be especially relevant for patients with high myopia.</li>
          <li><strong>Lower risk of chronic dry eye.</strong> The corneal nerve network is not severed at scale, so the chance of severe chronic dry-eye syndrome is substantially lower.</li>
        </ul>

        <p><strong>The trade-off: longer recovery.</strong> Flow3 asks for a little more patience in the first days. The epithelium typically regrows in 3–5 days. During that time vision may be unstable, the eyes may water, light sensitivity is common, and a foreign-body sensation can appear. It is uncomfortable, but in most cases it is a normal part of healing.</p>

        <p><strong>The KSA approach.</strong> Eye health for the next 30–50 years should not be traded for a few days of comfort. The numbers support this view: over 21 years and more than 55,000 surface procedures, KSA records show zero registered cases of corneal ectasia. Choosing a biomechanically sparing method preserves more strength reserve in the cornea over the long term.</p>

        <hr />

        <h2 id="part-3">
          <span className="chapter-eyebrow">Part III</span>
          <span className="chapter-title">Invisible safety: biomechanics, ectasia and retina</span>
        </h2>

        <p>Walk into a laser clinic and you will mostly hear about what happens on day one. The real, invisible safety of the eye reveals itself <strong>5, 10 and 20 years later</strong>.</p>

        <p>To understand why many leading surgeons — and KSA Silmakeskus — prefer no-touch surface methods, we need to look inside the cornea. This chapter covers three topics that decide the long-term health of the eye: biomechanics, ectasia and retinal safety.</p>

        <h3>Corneal biomechanics — the thing people rarely talk about</h3>

        <p>The cornea is not just a transparent film. Its main layer — the <strong>stroma</strong> — makes up about 90% of corneal thickness and is built from hundreds of interwoven collagen fibres. These fibres work like steel cables: they hold the shape of the eye, resist intraocular pressure and provide the structural integrity of the whole organ. The most important fact: the <strong>anterior third of the cornea is the biomechanically strongest</strong>.</p>

        <p><strong>What happens during LASIK.</strong> In LASIK or Femto-LASIK, the laser creates a flap. This means the strongest anterior collagen fibres are cut and they do not recover their original strength. Modern measurements show that <strong>flap-based methods reduce the eye's strength by roughly 20–25%</strong>. It is similar to cutting the main load-bearing beams of a bridge — the bridge may still stand, but its load capacity is no longer the same.</p>

        <p><strong>And SMILE?</strong> SMILE is often described as flapless. It is, in that no large flap is created. But tissue is still removed from the deep corneal layers, and corneal biomechanical strength is also reduced.</p>

        <p><strong>The surface-method philosophy.</strong> Flow3, PRK and tPRK work the other way around. Only the regenerative surface epithelium is removed; the laser reshapes the cornea directly on the surface; the deep structures are not cut. As a result the natural strength of the eye is preserved as fully as possible — and that preservation lasts decades, not just on day one.</p>

        <h3>21 years and zero registered cases of ectasia</h3>

        <p><strong>Ectasia</strong> is one of the most feared late complications in refractive surgery. It occurs when a cornea weakened by surgery can no longer withstand intraocular pressure and gradually bulges outward. Vision degrades irreversibly, the cornea loses its shape, and severe cases may require corneal transplantation.</p>

        <p><strong>Why the risk is higher with LASIK and SMILE.</strong> Both methods carry a meaningfully higher ectasia risk because they remove or transect deeper tissue. To manage that risk, surgeons use the <strong>residual stromal bed rule</strong>.</p>

        <p><strong>What is RSB?</strong> RSB (Residual Stromal Bed) is the untouched stromal thickness left after surgery. The arithmetic:</p>

        <p><em>initial corneal thickness − tissue removed − flap thickness = residual stromal bed.</em></p>

        <p>The safe minimum is generally <strong>250–300 microns</strong>. The problem with LASIK and SMILE is that a significant share of tissue is spent on the flap or the internal pocket (typically 100–120 microns), which often leaves the RSB at the edge of safety. Because Flow3 does not consume tissue on a flap, the safety margin remains substantially thicker.</p>

        <p><strong>The KSA record.</strong> Thanks to the no-touch surface method and strict patient selection, KSA Silmakeskus has not registered a single case of ectasia in 21 years and more than 55,000 procedures. That is not luck. It is the result of daily clinical work in which long-term patient safety always comes first.</p>

        <p className="pull-quote">21 years, more than 55,000 surface procedures, and not a single registered case of corneal&nbsp;ectasia.</p>

        <h3>Vacuum and retina — what is rarely discussed</h3>

        <p>When laser surgery is discussed, the conversation is almost always about the cornea. But the eye is a single system, and what happens during surgery can also affect its deepest structures — particularly the <strong>retina</strong> and <strong>vitreous</strong>.</p>

        <p><strong>What happens during LASIK and SMILE.</strong> To keep the eye absolutely still, a vacuum suction cup is used. It raises intraocular pressure sharply — <strong>4–5 times above normal, to 65–90 mmHg, for roughly 20–35 seconds</strong>.</p>

        <p>Picture an eye absorbing a sudden mechanical load. The posterior segment receives an abrupt push. This deserves particular care in patients with high myopia, where the globe is anatomically longer and the retina is often thinner and stretched. The vacuum spike can, rarely, trigger a posterior vitreous detachment or a retinal tear.</p>

        <p><strong>What happens during Flow3.</strong> Flow3 does not require vacuum fixation. As a result the procedure avoids the brief intraocular pressure rise associated with fixation-based methods. For patients with high myopia this is an important anatomical argument. The state of the retina is still assessed individually.</p>

        <p><strong>How is the eye kept still without vacuum?</strong> Because no incisions are needed, the eye is free to move slightly. Instead of mechanical fixation, an ultra-fast eye-tracking system is used. The eye-tracker analyses eye movement more than 1,000 times per second in seven dimensions and instantly corrects the laser's direction. If the eye moves slightly, the beam follows. The result is high precision without physical pressure on the eye.</p>

        <hr />

        <h2 id="part-4">
          <span className="chapter-eyebrow">Part IV</span>
          <span className="chapter-title">Who is a candidate, and who is not</span>
        </h2>

        <p><em>Diagnostics and patient selection</em></p>

        <p>When a patient walks into a laser clinic, the main question is usually: "Is this surgery safe for me?" The medical reality is that serious complications are rarely caused by "bad luck" or chance. Almost always they trace back to incomplete diagnostics, loose selection criteria, or a poor risk assessment.</p>

        <p>Safe laser correction does not start in the operating room. It starts in the diagnostic suite.</p>

        <h3>Why KSA turns away roughly one in four candidates</h3>

        <p>KSA Silmakeskus declines roughly 25–30% of candidates. This is not a formality and not caution "just in case." It is part of a strict medical safety standard. If a person cannot safely undergo laser correction, an honest refusal is not bad news — it is protection from a risk they may not have known existed.</p>

        <h3>When Flow3 may not be the right choice</h3>

        <p>Although KSA Silmakeskus prefers Flow3 for its tissue-sparing logic and long-term safety profile, the method is not right for every person or every eye. Good refractive surgery begins not with "which procedure?" but with "is intervention even reasonable?"</p>

        <p>This is exactly why a thorough examination before surgery matters so much. The goal of a laser procedure is not simply to remove a number from a prescription. The goal is to improve quality of life in a way that does not put long-term ocular health at risk.</p>

        <p>Flow3 may not be a suitable choice when the cornea is too thin, has an irregular shape, or shows signs of hidden biomechanical weakness. In those cases even the most sparing surface method may be an unreasonable risk. The same applies when the prescription is not yet stable — when the dioptre changes year over year, it is wiser to wait and observe than to rush.</p>

        <p>Severe or untreated dry-eye syndrome is also a significant contraindication. Dry eye is not just a discomfort — it affects the corneal surface, the accuracy of measurements, the healing process and final visual quality. Sometimes the surface has to be treated first, and only then should a laser procedure be considered.</p>

        <p>Flow3 is also not the right answer when the main problem is no longer corneal shape, but the natural ageing of the crystalline lens. Around the age of 40–50 many patients begin to experience presbyopia — difficulty seeing up close. When early cataract is also present, looking ahead it may be more reasonable to discuss intraocular lens exchange rather than a corneal laser procedure.</p>

        <p>Some patients are best served by no operation at all. If the expectation is absolute perfection in every lighting condition, at every age, with no compromise, the conversation has to start with expectations. Refractive surgery can deliver a large quality-of-life gain — it cannot undo the biology of the eye.</p>

        <p>Sometimes the better path is ICL (an implantable contact lens), refractive lens exchange (RLE), or simply continuing with glasses or contacts. This is not a failure. On the contrary: if the examination shows that laser correction is not the best solution for your eyes, knowing that is a valuable result.</p>

        <p>At KSA Silmakeskus we say "no" to roughly one in four candidates. We do not do this to be over-cautious. We do it so the laser procedure stays with those eyes where benefit and safety are clearly aligned. A good outcome begins with the right choice, not with the day of surgery.</p>

        <h3>What happens during a thorough examination</h3>

        <p>A good pre-surgery examination should take roughly an hour and rely on several high-precision instruments. Each device answers one specific question about the health and integrity of the eye.</p>

        {/* DIAGNOSTIC PHOTO */}
        <figure>
          <Image
            src="/images/guide/diagnostic-oct.jpg"
            alt="Corneal diagnostics at KSA Silmakeskus"
            width={1800}
            height={1200}
            sizes="(max-width: 768px) 100vw, 720px"
            style={{ width: '100%', height: 'auto' }}
          />
          <figcaption>
            Precise measurement of corneal thickness and shape before any decision. Photo: KSA Silmakeskus.
          </figcaption>
        </figure>

        {/* CLINICAL PROTOCOL LIST */}
        <ul className="protocol-list">
          <li>
            <span className="protocol-num">1</span>
            <div className="protocol-body">
              <strong className="protocol-title">Sirius Plus — corneal topography and tomography</strong>
              <p className="protocol-text">A high-precision 3D map of your cornea. Asymmetry, excessive steepening or suspicious thinning on this map can indicate hidden keratoconus — a state in which the cornea is already biomechanically weakened. Modern software can detect that risk well before any symptoms appear.</p>
            </div>
          </li>
          <li>
            <span className="protocol-num">2</span>
            <div className="protocol-body">
              <strong className="protocol-title">Pachymetry — corneal thickness</strong>
              <p className="protocol-text">The cornea has to be thick enough for the eye to retain its strength after laser shaping. For surface methods such as Flow3 the pre-surgical minimum is around 450 microns. The residual stromal bed (RSB) rule then requires that at least 250–300 microns of untouched tissue remain afterwards. Because Flow3 does not consume tissue on a flap, the safe layer usually stays substantially thicker.</p>
            </div>
          </li>
          <li>
            <span className="protocol-num">3</span>
            <div className="protocol-body">
              <strong className="protocol-title">OCT — optical coherence tomography</strong>
              <p className="protocol-text">Lets us study the retina, the optic nerve and the deep structures of the eye in detail. This is how early glaucoma, retinal disease and weakened areas of the fundus are identified.</p>
            </div>
          </li>
          <li>
            <span className="protocol-num">4</span>
            <div className="protocol-body">
              <strong className="protocol-title">Pupillometry — pupil dynamics</strong>
              <p className="protocol-text">Measures pupil diameter in bright light, in twilight and in darkness. This matters because patients with a larger pupil diameter combined with higher myopia carry a higher risk of postoperative night-vision artefacts — halos, starbursts and glare around light sources. The doctor is obliged to discuss this honestly in advance.</p>
            </div>
          </li>
          <li>
            <span className="protocol-num">5</span>
            <div className="protocol-body">
              <strong className="protocol-title">Dry-eye diagnostics</strong>
              <p className="protocol-text">During the examination tear film quality, tear production and ocular surface stability are assessed using Schirmer's test and TBUT. If dry-eye syndrome is severe, surgery is postponed until the ocular surface is treated.</p>
            </div>
          </li>
        </ul>

        <h3>Who Flow3 suits</h3>

        <p>An optimal candidate typically meets the following criteria:</p>

        <ul>
          <li><strong>Age 18–45.</strong> Under 18 the eye is still developing. After 45 the natural ageing of the lens — presbyopia — becomes the dominant factor.</li>
          <li><strong>A stable prescription.</strong> The prescription should not have shifted by more than 0.5 dioptres in the last two years.</li>
          <li><strong>A suitable range of dioptres.</strong> Best results: myopia from −1 to −8; astigmatism up to −4.</li>
          <li><strong>Pregnancy and breastfeeding.</strong> A temporary contraindication. Hormonal changes affect corneal shape, thickness and tear film stability. Surgery is recommended 6–12 months after breastfeeding ends.</li>
          <li><strong>Systemic disease.</strong> Active autoimmune disease, severe diabetes or pronounced inflammatory states can be contraindications because they affect tissue healing.</li>
        </ul>

        <h3>What the alternatives are</h3>

        <p><strong>1. ICL — implantable contact lens.</strong> When myopia is very high or the cornea is too thin, ICL is a strong alternative. A specialised lens is placed inside the eye in front of the natural lens. Advantage: the cornea is not weakened, and the procedure is reversible.</p>

        <p><strong>2. Refractive lens exchange (RLE).</strong> For patients over 50, lens exchange is often the more logical choice — especially when presbyopia or early cataract is already developing.</p>

        <p><strong>3. Glasses and contact lenses.</strong> For some patients the most reasonable and safe option is to continue with glasses or contacts. This is not a defeat. Good medicine consists of choosing the solution that is genuinely safe for your specific eyes.</p>

        <h3>The point of an examination</h3>

        <p>The point of a thorough examination is not to sell surgery. It is to find the most appropriate and safe solution for your eyes specifically. A good clinic is always ready to decline, to suggest an alternative or to recommend waiting if that serves the long-term health of the eye.</p>

        <hr />

        <h2 id="part-5">
          <span className="chapter-eyebrow">Part V</span>
          <span className="chapter-title">Life after surgery and looking ahead</span>
        </h2>

        <p><em>Recovery, presbyopia and the 20 questions to ask</em></p>

        <p>Once the diagnostics are complete and a safe method has been chosen, the most personal phase for the patient begins: what will life look like after the procedure?</p>

        <p>Flap-based methods often promise a "wow effect" by the next morning. The philosophy of surface methods like Flow3 (PRK/tPRK) is different: a few days of patience in exchange for long-term strength and safety of the eye.</p>

        <h3>How recovery unfolds</h3>

        <p>During Flow3 the surface layer of the cornea — the epithelium — is removed. Unlike deeper tissues, the epithelium has an exceptional ability to regenerate.</p>

        <h4>The first 1–3 days</h4>

        <p>Immediately after the procedure a protective contact lens is placed on the eye. It shields the nerve endings, reduces discomfort and supports the epithelium as it regrows.</p>

        <p>The eye is actively healing during these days. About 10% of patients experience moderate discomfort, a sand-in-the-eye sensation, light sensitivity and watering. Vision is usually blurred and unstable — as if looking through water. This is a normal physiological reaction. When needed it is managed with painkillers and anti-inflammatory drops.</p>

        <h4>Days 3–5</h4>

        <p>The epithelium has typically regrown by this point and the protective lens is removed. Discomfort fades quickly, light sensitivity reduces and vision begins to clear noticeably. Most patients gradually return to ordinary daily activity.</p>

        <h4>The first weeks</h4>

        <p>Over a few weeks the corneal surface continues to smooth out. Vision can vary slightly — better in the morning, slightly less so in the evening, occasionally unstable.</p>

        <p>Many patients also notice halos, glare and starbursts around headlights and street lamps at night. This is linked to the recovery of the corneal surface and to pupil dilation in low light. These effects usually fade on their own over a few months.</p>

        <h4>Why the drops matter</h4>

        <p>After a surface procedure, careful adherence to the drop regimen is critical. The doctor will prescribe anti-inflammatory steroid drops and preservative-free lubricating drops. Their job is not just to reduce discomfort — the main goal is to control healing, prevent corneal haze and ensure the best possible long-term visual quality.</p>

        <h4>What corneal haze is</h4>

        <p>Haze is a corneal opacification that can occur during healing. It appears when corneal cells produce a less than perfectly organised collagen pattern. Modern technology — SmartPulse, cooled solutions and specific medications — has substantially reduced the risk of haze. Even so, correct use of the prescribed drops remains essential.</p>

        <h3>Presbyopia — why arms get "shorter" after 45</h3>

        <p>One of the most common fears patients bring is: <em>"What if my vision gets worse again over time?"</em></p>

        <p>Here it is medically important to separate two completely different things: post-surgical regression, and the natural ageing of the crystalline lens.</p>

        <h4>Regression</h4>

        <p>Regression means the cornea gradually drifts a little back towards its pre-surgical shape. With modern surface methods this is rare — statistics show that <strong>fewer than 3% of patients need a re-treatment within 7 years</strong>. At KSA Silmakeskus there is a 7-year guarantee and a free re-treatment when warranted.</p>

        <h4>Presbyopia — the natural ageing of the lens</h4>

        <p>Presbyopia is not a complication and not "the surgery wearing off." It is a universal physiological process that affects everyone.</p>

        <p>The crystalline lens inside the eye is highly elastic in youth, changes shape easily and lets us see well up close. From around age 40–45 it gradually loses elasticity. Reading small text becomes harder, near vision blurs and short-distance focusing feels more effortful.</p>

        <p><strong>An important point.</strong> Flow3 and other laser methods only reshape the cornea. They cannot stop the lens from ageing. So a person who had Flow3 at 30 may see beautifully at distance — and still need reading glasses at 45 or 50. This is normal eye biology.</p>

        <h4>A practical observation from recent years</h4>

        <p>In our clinical experience, today's patients tend to notice the first signs of presbyopia later than previous generations did. The lens is not ageing more slowly. Screens have simply become more comfortable, fonts can be enlarged, and reading distance is often more relaxed. The result: the practical need for reading glasses becomes obvious later in life for many people.</p>

        <h3>How to choose a clinic — 20 essential questions</h3>

        <p>By the end of this guide you know more about biomechanics, methods, risks and complications than most people walking into a consultation. Knowledge alone does not guarantee safety. Safety depends on who you trust with your eyes. The list below is what we suggest you ask the doctor — and yourself — before deciding.</p>

        <h4>Surgeon's experience</h4>

        <ol>
          <li>How many refractive procedures have you personally performed?</li>
          <li>How many do you perform per year?</li>
          <li>How many cases of ectasia have you seen in the last 5 years?</li>
          <li>Will I meet the operating surgeon before the procedure?</li>
        </ol>

        <h4>Safety and diagnostics</h4>

        <ol start="5">
          <li>What percentage of candidates do you turn away?</li>
          <li>Which diagnostic instruments do you use?</li>
          <li>What is my initial corneal thickness, and what will it be after the procedure?</li>
          <li>What residual stromal bed will remain after the procedure?</li>
          <li>Do you examine the retinal periphery?</li>
        </ol>

        <h4>Method choice</h4>

        <ol start="10">
          <li>Why do you recommend this specific method for me?</li>
          <li>What are the alternatives?</li>
          <li>How does my lifestyle affect the choice of method?</li>
          <li>How will the procedure affect dry eye over time?</li>
        </ol>

        <h4>Long-term follow-up</h4>

        <ol start="14">
          <li>How long does post-surgical follow-up last?</li>
          <li>What is your re-treatment rate?</li>
          <li>Is there a guarantee?</li>
          <li>What counts as normal recovery after surgery, and what should prompt an urgent call to the clinic?</li>
          <li>Who will look after my eyes if a question or concern arises years from now?</li>
          <li>Are my medical records stored long-term?</li>
          <li>Will I receive a written summary with my key parameters: corneal thickness, topography, residual-stroma calculation and method recommendation?</li>
        </ol>

        <hr />

        <h2 id="conclusion">
          <span className="chapter-eyebrow">Conclusion</span>
          <span className="chapter-title">Your vision is a long-term health decision</span>
        </h2>

        <p>Stepping away from glasses and contacts is not just a matter of convenience. It is a decision that affects quality of life, freedom, eye health and every day of the decades ahead.</p>

        <p>Imagine a life where you wake up and simply see; where you do not reach for glasses on the nightstand; where contacts do not dry out your eyes; where glasses do not fog in winter; where you can spontaneously head to the beach or take up a sport without worrying about correction.</p>

        <h3>The main idea of this guide</h3>

        <p>The modern world likes fast solutions. In eye surgery, however, a few extra days of recovery can be a very small price for decades of additional safety.</p>

        <p>That is why KSA Silmakeskus has chosen the most tissue-sparing approach: no flap, no deep cuts, no vacuum, and the most natural preservation of corneal strength.</p>

        <p className="pull-quote">A few extra days of recovery is a very small price for decades of additional safety for the&nbsp;eye.</p>

        {/* WARM CLOSING PHOTO */}
        <figure>
          <Image
            src="/images/guide/haavel-happy-patient.jpg"
            alt="Dr. Ants Haavel during a patient consultation"
            width={1800}
            height={1200}
            sizes="(max-width: 768px) 100vw, 720px"
            style={{ width: '100%', height: 'auto' }}
          />
          <figcaption>
            Dr. Ants Haavel during a patient consultation. Photo: KSA Silmakeskus.
          </figcaption>
        </figure>

        <h3>One last important thought</h3>

        <p>If the examination shows that laser correction is not the right choice for you, that is also a good outcome. Genuine quality medicine is not about operating on everyone. It is about honestly assessing risk, protecting eye health, and choosing a solution that is genuinely safe.</p>

        <p>With care for the health of your eyes and the quality of your life for many years to come.</p>

      </article>

      <EndOfGuideCTAsEn />

      <article id="references" className="prose-v2 px-6 md:px-0 py-16 md:py-24 border-t border-[#e8e4dc]">

        <h2>Scientific literature and sources</h2>

        <p>This guide is built on internationally recognised medical literature, the guidance of leading ophthalmological organisations and extensive long-term clinical statistics. The key sources below support the importance of corneal biomechanics, the advantages of surface methods and the prevention of ectasia.</p>

        <ol>
          <li><strong>Xin Y, Lopes BT, Wang J, et al. (2022).</strong> <em>"Biomechanical Effects of tPRK, FS-LASIK, and SMILE on the Cornea."</em> Frontiers in Bioengineering and Biotechnology. (Corvis ST measurements show the smallest strength loss with tPRK and the largest with LASIK.) <a href="https://pubmed.ncbi.nlm.nih.gov/35433653/" target="_blank" rel="noopener noreferrer">PubMed →</a></li>
          <li><strong>Hashemi H, Roberts CJ, Elsheikh A, et al. (2023).</strong> <em>"Corneal Biomechanics After SMILE, Femtosecond-Assisted LASIK, and Photorefractive Keratectomy: A Matched Comparison Study."</em> Translational Vision Science &amp; Technology. (On the fundamental role of residual stromal bed thickness for preserving corneal stiffness.) <a href="https://pubmed.ncbi.nlm.nih.gov/36928130/" target="_blank" rel="noopener noreferrer">PubMed →</a></li>
          <li><strong>Hwang ES, Stagg BC, Swan R, et al. (2017).</strong> <em>"Corneal biomechanical properties after laser-assisted in situ keratomileusis and photorefractive keratectomy."</em> Clinical Ophthalmology. (Analysis of the decline in corneal biomechanical indicators after flap-based methods.) <a href="https://pubmed.ncbi.nlm.nih.gov/29042748/" target="_blank" rel="noopener noreferrer">PubMed →</a></li>
          <li><strong>Gurnani B, Patel BC. (2026).</strong> <em>"Photorefractive Keratectomy."</em> StatPearls Publishing, National Center for Biotechnology Information (NCBI). (A broad overview of the advantages of PRK/surface methods for thin-cornea patients and for avoiding flap-related complications.) <a href="https://www.ncbi.nlm.nih.gov/books/NBK549887/" target="_blank" rel="noopener noreferrer">NCBI Bookshelf →</a></li>
          <li><strong>Kanellopoulos AJ. (2012).</strong> <em>"Preventing Ectasia With Cross-linking After PRK or LASIK."</em> Cataract &amp; Refractive Surgery Today. (Overview of biomechanical stability and ectasia prevention protocols.) <a href="https://crstoday.com/articles/2012-may/preventing-ectasia-with-cross-linking-after-prk-or-lasik" target="_blank" rel="noopener noreferrer">Read article →</a></li>
          <li><strong>Guo H, Hosseini-Moghaddam SM, Hodge W. (2019).</strong> <em>"Corneal biomechanical properties after SMILE versus FLEX, LASIK, LASEK, or PRK: a systematic review and meta-analysis."</em> BMC Ophthalmology. (Systematic meta-analysis supporting the biomechanical advantage of surface methods.) <a href="https://pubmed.ncbi.nlm.nih.gov/31370817/" target="_blank" rel="noopener noreferrer">PubMed →</a></li>
          <li><strong>Alió JL, Soria FA, Abbouda A, et al. (2016).</strong> <em>"Fifteen years follow-up of photorefractive keratectomy up to 10 D of myopia: outcomes and analysis of the refractive regression."</em> British Journal of Ophthalmology. (15-year follow-up confirming long-term visual stability and effectiveness of PRK.) <a href="https://doi.org/10.1136/bjophthalmol-2014-306459" target="_blank" rel="noopener noreferrer">DOI →</a></li>
          <li><strong>Krueger RR, Trokel SL, Schubert HD. (1985).</strong> <em>"Interaction of ultraviolet laser light with the cornea."</em> Investigative Ophthalmology &amp; Visual Science. (Foundational research on the effect of the excimer laser on corneal tissue.) <a href="https://pubmed.ncbi.nlm.nih.gov/4055287/" target="_blank" rel="noopener noreferrer">PubMed →</a></li>
          <li><strong>Mitry D, Singh J, Yorston D, et al. (2011).</strong> <em>"The predisposing pathology and clinical characteristics in the Scottish retinal detachment study."</em> Ophthalmology. (Study of risk factors for retinal detachment and the link with high myopia and mechanical stress.) <a href="https://pubmed.ncbi.nlm.nih.gov/21561662/" target="_blank" rel="noopener noreferrer">PubMed →</a></li>
        </ol>

      </article>
    </GuideLayout>
  );
}

function EndOfGuideCTAsEn() {
  const [callback, setCallback] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/guide-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...callback,
          source: 'guide-callback',
          lang: 'en',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <section className="px-6 py-16 md:py-20 border-t border-[#1a1a1a]">
      <div className="max-w-[680px] mx-auto">

        <p className="text-[11px] uppercase tracking-[0.3em] text-[#1a1a1a] mb-10 font-medium">
          Next steps
        </p>

        {/* OPTION I — CALLBACK */}
        <div className="mb-14 pb-14 border-b border-[#1a1a1a]">
          <div className="flex items-baseline gap-4 mb-5">
            <span className="font-serif text-2xl text-[#1a1a1a] leading-none">I.</span>
            <p className="font-serif text-[19px] text-[#1a1a1a] leading-snug flex-1">
              I still have questions and would like KSA Silmakeskus to call me.
            </p>
          </div>

          {status === 'success' ? (
            <p className="ml-9 text-sm text-[#1a1a1a] border-l-2 border-[#1a1a1a] pl-4 py-1">
              Thank you. We will be in touch by the end of the next working day.
            </p>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="ml-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="cb-name-en" className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="cb-name-en"
                    required
                    value={callback.name}
                    onChange={(e) => setCallback({ ...callback, name: e.target.value })}
                    className="w-full px-0 py-1.5 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a]"
                  />
                </div>
                <div>
                  <label htmlFor="cb-phone-en" className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="cb-phone-en"
                    required
                    placeholder="+372..."
                    value={callback.phone}
                    onChange={(e) => setCallback({ ...callback, phone: e.target.value })}
                    className="w-full px-0 py-1.5 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cb-email-en" className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="cb-email-en"
                    required
                    value={callback.email}
                    onChange={(e) => setCallback({ ...callback, email: e.target.value })}
                    className="w-full px-0 py-1.5 bg-transparent border-0 border-b border-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none text-[#1a1a1a]"
                  />
                </div>
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-700 mb-3">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:opacity-60 disabled:opacity-30 transition"
              >
                {status === 'submitting' ? 'Sending…' : 'Send request →'}
              </button>
            </form>
          )}
        </div>

        {/* OPTION II — BOOKING */}
        <div>
          <div className="flex items-baseline gap-4 mb-5">
            <span className="font-serif text-2xl text-[#1a1a1a] leading-none">II.</span>
            <p className="font-serif text-[19px] text-[#1a1a1a] leading-snug flex-1">
              I am 18–45, have myopia, and would like to book a Flow3 evaluation myself.
            </p>
          </div>

          <div className="ml-9">
            <a
              href="https://booking.ksa.ee/?promokood=G39&utm_source=silmatervis&utm_medium=guide&utm_campaign=refraktiivkirurgia-juhend&utm_content=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:opacity-60 transition"
            >
              Book a Flow3 suitability evaluation →
            </a>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#6f7f80] mt-3">
              Use code G39 when booking. Evaluation fee: 39&nbsp;€.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
