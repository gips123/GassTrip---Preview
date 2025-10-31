'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import DateRangePopover from '../components/DateRangePopover';
import GuestsPopover from '../components/GuestsPopover';
import FilterDropdown from '../components/FilterDropdown';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import TourPackagesGrid from '../components/TourPackagesGrid';

const TourPackagesSection: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [locationQuery, setLocationQuery] = useState('');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [rooms, setRooms] = useState<number>(1);
  const [guests, setGuests] = useState<number>(2);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState<boolean>(false);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const addMonths = (date: Date, n: number) => new Date(date.getFullYear(), date.getMonth() + n, 1);
  const fmtShort = (d: Date) => d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const toISO = (d: Date) => d.toISOString().split('T')[0];
  const fromISO = (s: string) => (s ? new Date(s + 'T00:00:00') : null);

  const getMonthGrid = (date: Date) => {
    const first = startOfMonth(date);
    const firstWeekday = first.getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    // leading blanks (treat Sunday as 0)
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(date.getFullYear(), date.getMonth(), d));
    return cells;
  };

  const isInRange = (d: Date) => {
    if (!checkIn || !checkOut) return false;
    const x = toISO(d);
    return x > checkIn && x < checkOut;
  };

  const isStart = (d: Date) => checkIn && toISO(d) === checkIn;
  const isEnd = (d: Date) => checkOut && toISO(d) === checkOut;

  const onPickDay = (d: Date) => {
    const day = toISO(d);
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut('');
    } else if (day >= checkIn) {
      setCheckOut(day);
    } else {
      // if picked earlier than start, set as new start
      setCheckIn(day);
      setCheckOut('');
    }
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (filterRef.current && !filterRef.current.contains(target)) setIsFilterOpen(false);
      if (dateRef.current && !dateRef.current.contains(target)) setIsDateOpen(false);
      if (guestsRef.current && !guestsRef.current.contains(target)) setIsGuestsOpen(false);
    };
    if (isFilterOpen) document.addEventListener('mousedown', onClickOutside);
    if (isDateOpen) document.addEventListener('mousedown', onClickOutside);
    if (isGuestsOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isFilterOpen, isDateOpen, isGuestsOpen]);
  const router = useRouter();

  const tourPackages = [
    {
      id: 1,
      title: "Paket Petualangan Bali",
      location: "Bali, Indonesia",
      price: "Rp6.188.000",
      originalPrice: "Rp7.500.000",
      image: "/bali.jpg",
      duration: "3 Hari 2 Malam",
      rating: 4.8,
      reviews: 124,
      groupSize: "2-8 Orang",
      isPopular: true,
      discount: 17
    },
    {
      id: 2,
      title: "Paket Bromo Sunrise",
      location: "Bromo, Jawa Timur",
      price: "Rp2.500.000",
      originalPrice: "Rp3.000.000",
      image: "/bromo.jpg",
      duration: "2 Hari 1 Malam",
      rating: 4.7,
      reviews: 89,
      groupSize: "2-6 Orang",
      isPopular: true,
      discount: 17
    },
    {
      id: 3,
      title: "Paket Budaya Yogyakarta",
      location: "Yogyakarta, Jawa Tengah",
      price: "Rp3.200.000",
      originalPrice: "Rp3.800.000",
      image: "/bali.jpg",
      duration: "3 Hari 2 Malam",
      rating: 4.6,
      reviews: 156,
      groupSize: "2-8 Orang",
      isPopular: false,
      discount: 16
    },
    {
      id: 4,
      title: "Paket Petualangan Lombok",
      location: "Lombok, Nusa Tenggara Barat",
      price: "Rp4.500.000",
      originalPrice: "Rp5.200.000",
      image: "/pantai.jpg",
      duration: "4 Hari 3 Malam",
      rating: 4.9,
      reviews: 203,
      groupSize: "2-6 Orang",
      isPopular: true,
      discount: 13
    },
    {
      id: 5,
      title: "Paket Kawah Ijen Blue Fire",
      location: "Banyuwangi, Jawa Timur",
      price: "Rp4.399.000",
      originalPrice: "Rp5.200.000",
      image: "/bromo.jpg",
      duration: "2 Hari 1 Malam",
      rating: 4.8,
      reviews: 78,
      groupSize: "2-4 Orang",
      isPopular: true,
      discount: 15
    },
    {
      id: 6,
      title: "Paket Kepulauan Maluku",
      location: "Kepulauan Maluku",
      price: "Rp6.299.000",
      originalPrice: "Rp7.400.000",
      image: "/pantai.jpg",
      duration: "4 Hari 3 Malam",
      rating: 4.9,
      reviews: 56,
      groupSize: "2-8 Orang",
      isPopular: true,
      discount: 15
    },
    {
      id: 7,
      title: "Paket Diving Raja Ampat",
      location: "Raja Ampat, Papua",
      price: "Rp8.866.000",
      originalPrice: "Rp10.500.000",
      image: "/bali.jpg",
      duration: "3 Hari 2 Malam",
      rating: 5.0,
      reviews: 92,
      groupSize: "2-6 Orang",
      isPopular: true,
      discount: 16
    },
    {
      id: 8,
      title: "Paket Budaya Toraja",
      location: "Toraja, Sulawesi Selatan",
      price: "Rp4.399.000",
      originalPrice: "Rp5.100.000",
      image: "/bromo.jpg",
      duration: "4 Hari 3 Malam",
      rating: 4.7,
      reviews: 34,
      groupSize: "2-8 Orang",
      isPopular: false,
      discount: 14
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleCardClick = (id: number) => {
    router.push(`/booking/${id}`);
  };

  const handleBookNow = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    router.push(`/booking/${id}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-12">
          {/* Segmented Search Bar */}
          <div className="mx-auto w-full max-w-7xl">
            <div className="bg-white border border-gray-200 shadow-xl rounded-[40px] px-4 py-3 md:px-8 md:py-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-5 relative">
              {/* Location */}
              <div className="flex-1 basis-[280px] min-w-[220px] flex items-center gap-3 px-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  type="text"
                  placeholder="Cari destinasi, kota, atau paket"
                  className="w-full bg-transparent placeholder:text-gray-400 text-gray-900 focus:outline-none"
                />
              </div>

              <div className="hidden md:block h-10 w-px bg-gray-200" />

              <button
                className="flex-1 basis-[220px] min-w-[180px] text-left px-2"
                onClick={() => { setIsDateOpen(true); }}
              >
                <div className="text-xs text-gray-500">Tanggal Pergi</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div className="font-semibold text-gray-900">
                    {checkIn ? new Date(checkIn).toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short' }) : 'Pilih tanggal'}
                  </div>
                </div>
              </button>

              <div className="hidden md:block h-10 w-px bg-gray-200" />

              {/* Tanggal Pulang */}
              <button
                className="flex-1 basis-[220px] min-w-[180px] text-left px-2"
                onClick={() => { setIsDateOpen(true); }}
              >
                <div className="text-xs text-gray-500">Tanggal Pulang</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div className="font-semibold text-gray-900">
                    {checkOut ? new Date(checkOut).toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short' }) : 'Pilih tanggal'}
                  </div>
                </div>
              </button>

              <div className="hidden md:block h-10 w-px bg-gray-200" />

              {/* Tamu */}
              <button
                className="flex-1 basis-[240px] min-w-[200px] text-left px-2"
                onClick={() => { setIsGuestsOpen(true); }}
              >
                <div className="text-xs text-gray-500">Tamu</div>
                <div className="font-semibold text-gray-900">{guests} Tamu</div>
              </button>

              {/* Filter + Search CTA */}
              <div className="flex items-center justify-center gap-3 md:gap-4 flex-shrink-0">
                <div ref={filterRef} className="relative hidden md:block">
                  <FilterDropdown
                    isOpen={isFilterOpen}
                    onToggle={() => setIsFilterOpen((v) => !v)}
                    sortBy={sortBy}
                    setSortBy={(v) => { setSortBy(v); setIsFilterOpen(false); }}
                  />
                </div>
                <button
                  className="flex items-center gap-2 px-7 md:px-8 py-3 rounded-full text-white font-semibold bg-orange-500 hover:bg-orange-600 transition-colors whitespace-nowrap"
                  onClick={() => {
                    // implement search trigger
                  }}
                >
                  <Search className="w-5 h-5" />
                  Cari
                </button>
              </div>

              {/* Date popover */}
              {isDateOpen && (
                <div ref={dateRef} className="absolute left-4 right-4 md:left-auto md:right-[210px] top-full mt-3 z-20 w-full md:w-[540px]">
                  <DateRangePopover
                    isOpen={isDateOpen}
                    onClose={() => setIsDateOpen(false)}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    setCheckIn={setCheckIn}
                    setCheckOut={setCheckOut}
                    className="w-full"
                  />
                </div>
              )}

              {/* Guests popover */}
              {isGuestsOpen && (
                <div ref={guestsRef} className="absolute right-4 top-full mt-3 z-20 w-[260px]">
                  <GuestsPopover
                    isOpen={isGuestsOpen}
                    onClose={() => setIsGuestsOpen(false)}
                    guests={guests}
                    setGuests={setGuests}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Tour Packages Grid */}
        <TourPackagesGrid
          tourPackages={tourPackages}
          favorites={favorites}
          onToggleFavorite={(id, e) => { e.stopPropagation(); toggleFavorite(id); }}
          onCardClick={handleCardClick}
          onBookNow={handleBookNow}
        />
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="secondary"
            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
          >
            Lihat Semua Paket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourPackagesSection;
