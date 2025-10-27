import React from 'react';
import PackageDetailHero from './section/hero/PackageDetailHero';
import PackageDetailGallery from './section/gallery/PackageDetailGallery';
import PackageDetailInfo from './section/info/PackageDetailInfo';
import PackageDetailItinerary from './section/itinerary/PackageDetailItinerary';
import PackageDetailInclusion from './section/inclusion/PackageDetailInclusion';
import PackageDetailBooking from './section/booking/PackageDetailBooking';
import PackageDetailReviews from './section/reviews/PackageDetailReviews';
import PackageDetailRecommendations from './section/recommendations/PackageDetailRecommendations';

interface PackageDetailPageProps {
  params: {
    id: string;
  };
}

const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ params }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PackageDetailHero packageId={params.id} />
      
      {/* Gallery Section */}
      <PackageDetailGallery packageId={params.id} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PackageDetailInfo packageId={params.id} />
            <PackageDetailItinerary packageId={params.id} />
            <PackageDetailInclusion packageId={params.id} />
            <PackageDetailReviews packageId={params.id} />
          </div>
          
          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <PackageDetailBooking packageId={params.id} />
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <PackageDetailRecommendations packageId={params.id} />
    </div>
  );
};

export default PackageDetailPage;
