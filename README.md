# silmatervis.ksa.ee – Comprehensive Eye Health Education Platform

**Project Status:** MVP Phase 1 – 20 Pilot Pages (Weeks 1–3)

---

## Overview

silmatervis.ksa.ee is a professional, clinically-validated eye health education platform serving 110+ pages of comprehensive A-Z eye care content. The platform integrates:

- **Rendia Video Embeds** – Curated eye health and procedure educational videos
- **Medical Schema Markup** – Structured data (MedicalCondition, FAQPage, MedicalProcedure, Organization) for SEO and AI citations
- **Multilingual Narration** – ElevenLabs audio dubbing for Estonian (EST) and Russian (RU) language versions
- **Responsive Design** – Mobile-first, KSA brand-consistent layouts
- **Clinical Oversight** – Dr. Ants Haavel (KSA CEO, ophthalmologist) approves all health content

---

## Repository Structure

```
ksa-silmatervis/
├── package.json                 # Next.js + dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.js          # Tailwind CSS theme (KSA brand colors)
├── postcss.config.js           # PostCSS plugins
├── next.config.js              # Next.js build config
├── .env.local                  # Environment variables (GTM, API keys)
├── public/
│   ├── data/
│   │   ├── pilot-pages.json    # 20 pilot page metadata
│   │   └── rendia-videos.json  # Curated Rendia video library
│   └── images/                 # Brand assets, KSA logo
├── src/
│   ├── components/
│   │   ├── RendiaVideo.jsx     # Video embed with lazy-load, responsive, fallback
│   │   ├── VideoPlayer.jsx     # Custom player for dubbed audio switching
│   │   ├── LanguageContext.jsx # Global EST/RU/EN language toggle
│   │   ├── SchemaMarkup.jsx    # JSON-LD schema injection
│   │   └── Layout.jsx          # Global header, footer, nav
│   ├── lib/
│   │   ├── schema.ts           # JSON-LD utility functions
│   │   ├── i18n.ts            # Language context provider
│   │   └── constants.ts        # KSA brand, API endpoints
│   ├── pages/
│   │   ├── index.jsx           # Homepage / landing
│   │   ├── conditions/[slug].jsx      # Dynamic condition pages
│   │   ├── procedures/[slug].jsx      # Dynamic procedure pages
│   │   ├── treatments/[slug].jsx      # Dynamic treatment pages
│   │   └── anatomy/[slug].jsx         # Dynamic anatomy pages
│   ├── styles/
│   │   └── globals.css         # Global styles, Geist font import
│   └── hooks/
│       ├── useLanguage.js      # Hook to consume language context
│       └── useSchema.js        # Hook to generate + inject schema markup
└── .github/
    └── workflows/
        └── deploy.yml          # Vercel deployment automation

```

---

## Development Phases

### Phase 1: Foundation & 20 Pilot Pages (Weeks 1–3)

**Objective:** Prove concept with a curated subset of high-priority pages.

**Deliverables:**
1. ✅ **package.json** – Next.js + Tailwind, TypeScript, testing tools
2. ✅ **README.md** – Project documentation (this file)
3. ⏳ **Core Components:**
   - `RendiaVideo.jsx` – Responsive embed with lazy-loading, brand styling, whitelist fallback
   - `LanguageContext.jsx` – Global EST/RU/EN toggle
   - `SchemaMarkup.jsx` – JSON-LD schema injection
4. ⏳ **Utility Libraries:**
   - `schema.ts` – Functions to generate MedicalCondition, FAQPage, MedicalProcedure, Organization schemas
   - `i18n.ts` – Language context provider + hooks
   - `constants.ts` – KSA brand values (colors, fonts, GTM ID, endpoints)
5. ⏳ **20 Pilot Pages** (converted from HTML to React components):
   - 10 condition pages (dry eye, cataracts, glaucoma, presbyopia, myopia, hyperopia, astigmatism, macular degeneration, diabetic retinopathy, floaters)
   - 5 procedure pages (LASIK, cataract surgery, retinal repair, corneal cross-linking, lens implant)
   - 3 anatomy pages (parts of the eye, how vision works, tear system)
   - 2 treatment pages (eye drops, contact lenses)
