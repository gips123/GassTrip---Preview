'use client';

import React, { useState } from 'react';
import { Star, MapPin, Clock, Users, Heart, Filter, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const TourPackagesSection: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const router = useRouter();

  const tourPackages = [
    {
      id: 1,
      title: "Bali Adventure Package",
      location: "Bali, Indonesia",
      price: "Rp6.188.000",
      originalPrice: "Rp7.500.000",
      image: "/bali.jpg",
      duration: "3 Days 2 Nights",
      rating: 4.8,
      reviews: 124,
      groupSize: "2-8 People",
      isPopular: true,
      discount: 17
    },
    {
      id: 2,
      title: "Bromo Sunrise Experience",
      location: "Bromo, East Java",
      price: "Rp3.797.000",
      originalPrice: "Rp4.200.000",
      image: "/bromo.jpg",
      duration: "3 Days 2 Nights",
      rating: 4.9,
      reviews: 89,
      groupSize: "2-6 People",
      isPopular: true,
      discount: 10
    },
    {
      id: 3,
      title: "Flores Island Discovery",
      location: "Flores, NTT",
      price: "Rp3.889.000",
      originalPrice: "Rp4.500.000",
      image: "/pantai.jpg",
      duration: "2 Days 1 Night",
      rating: 4.7,
      reviews: 67,
      groupSize: "2-4 People",
      isPopular: false,
      discount: 14
    },
    {
      id: 4,
      title: "Kalimantan Wildlife",
      location: "Kalimantan",
      price: "Rp5.880.000",
      originalPrice: "Rp6.800.000",
      image: "/bali.jpg",
      duration: "4 Days 3 Nights",
      rating: 4.6,
      reviews: 45,
      groupSize: "2-6 People",
      isPopular: false,
      discount: 14
    },
    {
      id: 5,
      title: "Kawah Ijen Blue Fire",
      location: "Banyuwangi, East Java",
      price: "Rp4.399.000",
      originalPrice: "Rp5.200.000",
      image: "/bromo.jpg",
      duration: "2 Days 1 Night",
      rating: 4.8,
      reviews: 78,
      groupSize: "2-4 People",
      isPopular: true,
      discount: 15
    },
    {
      id: 6,
      title: "Maluku Paradise",
      location: "Maluku Islands",
      price: "Rp6.299.000",
      originalPrice: "Rp7.400.000",
      image: "/pantai.jpg",
      duration: "4 Days 3 Nights",
      rating: 4.9,
      reviews: 56,
      groupSize: "2-8 People",
      isPopular: true,
      discount: 15
    },
    {
      id: 7,
      title: "Raja Ampat Diving",
      location: "Raja Ampat, Papua",
      price: "Rp8.866.000",
      originalPrice: "Rp10.500.000",
      image: "/bali.jpg",
      duration: "3 Days 2 Nights",
      rating: 5.0,
      reviews: 92,
      groupSize: "2-6 People",
      isPopular: true,
      discount: 16
    },
    {
      id: 8,
      title: "Toraja Cultural Tour",
      location: "Toraja, Sulawesi",
      price: "Rp4.399.000",
      originalPrice: "Rp5.100.000",
      image: "/bromo.jpg",
      duration: "4 Days 3 Nights",
      rating: 4.7,
      reviews: 34,
      groupSize: "2-8 People",
      isPopular: false,
      discount: 14
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleCardClick = (id: number) => {
    router.push(`/paket-tour/${id}`);
  };

  const handleBookNow = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    router.push(`/paket-tour/${id}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Paket Wisata Terbaik
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Jelajahi keindahan Indonesia dengan paket wisata terpilih yang dirancang khusus untuk pengalaman tak terlupakan
          </p>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari destinasi..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="popularity">Sort by popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Menampilkan {tourPackages.length} paket wisata
          </div>
        </div>

        {/* Tour Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tourPackages.map((tour) => (
            <div 
              key={tour.id} 
              onClick={() => handleCardClick(tour.id)}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(tour.id);
                  }}
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
                    {tour.rating} ({tour.reviews} reviews)
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
                
                {/* Spacer to push buttons to bottom */}
                <div className="flex-grow"></div>
                
–                {/* Action Button */}
                <div className="mt-auto">
                  <Button 
                    onClick={(e) => handleBookNow(tour.id, e)}
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
        
        {/* Load More Button */}
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

export default TourPackagesSection;
