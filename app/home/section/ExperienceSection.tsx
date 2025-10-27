'use client';

import React from 'react';
import Button from '@/components/ui/Button';

const ExperienceSection: React.FC = () => {
  const destinationImages = [
    {
      id: 1,
      name: 'Bromo',
      image: '/bromo.jpg',
      alt: 'Mount Bromo volcanic landscape at sunrise'
    },
    {
      id: 2,
      name: 'Raja Ampat',
      image: '/pantai.jpg',
      alt: 'Raja Ampat tropical islands and turquoise water'
    },
    {
      id: 3,
      name: 'Maratua',
      image: '/bali.jpg',
      alt: 'Maratua overwater bungalows and clear water'
    },
    {
      id: 4,
      name: 'Nusa Penida',
      image: '/pantai.jpg',
      alt: 'Nusa Penida Kelingking Beach cliff view'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            {destinationImages.map((destination, index) => (
              <div
                key={destination.id}
                className={`relative h-70 w-full group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105`}
              >
                <img
                  src={destination.image}
                  alt={destination.alt}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log(`Experience image loaded: ${destination.name}`)}
                  onError={() => console.error(`Failed to load experience image: ${destination.image}`)}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                
                {/* Destination Name */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg group-hover:text-orange-200 transition-colors duration-300">
                    {destination.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section - Text Content */}
          <div className="space-y-6">
            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Serunya Wisata Bersama Kami
            </h2>
            
            {/* Description Paragraphs */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>GASS TRIP</strong> hadir untuk memberikan pengalaman wisata yang bermakna dan tak terlupakan. 
                Kami percaya bahwa setiap perjalanan adalah cerita yang berharga untuk diceritakan.
              </p>
              
              <p>
                Dengan paket wisata yang dapat disesuaikan untuk keluarga, teman, atau perjalanan pribadi, 
                kami menyediakan layanan yang ramah, fasilitas terbaik, dan pemandu berpengalaman. 
                Jelajahi keindahan alam, budaya, dan kuliner lokal dengan aman dan nyaman.
              </p>
              
              <p>
                Petualangan terbaik dimulai dengan langkah yang tepat. Mari wujudkan impian perjalanan Anda 
                bersama kami dan ciptakan kenangan indah yang akan dikenang selamanya.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
