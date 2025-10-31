'use client';

import React from 'react';
import { Star, MapPin, Clock, Users, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';

type TourPackage = {
  id: number;
  title: string;
  location: string;
  price: string;
  originalPrice: string;
  image: string;
  duration: string;
  rating: number;
  reviews: number;
  groupSize: string;
  isPopular: boolean;
  discount: number;
};

type TourPackagesGridProps = {
  tourPackages: TourPackage[];
  favorites: number[];
  onToggleFavorite: (id: number, e: React.MouseEvent) => void;
  onCardClick: (id: number) => void;
  onBookNow: (id: number, e: React.MouseEvent) => void;
};

const TourPackagesGrid: React.FC<TourPackagesGridProps> = ({
  tourPackages,
  favorites,
  onToggleFavorite,
  onCardClick,
  onBookNow,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {tourPackages.map((tour) => (
        <div 
          key={tour.id} 
          onClick={() => onCardClick(tour.id)}
          className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-white/20 flex flex-col h-full cursor-pointer"
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Favorite Button */}
            <button
              onClick={(e) => onToggleFavorite(tour.id, e)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
            >
              <Heart 
                className={`w-5 h-5 transition-colors duration-300 ${
                  favorites.includes(tour.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                }`} 
              />
            </button>
          </div>
          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Location */}
            <div className="flex items-center text-gray-500 text-xs mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              {tour.location}
            </div>
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 min-h-[3.5rem]">
              {tour.title}
            </h3>
            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(tour.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-2">
                {tour.rating} ({tour.reviews} ulasan)
              </span>
            </div>
            {/* Duration & Group Size */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {tour.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {tour.groupSize}
              </div>
            </div>
            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  {tour.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {tour.originalPrice}
                </span>
              </div>
            </div>
            {/* Spacer */}
            <div className="flex-grow"></div>
            {/* Action Button */}
            <div className="mt-auto">
              <Button 
                onClick={(e) => onBookNow(tour.id, e)}
                variant="secondary" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Pesan Sekarang
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourPackagesGrid;


