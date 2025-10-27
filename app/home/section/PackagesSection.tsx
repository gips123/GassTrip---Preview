'use client';

import React, { useState, useEffect } from 'react';
import { Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const PackagesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const featuredPackages = [
    {
      id: 1,
      title: 'Paket Lengkap Eksplor RAJA AMPAT',
      location: 'Raja Ampat',
      image: '/pantai.jpg',
      rating: 5,
      included: ['Puncak Wayag', 'Bukit Piaynemo', 'Pos Hiu, Pulau Wayag'],
      price: 'Rp 8.866.000',
      duration: '3Hari - 2Malam',
      isFeatured: true
    },
    {
      id: 2,
      title: 'Paket Eksplor MALUKU',
      location: 'Maluku',
      image: '/bali.jpg',
      rating: 4,
      included: ['Langgur', 'Goa Hawang', 'Pulau Bair'],
      price: 'Rp 6.299.000',
      duration: '4Hari - 3Malam',
      isFeatured: true
    },
    {
      id: 3,
      title: 'Paket Eksplor BROMO',
      location: 'Bromo',
      image: '/bromo.jpg',
      rating: 5,
      included: ['Malang', 'Batu', 'Bromo'],
      price: 'Rp 6.299.000',
      duration: '3Hari - 2Malam',
      isFeatured: true
    }
  ];

  const packages = [
    {
      id: 4,
      title: 'Paket Eksplor KALIMANTAN',
      location: 'Kalimantan',
      image: '/pantai.jpg',
      rating: 4,
      included: ['Maratua', 'Dolphin Point', 'Laguna Kehe Daing'],
      price: 'Rp 5.880.000',
      duration: '4Hari - 3Malam',
      isFeatured: false
    },
    {
      id: 5,
      title: 'Paket Eksplor Bali',
      location: 'Bali',
      image: '/bali.jpg',
      rating: 5,
      included: ['Pantai Pandawa', 'Tanah Lot', 'Jimbaran Bay'],
      price: 'Rp 6.110.000',
      duration: '3Hari - 2Malam',
      isFeatured: false
    },
    {
        id: 6,
        title: 'Paket Eksplor Bali',
        location: 'Bali',
        image: '/bali.jpg',
        rating: 5,
        included: ['Pantai Pandawa', 'Tanah Lot', 'Jimbaran Bay'],
        price: 'Rp 6.110.000',
        duration: '3Hari - 2Malam',
        isFeatured: false
      },
      {
        id: 7,
        title: 'Paket Eksplor Bali',
        location: 'Bali',
        image: '/bali.jpg',
        rating: 5,
        included: ['Pantai Pandawa', 'Tanah Lot', 'Jimbaran Bay'],
        price: 'Rp 6.110.000',
        duration: '3Hari - 2Malam',
        isFeatured: false
      }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPackages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPackages.length) % featuredPackages.length);
  };

  // Auto-slide functionality with hover pause
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredPackages.length);
      }, 5000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [featuredPackages.length, isHovered]);

  // Base Package Card Component
  const PackageCard: React.FC<{ package: any; isFeatured?: boolean }> = ({ package: pkg, isFeatured = false }) => {
    const cardClasses = "relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 h-110";
    const contentClasses = `absolute bottom-0 left-0 right-0 p-6 ${isFeatured ? 'text-left' : 'text-center'}`;
    const titleClasses = `text-white font-bold mb-4 ${isFeatured ? 'text-2xl' : 'text-lg'}`;
    const includedClasses = isFeatured ? 'space-y-2 mb-4' : 'flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4';
    const priceClasses = isFeatured ? 'mb-4 flex flex-col' : 'flex items-center justify-center gap-4 mb-4';
    const buttonClasses = isFeatured ? 'flex flex-row gap-3 justify-start items-center' : 'flex flex-row gap-2 justify-center items-center';

    return (
      <div className={cardClasses}>
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute top-4 left-4 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < pkg.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
          ))}
        </div>

        <div className={contentClasses}>
          <h3 className={titleClasses}>{pkg.title}</h3>

          <div className={includedClasses}>
            {pkg.included.map((item: string, index: number) => (
              <div key={index} className={`flex items-center text-white/90 ${!isFeatured ? 'justify-center whitespace-nowrap' : ''}`}>
                <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className={priceClasses}>
            <div className="text-orange-500 font-bold text-xl">{pkg.price}</div>
            <div className="text-white text-xs">{pkg.duration}</div>
          </div>

          <div className={buttonClasses}>
            <Button 
              variant="primary" 
              rounded="full"
              className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-300 ${
                isFeatured ? 'px-4 py-2' : 'px-3 py-1.5 text-sm flex-1'
              }`}
            >
              {isFeatured ? 'View Package' : 'View'}
            </Button>
            <Button 
              variant="secondary" 
              rounded="full"
              className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors duration-300 ${
                isFeatured ? 'px-4 py-2' : 'px-3 py-1.5 text-sm flex-1'
              }`}
            >
              {isFeatured ? 'Pesan Sekarang' : 'Pesan'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-7">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Let's Explore
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Paket Wisata Pilihan
          </h2>
          <div className="w-70 h-1 bg-orange-500 rounded-full"></div>
        </div>

        {/* Featured Package Slider */}
        <div className="mb-12 relative">
          <div 
            className="relative overflow-hidden rounded-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredPackages.map((pkg) => (
                <div key={pkg.id} className="w-full flex-shrink-0">
                  <PackageCard package={pkg} isFeatured={true} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {featuredPackages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.slice(0, 4).map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
