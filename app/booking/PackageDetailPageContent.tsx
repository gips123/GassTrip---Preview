import PackageDetailHero from './[id]/section/hero/PackageDetailHero';
import PackageDetailGallery from './[id]/section/gallery/PackageDetailGallery';
import PackageDetailInfo from './[id]/section/info/PackageDetailInfo';
import PackageDetailItinerary from './[id]/section/itinerary/PackageDetailItinerary';
import PackageDetailInclusion from './[id]/section/inclusion/PackageDetailInclusion';
import PackageDetailBooking from './[id]/section/booking/PackageDetailBooking';
import PackageDetailReviews from './[id]/section/reviews/PackageDetailReviews';
import PackageDetailRecommendations from './[id]/section/recommendations/PackageDetailRecommendations';

interface PackageDetailPageContentProps {
  packageId: string;
}

export default function PackageDetailPageContent({ packageId }: PackageDetailPageContentProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <PackageDetailHero packageId={packageId} />
      <PackageDetailGallery packageId={packageId} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PackageDetailInfo packageId={packageId} />
            <PackageDetailItinerary packageId={packageId} />
            <PackageDetailInclusion packageId={packageId} />
            <PackageDetailReviews packageId={packageId} />
          </div>
          <div className="lg:col-span-1">
            <PackageDetailBooking packageId={packageId} />
          </div>
        </div>
      </div>
      <PackageDetailRecommendations packageId={packageId} />
    </div>
  );
}

