import MiceIcon from '../components/MiceIcon';
import type { MiceWhyUsTransformed } from '../core/mice-page.model';

interface MiceWhyUsSectionProps {
  whyUs: MiceWhyUsTransformed;
}

export default function MiceWhyUsSection({ whyUs }: MiceWhyUsSectionProps) {
  return (
    <div className="mb-16 grid grid-cols-1 items-center gap-8 rounded-3xl bg-mice-navy p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
      <div>
        <span className="mb-2 inline-block text-[11px] font-medium uppercase tracking-[2px] text-mice-gold-light">
          {whyUs.sectionLabel}
        </span>
        <h2 className="mb-3 text-[1.8rem] font-semibold text-white">{whyUs.title}</h2>
        <p className="text-sm text-white/55">{whyUs.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {whyUs.items.map((item) => (
          <div key={item.id} className="rounded-[10px] border border-white/[0.08] bg-white/[0.04] p-5">
            <div className="mb-2 text-mice-gold">
              <MiceIcon name={item.icon} className="h-5 w-5" />
            </div>
            <h4 className="mb-1 text-sm font-medium text-white">{item.title}</h4>
            <p className="text-xs leading-relaxed text-white/45">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
