import type { MiceFaqTransformed } from '../core/mice-page.model';

interface MiceFaqSectionProps {
  faq: MiceFaqTransformed;
}

export default function MiceFaqSection({ faq }: MiceFaqSectionProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="mb-2 inline-block text-[11px] font-medium uppercase tracking-[2px] text-mice-gold-dark">
          {faq.sectionLabel}
        </span>
        <h2 className="text-3xl font-semibold text-mice-navy">{faq.title}</h2>
      </div>

      {faq.items.map((item) => (
        <details key={item.id} className="group mb-2 overflow-hidden rounded-[10px] border border-mice-gray-200">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2.5 bg-white px-5 py-4 text-sm font-medium text-mice-navy transition hover:bg-mice-off-white [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="shrink-0 text-lg text-mice-gold-dark transition group-open:rotate-45">+</span>
          </summary>
          <div className="bg-white px-5 pb-4 text-[13px] leading-relaxed text-mice-text-muted">{item.answer}</div>
        </details>
      ))}
    </section>
  );
}
