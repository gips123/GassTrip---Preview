import { Suspense } from 'react';
import PaketTourHeroSection from './section/PaketTourHeroSection';
import TourPackagesSection from './section/TourPackagesSection';
import type { PackagePageTransformed } from './core/paket-tour.model';
import PageLoading from '@/components/ui/PageLoading';

interface PaketTourPageContentProps {
  data: PackagePageTransformed;
}

export default function PaketTourPageContent({ data }: PaketTourPageContentProps) {
  return (
    <div className="min-h-screen">
      <PaketTourHeroSection hero={data.hero} />
      <Suspense fallback={<PageLoading pageName="tour packages" />}>
        <TourPackagesSection />
      </Suspense>
    </div>
  );
}

