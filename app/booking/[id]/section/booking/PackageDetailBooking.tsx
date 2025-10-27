'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, CreditCard, Shield, Star, Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PackageDetailBookingProps {
  packageId: string;
}

const PackageDetailBooking: React.FC<PackageDetailBookingProps> = ({ packageId }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  // Mock data - in real app, fetch from API
  const packageData = {
    price: 6188000,
    originalPrice: 7500000,
    discount: 17,
    rating: 4.8,
    reviews: 124,
    duration: "3 Days 2 Nights",
    groupSize: "2-8 People"
  };

  const calculateTotal = () => {
    return packageData.price * travelers;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === checkInDate || dateStr === checkOutDate;
  };

  const isDateInRange = (date: Date) => {
    if (!checkInDate || !checkOutDate) return false;
    const dateStr = date.toISOString().split('T')[0];
    return dateStr > checkInDate && dateStr < checkOutDate;
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(dateStr);
      setCheckOutDate('');
    } else if (checkInDate && !checkOutDate) {
      if (dateStr > checkInDate) {
        setCheckOutDate(dateStr);
      } else {
        setCheckInDate(dateStr);
        setCheckOutDate('');
      }
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="sticky top-8">
      <div className=" rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Price Header */}
        <div className=" p-6 text-white">
          <div className="text-blue-900 flex items-center justify-between mb-2 border border-blue-500 p-4 rounded-xl">
            <span className="text-2xl font-bold">{formatPrice(packageData.price)}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm">{packageData.rating} ({packageData.reviews})</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-600 wq line-through">{formatPrice(packageData.originalPrice)}</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{packageData.discount}%
            </span>
          </div>
        </div>

        {/* Booking Form */}
        <div className="p-6">

          {/* Date Selection */}
          <div className="mb-6 relative">
            <label className="block font-semibold text-gray-900 mb-4">
              <Calendar className="w-5 h-5 inline mr-2 text-blue-600" />
              Pilih Tanggal
            </label>
            
            {/* Date Input Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`
                    w-full p-4 border-2 rounded-xl text-left transition-all duration-200
                    ${checkInDate 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-400 bg-white'
                    }
                    focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {checkInDate ? (
                        <div>
                          <div className="font-semibold text-gray-900">{formatDate(checkInDate)}</div>
                          <div className="text-sm text-gray-500">Check-in</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-gray-500">Pilih tanggal</div>
                          <div className="text-sm text-gray-400">Check-in</div>
                        </div>
                      )}
                    </div>
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`
                    w-full p-4 border-2 rounded-xl text-left transition-all duration-200
                    ${checkOutDate 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-400 bg-white'
                    }
                    focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {checkOutDate ? (
                        <div>
                          <div className="font-semibold text-gray-900">{formatDate(checkOutDate)}</div>
                          <div className="text-sm text-gray-500">Check-out</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-gray-500">Pilih tanggal</div>
                          <div className="text-sm text-gray-400">Check-out</div>
                        </div>
                      )}
                    </div>
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              </div>
            </div>

            {/* Enhanced Calendar */}
            {showCalendar && (
              <div ref={calendarRef} className="absolute z-50 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl p-6 mt-2 w-full max-w-md animate-in slide-in-from-top-2 duration-300">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="font-bold text-lg text-gray-900">
                    {currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, index) => (
                    <div key={index} className="text-center text-sm font-bold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentMonth).map((day, index) => (
                    <div key={index} className="aspect-square flex items-center justify-center">
                      {day ? (
                        <button
                          onClick={() => handleDateClick(day)}
                          disabled={isDateDisabled(day)}
                          className={`
                            w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200
                            ${isDateDisabled(day) 
                              ? 'text-gray-300 cursor-not-allowed bg-gray-50' 
                              : isDateSelected(day)
                              ? 'bg-blue-600 text-white shadow-lg transform scale-110'
                              : isDateInRange(day)
                              ? 'bg-blue-100 text-blue-700 font-semibold'
                              : 'hover:bg-blue-50 hover:text-blue-600 text-gray-700 hover:scale-105'
                            }
                          `}
                        >
                          {day.getDate()}
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    {checkInDate && checkOutDate ? (
                      <span className="text-green-600 font-medium">
                        {Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))} malam
                      </span>
                    ) : (
                      'Pilih tanggal check-in dan check-out'
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCheckInDate('');
                        setCheckOutDate('');
                        setShowCalendar(false);
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setShowCalendar(false)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Travelers */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 mb-3">
              <Users className="w-4 h-4 inline mr-2" />
              Number of Travelers
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <span className="text-lg font-semibold w-12 text-center">{travelers}</span>
              <button
                onClick={() => setTravelers(Math.min(8, travelers + 1))}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Maximum 8 people per group</p>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Base price × {travelers} travelers</span>
              <span className="font-semibold">{formatPrice(calculateTotal())}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Service fee</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="border-t border-gray-300 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-blue-600">{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <Button 
            variant="primary"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 mb-4"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Book Now
          </Button>

          {/* Security Badge */}
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Shield className="w-4 h-4 mr-2" />
            Secure booking with instant confirmation
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Duration: {packageData.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>Group size: {packageData.groupSize}</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              <span>Free cancellation up to 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailBooking;