6. ⏳ **Schema Markup Validation** – Google Structured Data Testing Tool ✓

**Timeline:** Weeks 1–3 (target launch of pilot pages)

---

### Phase 2: Multilingual Audio & Full Coverage (Weeks 4–6)

**Objective:** Add dubbed audio (EST + RU) and complete 110+ page platform.

**Deliverables:**
1. ElevenLabs Dubbing Integration – Generate EST + RU audio tracks for all Rendia videos
2. Custom Audio Switching Component – Replace English audio based on global language toggle
3. Remaining 90 pages – Convert remaining content to React components
4. Video Turnaround – Batch-upload highest-priority videos to ElevenLabs, iteratively add dubbed versions
5. Performance Optimization – Code splitting, lazy-load pages by section

**Timeline:** Weeks 4–6

---

## Rendia Video Integration Status

### Current Blockers
- ❌ **Domain Whitelist:** `silmatervis.ksa.ee` awaiting approval in Rendia dashboard
- ❌ **English Transcripts:** Requested from Rendia (needed for ElevenLabs audio dubbing)
- ❌ **Multilingual Permission:** Clarification pending on ElevenLabs usage of transcripts
- ❌ **Broken Share Links:** 5 dead Rendia links flagged; Rendia to identify + fix

### Integration Plan

#### Video Selection Criteria
- **Included:** All Rendia videos aligned with KSA clinical philosophy (eye conditions, procedures, anatomy, care, prevention)
- **Excluded:** Product promotions, sales-focused content, misaligned material
- **Approval:** Dr. Ants Haavel (KSA CEO) approves all selections
- **Ranking:** Videos featured in prominence order (highest-priority featured first); ranking can be adjusted post-launch

#### Embed Strategy
1. **Component Pattern:** `<RendiaVideo id="..." title="..." lazy={true} />`
2. **Responsive Container:** Video scales 16:9 aspect ratio on all devices
3. **Lazy Loading:** Video iframe only renders when viewport-visible
4. **Brand Styling:** Inherits KSA accent color (#87be23), Geist font
5. **Fallback:** Shows placeholder if whitelist not approved

#### Example Page Structure
```jsx
<page>
  <h1>Dry Eye Syndrome</h1>
  <p>Medical description...</p>
  <RendiaVideo
    id="rendia-12345"
    title="Understanding Dry Eye"
    lazy={true}
  />
  <h2>Symptoms</h2>
  <ul>...</ul>
  <h2>Treatment Options</h2>
  <SchemaMarkup data={medicalConditionSchema} />
</page>
```

---

## Medical Schema Markup Implementation

All pages inject JSON-LD structured data to improve SEO, enable AI citations, and support clinical reference.

### Schemas by Page Type

#### 1. MedicalCondition Schema (per-condition page)
**Use Case:** Pages about diseases, disorders, eye conditions

**Example:** Dry Eye Syndrome page
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  "name": "Dry Eye Syndrome",
  "description": "A chronic condition affecting tear production...",
  "cause": {
    "@type": "Thing",
    "name": "Reduced tear production, increased tear evaporation"
  },
  "symptom": [
    { "@type": "Thing", "name": "Eye irritation" },
    { "@type": "Thing", "name": "Tearing" }
  ],
  "possibleTreatment": [
    { "@type": "MedicalTherapy", "name": "Artificial tears" },
    { "@type": "MedicalTherapy", "name": "Punctal plugs" }
  ]
}
```

#### 2. FAQPage Schema (for Q&A sections)
**Use Case:** Pages with FAQ sections
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What causes dry eyes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dry eyes can be caused by..."
      }
    }
  ]
}
```

