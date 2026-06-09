'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MiceIcon from '../components/MiceIcon';
import type { MiceHeroTransformed } from '../core/mice-page.model';

interface MiceHeroSectionProps {
  hero: MiceHeroTransformed;
}

function renderTitleLine1(titleLine1: string, highlight: string) {
  const parts = titleLine1.split(highlight);
  if (parts.length === 1) return titleLine1;

  return (
    <>
      {parts[0]}
      <span className="text-mice-gold">{highlight}</span>
      {parts[1]}
    </>
  );
}

export default function MiceHeroSection({ hero }: MiceHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mice-navy via-mice-navy-mid to-[#0f2744] px-8 py-20 pb-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(245, 166, 35, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(41, 98, 160, 0.12) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(245, 194, 106, 0.05) 0%, transparent 40%)',
        }}
      />

      <div className="relative mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mice-gold/25 bg-mice-gold/10 px-4 py-1.5 text-[11px] uppercase tracking-[2px] text-mice-gold-light">
            <MiceIcon name={hero.badgeIcon} className="h-3.5 w-3.5" />
            {hero.badge}
          </div>
          <h1 className="mb-4 text-[2.2rem] font-bold leading-tight text-white lg:text-5xl">
            {renderTitleLine1(hero.titleLine1, hero.titleHighlight)}
            <br />
            {hero.titleLine2}
          </h1>
          <p className="mb-8 max-w-[460px] text-[15px] leading-relaxed text-white/65">{hero.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={hero.primaryButtonHref}
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-gradient-to-br from-mice-gold to-mice-gold-dark px-7 py-3.5 text-sm font-medium text-mice-navy transition hover:-translate-y-px hover:opacity-90"
            >
              {hero.primaryButtonLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondaryButtonHref}
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/25 bg-transparent px-7 py-3.5 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {hero.secondaryButtonLabel}
            </Link>
          </div>
        </div>

        <div className="hidden grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/[0.06] p-8 lg:grid">
          {hero.stats.slice(0, 2).map((stat) => (
            <div key={stat.id}>
              <strong className="mb-1 block text-3xl font-bold leading-none text-mice-gold">{stat.value}</strong>
              <span className="text-[13px] text-white/50">{stat.label}</span>
            </div>
          ))}
          <div className="col-span-2 h-px bg-white/[0.08]" />
          {hero.stats.slice(2).map((stat) => (
            <div key={stat.id}>
              <strong className="mb-1 block text-3xl font-bold leading-none text-mice-gold">{stat.value}</strong>
              <span className="text-[13px] text-white/50">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
