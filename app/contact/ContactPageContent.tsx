import ContactHeroSection from './section/ContactHeroSection';
import ContactInformationSection from './section/ContactInformationSection';
import type { ContactPageTransformed } from './core/contact-page.model';

interface ContactPageContentProps {
  data: ContactPageTransformed;
}

export default function ContactPageContent({ data }: ContactPageContentProps) {
  return (
    <div className="min-h-screen">
      <ContactHeroSection hero={data.hero} background={data.background} />
      <ContactInformationSection information={data.information} />
    </div>
  );
}