#### 3. MedicalProcedure Schema (for procedure pages)
**Use Case:** Pages about surgical/clinical procedures
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "LASIK Surgery",
  "description": "Refractive eye surgery using laser...",
  "outcome": "Improved vision without glasses or contacts",
  "preparation": "Comprehensive pre-operative eye examination",
  "followUp": "Post-operative drops for 1 week"
}
```

#### 4. Organization Schema (global, on all pages)
**Use Case:** Establish KSA authority for AI citations
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KSA Silmakeskus",
  "logo": "https://ksa.ee/logo.png",
  "url": "https://ksa.ee",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressCountry": "EE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+372-...",
    "contactType": "customer service"
  }
}
```

### Implementation Pattern

**src/lib/schema.ts**
```typescript
export function generateMedicalConditionSchema(data: ConditionData) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: data.name,
    description: data.description,
    symptom: data.symptoms?.map(s => ({ "@type": "Thing", name: s })),
    possibleTreatment: data.treatments?.map(t => ({
      "@type": "MedicalTherapy",
      name: t
    }))
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KSA Silmakeskus",
    // ... KSA details
  };
}
```

**Page Usage**
```jsx
export default function ConditionPage({ slug }) {
  const schema = generateMedicalConditionSchema(conditionData);
  return (
    <Layout>
      <SchemaMarkup data={schema} />
      <h1>{conditionData.name}</h1>
      {/* ... content ... */}
    </Layout>
  );
}
```

---

## Multilingual Narration Strategy (Phase 2)

**Goal:** Create Estonian and Russian dubbed versions of all Rendia videos with site-wide language toggle.

### Architecture

1. **Audio Source:** ElevenLabs Dubbing API
   - Input: English Rendia video + transcript
   - Output: Dubbed audio files (EST + RU) with video sync

2. **Player Integration:** Custom `<VideoPlayer>` component
   - Wraps Rendia video with audio layer
   - Replaces English audio with dubbed versions based on global language selection
   - Fallback: English audio if dubbed version unavailable

3. **Language Context:** Global EST/RU/EN toggle
   - Stored in React Context (site-wide preference)
   - All videos on page respect same language
   - Persisted to localStorage for session continuity

4. **ElevenLabs Workflow:**
   - Upload highest-priority videos first (A-Z coverage by urgency)
   - Typical turnaround: 24–48 hrs per language
   - Cost: Per-minute dubbing pricing (bulk discounts available)
   - Voice selection: Professional medical tone for EST + RU

### Implementation Example

**src/components/VideoPlayer.jsx**
```jsx
export function VideoPlayer({ videoId, language = 'en' }) {
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    // Fetch dubbed audio URL for selected language
    if (language === 'est') {
      setAudioUrl(`/audio/rendia-${videoId}-est.mp3`);
    } else if (language === 'ru') {
      setAudioUrl(`/audio/rendia-${videoId}-ru.mp3`);
    } else {
      // English: use Rendia's original audio
      setAudioUrl(null);
    }
  }, [language, videoId]);

  return (
    <div className="video-player">
      <RendiaVideo id={videoId} />
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
```

**Global Language Toggle**
```jsx
export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="est">Eesti</option>
      <option value="ru">Русский</option>
    </select>
  );
}
```

---

## KSA Brand Guidelines

### Color Palette
- **Primary Accent:** `#87be23` (KSA green)
- **Neutral:** Grays for text and backgrounds
- **Alert/Medical:** Standard red/orange for warnings

### Typography
- **Font Family:** Geist (monospace for code, sans-serif for body)
- **Heading Scale:** h1–h6 with consistent spacing
- **Body:** 16px base, line-height 1.6

### Assets
- **Logo:** `/public/images/ksa-logo.svg`
- **Favicon:** `/public/favicon.ico`
- **Google Tag Manager ID:** `GTM-KCZVRJ8`

### Responsive Design
- **Mobile First:** Base design for mobile, scale up
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Video Aspect Ratio:** 16:9 (responsive scaling)

---

## Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS 3
- **Language:** TypeScript 5
- **Schema Markup:** JSON-LD (injected via `<head>`)
- **Video Embedding:** Rendia iframe + custom wrapper
- **Audio Dubbing:** ElevenLabs Dubbing API
- **Hosting:** Vercel
- **Analytics:** Google Tag Manager (GTM-KCZVRJ8)
- **Version Control:** GitHub (antshaavel22/ksa-silmatervis)

---

## Verification & Testing Checklist

### After Each Task

#### Task: Create RendiaVideo Component
- [ ] Component renders without errors
- [ ] Lazy-loading works (video iframe only renders when visible)
- [ ] Responsive design: 16:9 aspect ratio on mobile + desktop
- [ ] Fallback shows when whitelist pending
- [ ] KSA brand colors/fonts inherited

#### Task: Implement Schema Markup
- [ ] Google Structured Data Testing Tool validates JSON-LD on test pages
- [ ] Schema.org validator confirms MedicalCondition + Organization schemas
- [ ] Inspect `<head>` to confirm `<script type="application/ld+json">` tags present
- [ ] Multiple page types tested (condition, procedure, anatomy)

#### Task: Deploy 20 Pilot Pages
- [ ] Pages render on local dev (next dev)
- [ ] Rendia videos embed successfully (once whitelist approved)
- [ ] Responsive on mobile (iOS Safari, Android Chrome)
- [ ] No console errors or CORS issues
- [ ] Schema markup validates on all 20 pages
- [ ] Vercel preview environment builds successfully
- [ ] Page load time < 3 sec (Lighthouse)

#### Task: ElevenLabs Audio Integration (Phase 2)
- [ ] EST + RU audio files generated without sync issues
- [ ] Language toggle switches audio on all pages
- [ ] Captions/subtitles (if added) stay in sync
- [ ] Tested on Chrome, Safari, mobile browsers
- [ ] Medical terminology verified post-dubbing

---

## Execution Roadmap

### Week 1
- [ ] Finalize package.json + dependencies
- [ ] Create core components (RendiaVideo, LanguageContext, SchemaMarkup)
- [ ] Implement schema.ts utility library
- [ ] Create 5 pilot condition pages

### Week 2
- [ ] Complete remaining 15 pilot pages (procedures, anatomy, treatments)
- [ ] Validate all pilot pages with schema markup
- [ ] Deploy to Vercel preview environment
- [ ] Await Rendia whitelist approval + transcripts

### Week 3
- [ ] Test Rendia video embeds (once whitelist approved)
- [ ] Gather feedback from Dr. Haavel on content + layout
- [ ] Fix responsive design issues
- [ ] Prepare Phase 2 roadmap

### Weeks 4–6 (Phase 2)
- [ ] Begin ElevenLabs dubbing (highest-priority videos first)
- [ ] Implement audio switching component
- [ ] Convert remaining 90 pages
- [ ] Full platform launch

---

## Contacts & Resources

**KSA Team:**
- Dr. Ants Haavel (CEO, Clinical Oversight) – ants@ksa.ee
- Mai Hollo (ElevenLabs Integration Lead, KAISA 2.0) – mai@ksa.ee

**Rendia Contact:**
- Nathaniel Moore (Domain Whitelist, Transcripts, Multilingual Permission)
- Janice (Multilingual Subtitles Discussion)

**External Services:**
- **Vercel Project:** ksa-silmatervis (prj_RvkUefJvHwDQAsqlYfYWGQrlC41y)
- **GitHub Repo:** antshaavel22/ksa-silmatervis
- **ElevenLabs Account:** KSA account (configured by Mai Hollo for KAISA 2.0)

**Live Environments:**
- **Main Site:** ksa.ee (clinical credentials, contact info)
- **Blog:** blog.ksa.ee (editorial content, 442+ posts)
- **Platform (this project):** silmatervis.ksa.ee (target launch)

---

**Last Updated:** 2026-04-04
**Next Sync:** After Rendia response + Phase 1 component implementation
