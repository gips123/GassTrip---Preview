'use client';

import React from 'react';
import { MapPin, Clock, Users, Star, Shield, Award } from 'lucide-react';

interface PackageDetailInfoProps {
  packageId: string;
}

const PackageDetailInfo: React.FC<PackageDetailInfoProps> = ({ packageId }) => {
  // Mock data - in real app, fetch from API
  const packageInfo = {
    description: "Rasakan keajaiban Bali dengan paket petualangan 3 hari yang telah kami kurasi dengan hati-hati. Tur komprehensif ini akan membawa Anda melalui landmark paling ikonik Bali, mulai dari pura kuno hingga teras sawah yang menakjubkan, pantai yang masih asri, dan pengalaman budaya otentik. Sempurna untuk pengunjung pertama kali maupun wisatawan yang kembali.",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Paket Ini</h2>
        <p className="text-gray-600 leading-relaxed">
          {packageInfo.description}
        </p>
      </div>
    </div>
  );
};

export default PackageDetailInfo;
