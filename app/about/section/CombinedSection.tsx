import React from 'react';
import { MapPin, Users, Star } from 'lucide-react';
import FeatureCard from '@/components/partials/FeatureCard';

const CombinedSection: React.FC = () => {
  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Destinasi yang Berkesan",
      description: "Setiap sudut dunia menyimpan cerita, dan kami hadir untuk membawa Anda ke tempat-tempat yang tak hanya indah, tetapi juga meninggalkan kesan mendalam"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Tim yang Luar Biasa",
      description: "Bersama tim kami, Anda tidak hanya bepergian, tetapi juga ditemani oleh orang-orang yang peduli akan kenyamanan dan kepuasan Anda."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Harga Terjangkau Sekali",
      description: "Nikmati pengalaman luar biasa dengan harga yang terjangkau - karena bersama kami, liburan hemat tetap penuh kesan"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex justify-center">
          <img
            src="/gasstrip-logo.png"
            alt="Gasstrip Logo"
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