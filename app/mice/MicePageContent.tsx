import MiceHeroSection from './section/MiceHeroSection';
import MiceServicesSection from './section/MiceServicesSection';
import MicePackagesSection from './section/MicePackagesSection';
import MiceWhyUsSection from './section/MiceWhyUsSection';
import MiceRegisterFormSection from './section/MiceRegisterFormSection';
import MiceTestimonialsSection from './section/MiceTestimonialsSection';
import MiceFaqSection from './section/MiceFaqSection';
import MiceFooterCtaSection from './section/MiceFooterCtaSection';
import type { MicePageTransformed } from './core/mice-page.model';

interface MicePageContentProps {
  data: MicePageTransformed;
}

export default function MicePageContent({ data }: MicePageContentProps) {
  return (
    <div className="min-h-screen">
      <MiceHeroSection hero={data.hero} />
      <main className="mx-auto max-w-[1140px] px-8 py-16">
        <MiceServicesSection services={data.services} />
        <MicePackagesSection packages={data.packages} />
        <MiceWhyUsSection whyUs={data.whyUs} />
        <MiceRegisterFormSection register={data.register} />
        <MiceTestimonialsSection testimonials={data.testimonials} />
        <MiceFaqSection faq={data.faq} />
        <MiceFooterCtaSection footerCta={data.footerCta} />
      </main>
    </div>
  );
}
