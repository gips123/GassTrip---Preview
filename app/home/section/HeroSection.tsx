'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import FeatureCard from '@/components/partials/FeatureCard';
import { Package, Phone, Plane } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const backgroundImages = [
    {
      src: '/pantai.jpg',
      alt: 'Tropical Island Paradise'
    },
    {
      src: '/bromo.jpg', 
      alt: 'Mountain Adventure'
    },
    {
      src: '/bali.jpg',
      alt: 'City Exploration'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const steps = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Pilih Paket Wisata",
      description: "Pilihan lengkap untuk menjelajahi berbagai destinasi Anda"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Hubungi Kami",
      description: "Hubungi kami sekarang untuk pemesanan dan informasi"
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Siap Jelajah Liburanmu",
      description: "Saatnya menikmati liburan yang tak terlupakan. Buat momen berharga"
    }
  ];

  return (
    <>
      {/* Hero Section with Background Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 overflow-hidden">
          {backgroundImages.map((image, index) => {
            const isActive = index === currentSlide;
            
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                style={{
                  animation: 'kenBurns 15s linear infinite',
                  animationDelay: `${index * 5}s`
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            );
          })}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Pesona Yang Memikat Untuk Perjalanan Anda
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-white mb-8 max-w-6xl mx-auto leading-relaxed">
              Temukan keindahan tersembunyi dari destinasi-destinasi menakjubkan dalam koleksi pilihan kami! 
              Jangan sampai terlewatkan untuk menjelajahi keajaiban yang memikat bersama kami dan ciptakan momen tak terlupakan.
            </p>
            
            {/* CTA Button */}
            <Link href="/paket-tour">
              <Button 
                size="lg"
                rounded="full"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Paket Wisata
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <FeatureCard
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                className="bg-white border border-gray-200 hover:border-orange-200 shadow-lg transition-all duration-300 hover:shadow-xl"
                iconBgColor="bg-blue-500"
                titleSize="text-xl"
                descriptionSize="text-sm"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
