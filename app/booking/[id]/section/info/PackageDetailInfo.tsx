'use client';

import React from 'react';
import { MapPin, Clock, Users, Star, Shield, Award } from 'lucide-react';

interface PackageDetailInfoProps {
  packageId: string;
}

const PackageDetailInfo: React.FC<PackageDetailInfoProps> = ({ packageId }) => {
  // Mock data - in real app, fetch from API
  const packageInfo = {
    description: "Experience the magic of Bali with our carefully curated 3-day adventure package. This comprehensive tour takes you through Bali's most iconic landmarks, from ancient temples to stunning rice terraces, pristine beaches, and authentic cultural experiences. Perfect for first-time visitors and returning travelers alike.",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Package</h2>
        <p className="text-gray-600 leading-relaxed">
          {packageInfo.description}
        </p>
      </div>
    </div>
  );
};

export default PackageDetailInfo;
