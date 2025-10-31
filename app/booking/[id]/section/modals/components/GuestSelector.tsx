'use client';

import React, { useState } from 'react';
import { Users, Plus, Minus, User } from 'lucide-react';

interface GuestSelectorProps {
  totalGuests: number;
  onGuestsChange: (guests: number) => void;
  minGuests?: number;
  maxGuests?: number;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({
  totalGuests,
  onGuestsChange,
  minGuests = 1,
  maxGuests = 20
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIncrement = () => {
    if (totalGuests < maxGuests) {
      onGuestsChange(totalGuests + 1);
    }
  };

  const handleDecrement = () => {
    if (totalGuests > minGuests) {
      onGuestsChange(totalGuests - 1);
    }
  };

  const getGuestText = (count: number) => {
    if (count === 1) return '1 Tamu';
    return `${count} Tamu`;
  };

  const getGuestDescription = (count: number) => {
    if (count === 1) return 'Hanya Anda';
    if (count <= 4) return 'Kelompok kecil';
    if (count <= 8) return 'Kelompok sedang';
    return 'Kelompok besar';
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Jumlah Tamu
      </label>
      
      {/* Guest Input Field */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full p-4 border-2 rounded-xl text-left transition-all duration-200
          ${totalGuests > 0 
            ? 'border-gray-500 bg-white' 
            : 'border-gray-300 hover:border-gray-400 bg-white'
          }
          focus:ring-4 focus:ring-gray-100 focus:border-gray-500
        `}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900">
              {getGuestText(totalGuests)}
            </div>
            <div className="text-sm text-gray-500">
              {getGuestDescription(totalGuests)}
            </div>
          </div>
          <Users className="w-5 h-5 text-gray-400" />
        </div>
      </button>

      {/* Guest Selector Dropdown */}
      {isOpen && (
        <div className="absolute z-50 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl p-6 mt-2 w-full animate-in slide-in-from-top-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-900">Jumlah Tamu</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>

          {/* Guest Counter */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <button
              onClick={handleDecrement}
              disabled={totalGuests <= minGuests}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
                ${totalGuests <= minGuests 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-110'
                }
              `}
            >
              <Minus className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {totalGuests}
              </div>
              <div className="text-sm text-gray-500">
                {getGuestText(totalGuests)}
              </div>
            </div>

            <button
              onClick={handleIncrement}
              disabled={totalGuests >= maxGuests}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
                ${totalGuests >= maxGuests 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-110'
                }
              `}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Guest Icons Display */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(totalGuests, 8) }, (_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <User className="w-4 h-4 text-gray-700" />
                </div>
              ))}
              {totalGuests > 8 && (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">+{totalGuests - 8}</span>
                </div>
              )}
            </div>
          </div>

          {/* Guest Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-700 mb-1">
                {getGuestDescription(totalGuests)}
              </div>
              <div className="text-xs text-gray-500">
                {totalGuests === 1 
                  ? 'Perjalanan solo yang menyenangkan'
                  : totalGuests <= 4
                  ? 'Ideal untuk keluarga kecil'
                  : totalGuests <= 8
                  ? 'Cocok untuk grup teman'
                  : 'Perjalanan grup besar'
                }
              </div>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => {
                onGuestsChange(1);
                setIsOpen(false);
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                totalGuests === 1 
                  ? 'border-gray-500 bg-gray-100 text-gray-900' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="text-sm font-medium">Solo</div>
              <div className="text-xs text-gray-500">1 orang</div>
            </button>
            <button
              onClick={() => {
                onGuestsChange(2);
                setIsOpen(false);
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                totalGuests === 2 
                  ? 'border-gray-500 bg-gray-100 text-gray-900' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="text-sm font-medium">Pasangan</div>
              <div className="text-xs text-gray-500">2 orang</div>
            </button>
            <button
              onClick={() => {
                onGuestsChange(4);
                setIsOpen(false);
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                totalGuests === 4 
                  ? 'border-gray-500 bg-gray-100 text-gray-900' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="text-sm font-medium">Keluarga</div>
              <div className="text-xs text-gray-500">4 orang</div>
            </button>
            <button
              onClick={() => {
                onGuestsChange(8);
                setIsOpen(false);
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                totalGuests === 8 
                  ? 'border-gray-500 bg-gray-100 text-gray-900' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="text-sm font-medium">Grup</div>
              <div className="text-xs text-gray-500">8 orang</div>
            </button>
          </div>

          {/* Footer */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;
