import AboutHeroSection from './section/AboutHeroSection';
import CombinedSection from './section/CombinedSection';
import VisionMissionSection from './section/VisionMissionSection';
import type { AboutPageTransformed } from './core/about-page.model';

interface AboutPageContentProps {
  data: AboutPageTransformed;
}

export default function AboutPageContent({ data }: AboutPageContentProps) {
  return (
    <div className="min-h-screen">
      <AboutHeroSection hero={data.hero} logo={data.logo} background={data.background} />
      <CombinedSection featured={data.featured} logo={data.logo} />
      <VisionMissionSection visionMission={data.visionMission} />
    </div>
  );
}

