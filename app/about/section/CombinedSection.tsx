import React from 'react';
import { MapPin, Users, Star } from 'lucide-react';
import FeatureCard from '@/components/partials/FeatureCard';
import { AboutFeaturedTransformed, AboutLogoTransformed } from '../core/models/about-page.model';

interface CombinedSectionProps {
  featured: AboutFeaturedTransformed[];
  logo: AboutLogoTransformed;
}

const CombinedSection: React.FC<CombinedSectionProps> = ({ featured, logo }) => {
  // Map featured data to icons
  const getIconForTitle = (title: string) => {
    if (title.includes('Destinasi')) return <MapPin className="w-8 h-8" />;
    if (title.includes('Tim')) return <Users className="w-8 h-8" />;
    if (title.includes('Harga')) return <Star className="w-8 h-8" />;
    return <Star className="w-8 h-8" />; // Default icon
  };

  const features = featured.map(item => ({
    icon: getIconForTitle(item.title),
    title: item.title,
    description: item.description
  }));

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex justify-center">
          <img
            src={logo.url}
            alt={logo.alt}
            className="w-100 h-100 object-contain"
          />
        </div>

        {/* Feature Cards - 3 cards in a row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:border-blue-200 shadow-lg transition-all duration-300 hover:shadow-xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CombinedSection;