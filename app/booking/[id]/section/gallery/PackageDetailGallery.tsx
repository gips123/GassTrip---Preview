'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface PackageDetailGalleryProps {
  packageId: string;
}

const PackageDetailGallery: React.FC<PackageDetailGalleryProps> = ({ packageId }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  // Mock data - in real app, fetch from API
  const galleryImages = [
    {
      id: 1,
      src: "/bali.jpg",
      alt: "Bali Beach View",
      title: "Pantai Kuta",
      description: "Pemandangan pantai yang menakjubkan di Kuta, Bali"
    },
    {
      id: 2,
      src: "/bromo.jpg",
      alt: "Mount Bromo",
      title: "Gunung Bromo",
      description: "Sunrise yang spektakuler di Gunung Bromo"
    },
    {
      id: 3,
      src: "/pantai.jpg",
      alt: "Beautiful Beach",
      title: "Pantai Sanur",
      description: "Pantai dengan air yang jernih dan pasir putih"
    },
    {
      id: 4,
      src: "/bali.jpg",
      alt: "Bali Temple",
      title: "Pura Tanah Lot",
      description: "Temple yang terkenal di atas batu karang"
    },
    {
      id: 5,
      src: "/bromo.jpg",
      alt: "Volcano Landscape",
      title: "Kawah Bromo",
      description: "Pemandangan kawah yang menakjubkan"
    },
    {
      id: 6,
      src: "/pantai.jpg",
      alt: "Sunset Beach",
      title: "Sunset di Jimbaran",
      description: "Momen sunset yang romantis di pantai Jimbaran"
    },
    {
      id: 7,
      src: "/bali.jpg",
      alt: "Rice Terraces",
      title: "Tegallalang Rice Terraces",
      description: "Sawah berundak yang terkenal di Ubud"
    },
    {
      id: 8,
      src: "/bromo.jpg",
      alt: "Mountain View",
      title: "Pemandangan Gunung",
      description: "Pemandangan gunung yang memukau"
    },
    {
      id: 9,
      src: "/pantai.jpg",
      alt: "Beach Activities",
      title: "Aktivitas Pantai",
      description: "Berbagai aktivitas seru di pantai"
    },
    {
      id: 10,
      src: "/bali.jpg",
      alt: "Cultural Site",
      title: "Situs Budaya",
      description: "Tempat bersejarah dan budaya"
    },
    {
      id: 11,
      src: "/bromo.jpg",
      alt: "Nature View",
      title: "Pemandangan Alam",
      description: "Keindahan alam yang memukau"
    },
    {
      id: 12,
      src: "/pantai.jpg",
      alt: "Water Activities",
      title: "Aktivitas Air",
      description: "Berbagai aktivitas di air"
    },
    {
      id: 13,
      src: "/bali.jpg",
      alt: "Local Food",
      title: "Kuliner Lokal",
      description: "Makanan khas daerah"
    },
    {
      id: 14,
      src: "/bromo.jpg",
      alt: "Adventure",
      title: "Petualangan",
      description: "Momen petualangan yang seru"
    },
    {
      id: 15,
      src: "/pantai.jpg",
      alt: "Relaxation",
      title: "Momen Santai",
      description: "Waktu untuk bersantai"
    }
  ];

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const openAllImages = () => {
    setShowAllImages(true);
  };

  const closeAllImages = () => {
    setShowAllImages(false);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Gallery Grid - 1 Large + 4 Small Layout */}
        <div className="grid grid-cols-2 gap-3 max-w-7xl mx-auto">
          {/* Large Image - Left Side */}
          <div className="group relative aspect-square overflow-hidden cursor-pointer rounded-lg"
               onClick={() => openModal(0)}>
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Small Images - Right Side */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            {galleryImages.slice(1, 5).map((image, index) => {
              const isLastImage = index === 3 && galleryImages.length > 5;
              const remainingCount = galleryImages.length - 5;
              
              return (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden cursor-pointer rounded-lg"
                  onClick={() => isLastImage ? openAllImages() : openModal(index + 1)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay for last image with remaining count */}
                  {isLastImage ? (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold">+{remainingCount}</div>
                        <div className="text-sm">Lihat Semua</div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          {/* Close Button - Outside Image */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-blue-600 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            <X className="w-7 h-7 text-white" />
          </button>
          
          <div className="relative max-w-4xl max-h-[90vh] w-full">

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden">
              <Image
                src={galleryImages[selectedImageIndex].src}
                alt={galleryImages[selectedImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Info */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {galleryImages[selectedImageIndex].title}
              </h3>
              <p className="text-white/80 text-lg">
                {galleryImages[selectedImageIndex].description}
              </p>
              <div className="mt-4 text-white/60">
                {selectedImageIndex + 1} dari {galleryImages.length} foto
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Images Modal */}
      {showAllImages && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          {/* Close Button - Outside Content */}
          <button
            onClick={closeAllImages}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            <X className="w-7 h-7 text-white" />
          </button>
          
          <div className="relative max-w-6xl max-h-[90vh] w-full">

            {/* All Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[80vh] overflow-y-auto">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden cursor-pointer rounded-lg"
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setShowAllImages(false);
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Info */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Semua Foto ({galleryImages.length} foto)
              </h3>
              <p className="text-white/80 text-lg">
                Klik foto untuk melihat dalam ukuran penuh
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PackageDetailGallery;
