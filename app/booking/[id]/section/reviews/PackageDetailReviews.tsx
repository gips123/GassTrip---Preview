'use client';

import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Calendar, MapPin } from 'lucide-react';

interface PackageDetailReviewsProps {
  packageId: string;
}

const PackageDetailReviews: React.FC<PackageDetailReviewsProps> = ({ packageId }) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Mock data - in real app, fetch from API
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/bali.jpg",
        location: "New York, USA"
      },
      rating: 5,
      date: "2024-01-15",
      title: "Pengalaman Bali yang Menakjubkan!",
      content: "Tur ini melampaui semua harapan saya. Pemandunya berpengetahuan luas, itinerari sempurna, dan akomodasi sangat baik. Teras sawah benar-benar memukau, dan kelas memasak sangat menyenangkan!",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "/bromo.jpg",
        location: "Singapore"
      },
      rating: 4,
      date: "2024-01-10",
      title: "Tur bagus dengan sedikit masalah",
      content: "Secara keseluruhan pengalaman yang sangat baik. Pemandunya ramah dan pemandangannya indah. Satu-satunya kelemahan adalah trek Gunung Batur cukup menantang untuk pemula, tapi pemandangan matahari terbitnya sepadan.",
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar: "/pantai.jpg",
        location: "Melbourne, Australia"
      },
      rating: 5,
      date: "2024-01-05",
      title: "Perjalanan keluarga yang sempurna",
      content: "Bepergian dengan keluarga termasuk dua remaja. Semua orang bersenang-senang! Aktivitasnya teratur dengan baik dan cocok untuk semua usia. Makan siang tradisional Bali lezat dan kunjungan pura sangat mendidik.",
      helpful: 15,
      verified: true
    },
    {
      id: 4,
      user: {
        name: "David Kim",
        avatar: "/bali.jpg",
        location: "Seoul, South Korea"
      },
      rating: 3,
      date: "2023-12-28",
      title: "Bagus tapi bisa lebih baik",
      content: "Tur secara keseluruhan bagus, tapi saya merasa terburu-buru di beberapa lokasi. Pemandunya berpengetahuan tapi kadang terlihat terburu-buru. Akomodasi cukup baik tapi tidak sel mewah seperti yang diharapkan.",
      helpful: 3,
      verified: true
    },
    {
      id: 5,
      user: {
        name: "Lisa Rodriguez",
        avatar: "/bromo.jpg",
        location: "Barcelona, Spain"
      },
      rating: 5,
      date: "2023-12-20",
      title: "Pengalaman yang tak terlupakan!",
      content: "Ini adalah salah satu tur terbaik yang pernah saya ikuti. Pemandunya luar biasa, itinerari sempurna, dan setiap aktivitas terorganisir dengan baik. Matahari terbenam di Pantai Jimbaran sangat magis. Sangat direkomendasikan!",
      helpful: 20,
      verified: true
    }
  ];

  const ratingStats = {
    5: 45,
    4: 30,
    3: 15,
    2: 7,
    1: 3
  };

  const filteredReviews = filterRating 
    ? reviews.filter(review => review.rating === filterRating)
    : reviews;

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ulasan Pelanggan</h2>
      
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Overall Rating */}
        <div>
          <div className="flex items-center mb-4">
            <div className="text-4xl font-bold text-gray-900 mr-4">{averageRating.toFixed(1)}</div>
            <div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Berdasarkan {reviews.length} ulasan</p>
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Rincian Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <span className="w-8 text-sm text-gray-600">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current mx-2" />
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${ratingStats[rating as keyof typeof ratingStats]}%` }}
                  ></div>
                </div>
                <span className="w-8 text-sm text-gray-600">{ratingStats[rating as keyof typeof ratingStats]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterRating(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filterRating === null 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Semua Ulasan
        </button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => setFilterRating(rating)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterRating === rating 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {rating} Bintang
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="flex items-center">
                    <h4 className="font-bold text-gray-900">{review.user.name}</h4>
                    {review.verified && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Terverifikasi
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {review.user.location}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(review.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div>
              <h5 className="font-bold text-gray-900 mb-2">{review.title}</h5>
              <p className="text-gray-600 leading-relaxed mb-4">{review.content}</p>
              
              {/* Review Actions */}
              <div className="flex items-center justify-between">
                <button className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Membantu ({review.helpful})
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Balas
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300">
          Muat Lebih Banyak Ulasan
        </button>
      </div>
    </div>
  );
};

export default PackageDetailReviews;
