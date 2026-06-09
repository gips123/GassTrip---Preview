import { Star } from 'lucide-react';
import type { MiceTestimonialsTransformed } from '../core/mice-page.model';

interface MiceTestimonialsSectionProps {
  testimonials: MiceTestimonialsTransformed;
}

export default function MiceTestimonialsSection({ testimonials }: MiceTestimonialsSectionProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="mb-2 inline-block text-[11px] font-medium uppercase tracking-[2px] text-mice-gold-dark">
          {testimonials.sectionLabel}
        </span>
        <h2 className="text-3xl font-semibold text-mice-navy">{testimonials.title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.items.map((testimonial) => (
          <div key={testimonial.id} className="rounded-2xl border border-mice-gray-200 bg-white p-6">
            <div className="mb-2.5 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-3.5 w-3.5 fill-mice-gold text-mice-gold" />
              ))}
            </div>
            <p className="mb-4 text-sm italic leading-relaxed text-mice-text-muted">{testimonial.text}</p>
            <div className="flex items-center gap-2.5">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-mice-navy text-sm font-medium text-mice-gold">
                {testimonial.initials}
              </div>
              <div>
                <div className="text-[13px] font-medium text-mice-navy">{testimonial.name}</div>
                <div className="text-[11px] text-mice-text-muted">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
