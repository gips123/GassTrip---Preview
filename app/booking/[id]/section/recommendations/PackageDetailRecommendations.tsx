'use client';

import React from 'react';
import { Star, MapPin, Clock, Users, Heart } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface PackageDetailRecommendationsProps {
  packageId: string;
}

const PackageDetailRecommendations: React.FC<PackageDetailRecommendationsProps> = ({ packageId }) => {
  // Mock data - in real app, fetch from API
  const recommendations = [
    {
      id: 2,
      title: "Paket Bromo Sunrise",
      location: "Bromo, Jawa Timur",
      price: "Rp2.500.000",
      originalPrice: "Rp3.000.000",
      image: "/bromo.jpg",
      duration: "2 Hari 1 Malam",
      rating: 4.7,
      reviews: 89,
      groupSize: "2-6 Orang",
      discount: 17,
      isPopular: true
    },
    {
      id: 3,
      title: "Paket Budaya Yogyakarta",
      location: "Yogyakarta, Jawa Tengah",
      price: "Rp3.200.000",
      originalPrice: "Rp3.800.000",
      image: "/bali.jpg",
      duration: "3 Hari 2 Malam",
      rating: 4.6,
      reviews: 156,
      groupSize: "2-8 Orang",
      discount: 16,
      isPopular: false
    },
    {
      id: 4,
      title: "Paket Petualangan Lombok",
      location: "Lombok, Nusa Tenggara Barat",
      price: "Rp4.500.000",
      originalPrice: "Rp5.200.000",
      image: "/pantai.jpg",
      duration: "4 Hari 3 Malam",
      rating: 4.9,
      reviews: 203,
      groupSize: "2-6 Orang",
      discount: 13,
      isPopular: true
    },
    {
      id: 5,
      title: "Paket Kawah Ijen Blue Fire",
      location: "Banyuwangi, Jawa Timur",
      price: "Rp4.399.000",
      originalPrice: "Rp5.200.000",
      image: "/bromo.jpg",
      duration: "2 Hari 1 Malam",
      rating: 4.8,
      reviews: 78,
      groupSize: "2-4 Orang",
      discount: 15,
      isPopular: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Anda Mungkin Juga Menyukai
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan lebih banyak destinasi dan pengalaman menakjubkan di seluruh Indonesia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendations.map((packageItem) => (
            <div key={packageItem.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={packageItem.image}
                  alt={packageItem.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
  
                
                {/* Favorite Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg">
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Location */}
                <div className="flex items-center text-gray-500 text-xs mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  {packageItem.location}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {packageItem.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(packageItem.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 ml-2">
                    {packageItem.rating} ({packageItem.reviews} reviews)
                  </span>
                </div>
                
                {/* Duration & Group Size */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {packageItem.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {packageItem.groupSize}
                  </div>
                </div>
                
                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      {packageItem.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {packageItem.originalPrice}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    variant="primary" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
                  >
                    Lihat Detail
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 text-sm"
                  >
                    Pesan Sekarang
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Packages */}
        <div className="text-center mt-12">
          <Button 
            variant="secondary"
            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
          >
            Lihat Semua Paket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackageDetailRecommendations;
