'use client';

import React, { useState } from 'react';
import { Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface PackageDetailItineraryProps {
  packageId: string;
}

const PackageDetailItinerary: React.FC<PackageDetailItineraryProps> = ({ packageId }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Mock data - in real app, fetch from API
  const itinerary = [
    {
      day: 1,
      title: "Kedatangan & Eksplorasi Ubud",
      date: "Hari 1",
      activities: [
        {
          time: "08:00",
          title: "Penjemputan Hotel",
          description: "Penjemputan dari hotel Anda di area Denpasar atau Sanur",
          location: "Denpasar/Sanur",
          duration: "30 menit"
        },
        {
          time: "09:00",
          title: "Kunjungi Pura Tanah Lot",
          description: "Jelajahi pura laut ikonik dan saksikan pemandangan laut yang menakjubkan",
          location: "Tanah Lot, Tabanan",
          duration: "2 jam"
        },
        {
          time: "12:00",
          title: "Makan Siang Tradisional Bali",
          description: "Nikmati masakan Bali otentik di restoran lokal",
          location: "Ubud",
          duration: "1 jam"
        },
        {
          time: "14:00",
          title: "Teras Sawah Tegallalang",
          description: "Berjalan melalui teras sawah terkenal dan pelajari tentang pertanian tradisional",
          location: "Tegallalang, Ubud",
          duration: "2 jam"
        },
        {
          time: "17:00",
          title: "Hutan Monyet Ubud",
          description: "Kunjungi hutan monyet suci dan berinteraksi dengan monyet-monyet yang ramah",
          location: "Hutan Monyet Ubud",
          duration: "1 jam"
        }
      ]
    },
    {
      day: 2,
      title: "Imersi Budaya & Waktu Pantai",
      date: "Hari 2",
      activities: [
        {
          time: "08:00",
          title: "Kelas Memasak Tradisional Bali",
          description: "Belajar memasak hidangan Bali otentik dengan bahan-bahan lokal",
          location: "Sekolah Memasak Ubud",
          duration: "3 jam"
        },
        {
          time: "12:00",
          title: "Makan Siang dengan Kelas Memasak",
          description: "Nikmati hidangan yang Anda siapkan selama kelas memasak",
          location: "Sekolah Memasak Ubud",
          duration: "1 jam"
        },
        {
          time: "14:00",
          title: "Kunjungi Pasar Seni Ubud",
          description: "Belanja kerajinan tangan lokal, tekstil, dan suvenir",
          location: "Pasar Seni Ubud",
          duration: "1.5 jam"
        },
        {
          time: "16:00",
          title: "Matahari Terbenam Pantai Jimbaran",
          description: "Bersantai di Pantai Jimbaran dan nikmati matahari terbenam yang terkenal",
          location: "Pantai Jimbaran",
          duration: "2 jam"
        }
      ]
    },
    {
      day: 3,
      title: "Petualangan & Keberangkatan",
      date: "Hari 3",
      activities: [
        {
          time: "08:00",
          title: "Trek Matahari Terbit Gunung Batur",
          description: "Trek pagi-pagi ke Gunung Batur untuk pemandangan matahari terbit yang spektakuler",
          location: "Gunung Batur, Kintamani",
          duration: "4 jam"
        },
        {
          time: "12:00",
          title: "Sarapan di Gunung Batur",
          description: "Nikmati sarapan dengan pemandangan panorama gunung berapi",
          location: "Puncak Gunung Batur",
          duration: "1 jam"
        },
        {
          time: "14:00",
          title: "Pura Tirta Empul",
          description: "Kunjungi pura air suci dan ikuti ritual pembersihan",
          location: "Tirta Empul, Tampaksiring",
          duration: "1.5 jam"
        },
        {
          time: "16:00",
          title: "Kembali ke Hotel",
          description: "Transfer kembali ke hotel atau bandara Anda",
          location: "Denpasar/Sanur",
          duration: "1 jam"
        }
      ]
    }
  ];

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary Detail</h2>
      
      <div className="space-y-4">
        {itinerary.map((day) => (
          <div key={day.day} className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  {day.day}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">{day.title}</h3>
                  <p className="text-gray-600">{day.date}</p>
                </div>
              </div>
              {expandedDay === day.day ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </button>
            
            {/* Day Activities */}
            {expandedDay === day.day && (
              <div className="p-6 bg-white">
                <div className="space-y-6">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      {/* Time */}
                      <div className="flex-shrink-0 w-20">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold text-center">
                          {activity.time}
                        </div>
                      </div>
                      
                      {/* Activity Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{activity.title}</h4>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {activity.duration}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-2">{activity.description}</p>
                        
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {activity.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageDetailItinerary;
