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
      title: "Amazing Bali Experience!",
      content: "This tour exceeded all my expectations. The guide was knowledgeable, the itinerary was perfect, and the accommodations were excellent. The rice terraces were absolutely breathtaking, and the cooking class was so much fun!",
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
      title: "Great tour with minor issues",
      content: "Overall a very good experience. The guide was friendly and the sights were beautiful. The only downside was that the Mount Batur trek was quite challenging for beginners, but the sunrise view was worth it.",
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
      title: "Perfect family trip",
      content: "Traveled with my family including two teenagers. Everyone had a great time! The activities were well-paced and suitable for all ages. The traditional Balinese lunch was delicious and the temple visits were very educational.",
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
      title: "Good but could be better",
      content: "The tour was good overall, but I felt rushed at some locations. The guide was knowledgeable but sometimes seemed to be in a hurry. The accommodation was decent but not as luxurious as expected.",
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
      title: "Unforgettable experience!",
      content: "This was one of the best tours I've ever taken. The guide was exceptional, the itinerary was perfect, and every activity was well-organized. The sunset at Jimbaran Beach was magical. Highly recommended!",
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      
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
              <p className="text-gray-600">Based on {reviews.length} reviews</p>
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Rating Breakdown</h3>
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
          All Reviews
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
            {rating} Star{rating > 1 ? 's' : ''}
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
                        Verified
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
                  Helpful ({review.helpful})
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default PackageDetailReviews;
