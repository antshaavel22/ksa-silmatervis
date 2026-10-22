/**
 * Visible FAQ on the guide intro pages — the same five questions that go into
 * the FAQPage structured data (GuideSeo), so what Google and AI assistants
 * quote is exactly what the reader sees.
 */
const HEADING = {
  et: 'Korduma kippuvad küsimused',
  ru: 'Частые вопросы',
  en: 'Frequently asked questions',
};

export default function GuideFaq({ lang = 'et', faq = [] }) {
  if (!faq.length) return null;
  return (
    <section className="px-6 pb-20" aria-labelledby="guide-faq">
      <div className="max-w-[560px] mx-auto border-t border-[#e8e4dc] pt-10">
        <h2 id="guide-faq" className="font-serif text-[26px] md:text-[30px] text-[#1a1a1a] leading-snug mb-6" style={{ letterSpacing: '-0.012em' }}>
          {HEADING[lang] || HEADING.et}
        </h2>
        <div className="divide-y divide-[#e8e4dc]">
          {faq.map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-[16px] font-medium text-[#1a1a1a]">
                <span>{q}</span>
                <span aria-hidden="true" className="text-[#6f7f80] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[15px] text-[#4a5a5b] leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
