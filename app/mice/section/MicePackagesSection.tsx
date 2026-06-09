'use client';

import { Check, Star } from 'lucide-react';
import type { MicePackagesTransformed } from '../core/mice-page.model';

interface MicePackagesSectionProps {
  packages: MicePackagesTransformed;
}

function scrollToRegister() {
  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function MicePackagesSection({ packages }: MicePackagesSectionProps) {
  return (
    <section id="paket" className="mb-16">
      <div className="mb-8">
        <span className="mb-2 inline-block text-[11px] font-medium uppercase tracking-[2px] text-mice-gold-dark">
          {packages.sectionLabel}
        </span>
        <h2 className="mb-2 text-3xl font-semibold text-mice-navy">{packages.title}</h2>
        <p className="max-w-[540px] text-[15px] text-mice-text-muted">{packages.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {packages.packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative rounded-2xl border-[1.5px] p-7 transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)] ${
              pkg.featured
                ? 'border-mice-gold bg-gradient-to-b from-mice-gold/[0.04] to-white to-60%'
                : 'border-mice-gray-200 bg-white'
            }`}
          >
            {pkg.popular && pkg.popularLabel && (
              <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-mice-gold px-3.5 py-1 text-[11px] font-medium text-mice-navy">
                <Star className="h-3 w-3 fill-current" />
                {pkg.popularLabel}
              </div>
            )}
            <div className="mb-1.5 text-[11px] uppercase tracking-[2px] text-mice-text-muted">{pkg.tier}</div>
            <div className="mb-1 text-2xl font-semibold text-mice-navy">{pkg.name}</div>
            <div className="mb-4 text-[1.6rem] font-semibold text-mice-gold-dark">
              {pkg.price} <sub className="text-xs font-normal text-mice-text-muted">{pkg.priceSub}</sub>
            </div>
            <div className="mb-4 h-px bg-mice-gray-200" />
            <ul className="space-y-1">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 py-1 text-[13px] text-mice-text-muted">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mice-gold/15">
                    <Check className="h-2.5 w-2.5 text-mice-gold-dark" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={scrollToRegister}
              className={`mt-6 w-full rounded-[10px] py-2.5 text-center text-[13px] font-medium transition ${
                pkg.buttonVariant === 'gold'
                  ? 'bg-gradient-to-br from-mice-gold to-mice-gold-dark text-mice-navy hover:opacity-90'
                  : 'border border-mice-gray-200 bg-transparent text-mice-navy hover:border-mice-gold hover:text-mice-gold-dark'
              }`}
            >
              {pkg.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
