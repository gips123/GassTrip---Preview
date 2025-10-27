'use client';

import React from 'react';
import Image from 'next/image';

const ContactHeroSection: React.FC = () => {
  return (
    <section 
      className="relative h-[70vh] overflow-hidden"
      style={{
        backgroundImage: `url('/bromo.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight font-bold">
            Hubungi Kami
          </h1>
          
          {/* Description Paragraph */}
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-light">
            Kami selalu siap membantu Anda!<br />
            Jika Anda memiliki pertanyaan, ingin konsultasi paket wisata, atau membutuhkan bantuan jangan ragu untuk menghubungi tim kami.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
