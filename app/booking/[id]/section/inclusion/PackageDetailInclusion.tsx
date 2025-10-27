'use client';

import React from 'react';
import { Check, X, Wifi, Car, Utensils, Shield, MapPin, Clock } from 'lucide-react';

interface PackageDetailInclusionProps {
  packageId: string;
}

const PackageDetailInclusion: React.FC<PackageDetailInclusionProps> = ({ packageId }) => {
  // Mock data - in real app, fetch from API
  const inclusions = [
    {
      icon: <Car className="w-6 h-6" />,
      title: "Transportation",
      items: [
        "Air-conditioned vehicle",
        "Professional driver",
        "Fuel and toll fees",
        "Airport transfers"
      ]
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Meals",
      items: [
        "Daily breakfast",
        "Traditional Balinese lunch",
        "Welcome dinner",
        "Cooking class meal"
      ]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Activities & Entrance",
      items: [
        "All temple entrance fees",
        "Rice terrace access",
        "Monkey forest ticket",
        "Mount Batur trek permit"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety & Support",
      items: [
        "Travel insurance",
        "Professional guide",
        "Safety equipment",
        "24/7 support"
      ]
    }
  ];

  const exclusions = [
    "International flights",
    "Personal expenses",
    "Optional activities",
    "Tips and gratuities",
    "Alcoholic beverages",
    "Spa treatments"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">What's Included & Excluded</h2>
      
      {/* Inclusions */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Check className="w-6 h-6 text-green-600 mr-2" />
          What's Included
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inclusions.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="text-blue-600 mr-3">
                  {category.icon}
                </div>
                <h4 className="font-bold text-gray-900">{category.title}</h4>
              </div>
              
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Exclusions */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <X className="w-6 h-6 text-red-600 mr-2" />
          What's Not Included
        </h3>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Important Notes */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center">
          <Clock className="w-5 h-5 text-yellow-600 mr-2" />
          Important Notes
        </h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Please bring comfortable walking shoes and light clothing</li>
          <li>• Camera and personal items are your responsibility</li>
          <li>• Vegetarian meal options available upon request</li>
          <li>• Minimum age requirement: 12 years old</li>
          <li>• Weather-dependent activities may be rescheduled</li>
        </ul>
      </div>
    </div>
  );
};

export default PackageDetailInclusion;
