import { Suspense } from 'react';
import HeroSection from './section/HeroSection';
import PopularSection from './section/PopularSection';
import TestimonialsSection from './section/TestimonialsSection';
import PackagesSection from './section/PackagesSection';
import ExperienceSection from './section/ExperienceSection';
import type { HomePageTransformed } from './core/home-page.model';
import PageLoading from '@/components/ui/PageLoading';

interface HomePageContentProps {
  data: HomePageTransformed;
}

export default function HomePageContent({ data }: HomePageContentProps) {
  return (
    <div className="min-h-screen">
      <HeroSection hero={data.hero} />
      <PopularSection featured={data.featured} />
      <TestimonialsSection testimonials={data.testimonials} />
      <Suspense fallback={<PageLoading pageName="packages" />}>
        <PackagesSection />
      </Suspense>
      <ExperienceSection experience={data.experience} />
    </div>
  );
}

