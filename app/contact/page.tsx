import React from 'react';
import ContactHeroSection from '@/app/contact/section/ContactHeroSection';
import ContactInformationSection from '@/app/contact/section/ContactInformationSection';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHeroSection />
      
      {/* Combined Contact Information & Form Section */}
      <ContactInformationSection />
    </div>
  );
};

export default Contact;
