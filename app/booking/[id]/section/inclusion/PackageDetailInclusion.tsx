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
      title: "Transportasi",
      items: [
        "Kendaraan ber-AC",
        "Sopir profesional",
        "Bahan bakar dan tol",
        "Transfer bandara"
      ]
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Makanan",
      items: [
        "Sarapan harian",
        "Makan siang tradisional Bali",
        "Makan malam selamat datang",
        "Makanan kelas memasak"
      ]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Aktivitas & Tiket Masuk",
      items: [
        "Semua tiket masuk pura",
        "Akses teras sawah",
        "Tiket hutan monyet",
        "Izin trek Gunung Batur"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Keamanan & Dukungan",
      items: [
        "Asuransi perjalanan",
        "Pemandu profesional",
        "Peralatan keselamatan",
        "Dukungan 24/7"
      ]
    }
  ];

  const exclusions = [
    "Tiket pesawat internasional",
    "Pengeluaran pribadi",
    "Aktivitas opsional",
    "Tips dan gratifikasi",
    "Minuman beralkohol",
    "Perawatan spa"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Yang Termasuk & Tidak Termasuk</h2>
      
      {/* Inclusions */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Check className="w-6 h-6 text-green-600 mr-2" />
          Yang Termasuk
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
          Yang Tidak Termasuk
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
          Catatan Penting
        </h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Harap bawa sepatu jalan yang nyaman dan pakaian ringan</li>
          <li>• Kamera dan barang pribadi menjadi tanggung jawab Anda</li>
          <li>• Opsi makanan vegetarian tersedia sesuai permintaan</li>
          <li>• Persyaratan usia minimum: 12 tahun</li>
          <li>• Aktivitas yang bergantung pada cuaca mungkin dijadwalkan ulang</li>
        </ul>
      </div>
    </div>
  );
};

export default PackageDetailInclusion;
