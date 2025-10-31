'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

interface DatePickerProps {
  departureDate: string;
  returnDate: string;
  onDepartureChange: (date: string) => void;
  onReturnChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  departureDate,
  returnDate,
  onDepartureChange,
  onReturnChange,
  minDate = new Date().toISOString().split('T')[0],
  maxDate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedType, setSelectedType] = useState<'departure' | 'return'>('departure');
  const datePickerRef = useRef<HTMLDivElement>(null);

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
    
    if (date < today) return true;
    
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    
    return false;
  };

  const isDateSelected = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === departureDate || dateStr === returnDate;
  };

  const isDateInRange = (date: Date) => {
    if (!departureDate || !returnDate) return false;
    const dateStr = date.toISOString().split('T')[0];
    return dateStr > departureDate && dateStr < returnDate;
  };

  const isDateStart = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === departureDate;
  };

  const isDateEnd = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === returnDate;
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    if (selectedType === 'departure') {
      onDepartureChange(dateStr);
      if (!returnDate || dateStr >= returnDate) {
        setSelectedType('return');
      }
    } else {
      if (dateStr > departureDate) {
        onReturnChange(dateStr);
        setIsOpen(false);
      } else {
        onDepartureChange(dateStr);
        setSelectedType('departure');
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

  const calculateNights = () => {
    if (!departureDate || !returnDate) return 0;
    const start = new Date(departureDate);
    const end = new Date(returnDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={datePickerRef}>
      {/* Date Input Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Departure Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keberangkatan
          </label>
          <button
            onClick={() => {
              setIsOpen(true);
              setSelectedType('departure');
            }}
            className={`
              w-full p-4 border-2 rounded-xl text-left transition-all duration-200
              ${departureDate 
                ? 'border-gray-500 bg-white' 
                : 'border-gray-300 hover:border-gray-400 bg-white'
              }
              focus:ring-4 focus:ring-gray-100 focus:border-gray-500
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                {departureDate ? (
                  <div>
                    <div className="font-semibold text-gray-900">{formatDate(departureDate)}</div>
                    <div className="text-sm text-gray-500">Tanggal berangkat</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-500">Pilih tanggal</div>
                    <div className="text-sm text-gray-400">Keberangkatan</div>
                  </div>
                )}
              </div>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>
        
        {/* Return Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kembali
          </label>
          <button
            onClick={() => {
              setIsOpen(true);
              setSelectedType('return');
            }}
            className={`
              w-full p-4 border-2 rounded-xl text-left transition-all duration-200
              ${returnDate 
                ? 'border-gray-500 bg-white' 
                : 'border-gray-300 hover:border-gray-400 bg-white'
              }
              focus:ring-4 focus:ring-gray-100 focus:border-gray-500
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                {returnDate ? (
                  <div>
                    <div className="font-semibold text-gray-900">{formatDate(returnDate)}</div>
                    <div className="text-sm text-gray-500">Tanggal kembali</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-500">Pilih tanggal</div>
                    <div className="text-sm text-gray-400">Kembali</div>
                  </div>
                )}
              </div>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>
      </div>

      {/* Duration Display */}
      {departureDate && returnDate && (
        <div className="mb-4 p-3 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">Durasi Perjalanan</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {calculateNights()} {calculateNights() === 1 ? 'malam' : 'malam'}
            </span>
          </div>
        </div>
      )}

      {/* Modern Calendar */}
      {isOpen && (
        <div className="absolute z-50 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl p-6 mt-2 w-full max-w-md animate-in slide-in-from-top-2 duration-300">
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
          
          {/* Selection Type Indicator */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${selectedType === 'departure' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {selectedType === 'departure' ? 'Pilih tanggal keberangkatan' : 'Pilih tanggal kembali'}
              </span>
            </div>
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
                      w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 relative
                      ${isDateDisabled(day) 
                        ? 'text-gray-300 cursor-not-allowed bg-gray-50' 
                        : isDateStart(day)
                        ? 'bg-gray-900 text-white shadow-lg transform scale-110'
                        : isDateEnd(day)
                        ? 'bg-gray-700 text-white shadow-lg transform scale-110'
                        : isDateInRange(day)
                        ? 'bg-gray-100 text-gray-800 font-semibold'
                        : 'hover:bg-gray-50 hover:text-gray-800 text-gray-700 hover:scale-105'
                      }
                    `}
                  >
                    {day.getDate()}
                    {/* Start/End indicators */}
                    {isDateStart(day) && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-900 rounded-full border-2 border-white"></div>
                    )}
                    {isDateEnd(day) && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-700 rounded-full border-2 border-white"></div>
                    )}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          
          {/* Calendar Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {departureDate && returnDate ? (
                <span className="text-green-600 font-medium">
                  {calculateNights()} malam dipilih
                </span>
              ) : (
                'Pilih tanggal keberangkatan dan kembali'
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onDepartureChange('');
                  onReturnChange('');
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
