import MiceIcon from '../components/MiceIcon';
import type { MiceServicesTransformed } from '../core/mice-page.model';

interface MiceServicesSectionProps {
  services: MiceServicesTransformed;
}

export default function MiceServicesSection({ services }: MiceServicesSectionProps) {
  return (
    <section>
      <div className="mb-8">
        <span className="mb-2 inline-block text-[11px] font-medium uppercase tracking-[2px] text-mice-gold-dark">
          {services.sectionLabel}
        </span>
        <h2 className="mb-2 text-3xl font-semibold text-mice-navy">{services.title}</h2>
        <p className="max-w-[540px] text-[15px] text-mice-text-muted">{services.description}</p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.services.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border border-mice-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:border-mice-gold hover:shadow-[0_8px_24px_rgba(245,166,35,0.1)]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-mice-gold/10 text-mice-gold-dark">
              <MiceIcon name={service.icon} className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-base font-medium text-mice-navy">{service.title}</h3>
            <p className="text-[13px] leading-relaxed text-mice-text-muted">{service.description}</p>
            <span className="mt-3 inline-block rounded-[10px] bg-mice-gold/10 px-2.5 py-0.5 text-[11px] text-mice-gold-dark">
              {service.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
