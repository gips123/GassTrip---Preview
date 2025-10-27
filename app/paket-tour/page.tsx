import React from 'react';
import { Metadata } from 'next';
import PaketTourHeroSection from '@/app/paket-tour/section/PaketTourHeroSection';
import TourPackagesSection from '@/app/paket-tour/section/TourPackagesSection';
import SectionTagline from '@/components/partials/SectionTagline';

export const metadata: Metadata = {
  title: 'Paket Tour - TravelHub | Pilih Destinasi Impian Anda',
  description: 'Jelajahi berbagai paket tour menarik di Indonesia. Dari Bali, Yogyakarta, Lombok hingga Raja Ampat. Harga terjangkau dengan kualitas terbaik.',
  keywords: 'paket tour, tour bali, tour yogyakarta, tour lombok, tour bromo, raja ampat',
  openGraph: {
    title: 'Paket Tour - TravelHub',
    description: 'Jelajahi berbagai paket tour menarik di Indonesia',
    type: 'website',
    locale: 'id_ID',
  },
};

const PaketTour: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PaketTourHeroSection />
      
      {/* Tour Packages Section */}
      <TourPackagesSection />
    </div>
  );
};

export default PaketTour;
