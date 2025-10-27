import { Metadata } from 'next';
import HeroSection from './section/HeroSection';
import PopularSection from './section/PopularSection';
import TestimonialsSection from './section/TestimonialsSection';
import PackagesSection from './section/PackagesSection';
import ExperienceSection from './section/ExperienceSection';

export const metadata: Metadata = {
  title: 'Beranda - TravelHub | Jelajahi Dunia Bersama Kami',
  description: 'Temukan paket tour terbaik dan destinasi menakjubkan di Indonesia. Dari Bali hingga Raja Ampat, ciptakan kenangan tak terlupakan dengan TravelHub.',
  keywords: 'travel, tour, paket wisata, bali, indonesia, destinasi wisata',
  openGraph: {
    title: 'TravelHub - Jelajahi Dunia Bersama Kami',
    description: 'Temukan paket tour terbaik dan destinasi menakjubkan di Indonesia',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TravelHub - Jelajahi Dunia Bersama Kami',
    description: 'Temukan paket tour terbaik dan destinasi menakjubkan di Indonesia',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PopularSection />
      <TestimonialsSection />
      <PackagesSection />
      <ExperienceSection />
    </div>
  );
}
