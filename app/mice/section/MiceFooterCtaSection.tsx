import Link from 'next/link';
import MiceIcon from '../components/MiceIcon';
import type { MiceFooterCtaTransformed } from '../core/mice-page.model';

interface MiceFooterCtaSectionProps {
  footerCta: MiceFooterCtaTransformed;
}

export default function MiceFooterCtaSection({ footerCta }: MiceFooterCtaSectionProps) {
  return (
    <div className="mb-12 rounded-3xl bg-gradient-to-br from-mice-navy to-mice-navy-mid p-12 text-center">
      <h2 className="mb-2.5 text-3xl font-semibold text-white">{footerCta.title}</h2>
      <p className="mb-7 text-[15px] text-white/55">{footerCta.description}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={footerCta.primaryButtonHref}
          className="inline-flex items-center gap-1.5 rounded-[10px] bg-gradient-to-br from-mice-gold to-mice-gold-dark px-7 py-3.5 text-sm font-medium text-mice-navy transition hover:-translate-y-px hover:opacity-90"
        >
          {footerCta.primaryButtonLabel}
        </Link>
        <a
          href={footerCta.secondaryButtonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/25 bg-transparent px-7 py-3.5 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <MiceIcon name={footerCta.secondaryButtonIcon} className="h-4 w-4" />
          {footerCta.secondaryButtonLabel}
        </a>
      </div>
    </div>
  );
}
