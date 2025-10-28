'use client';

import React, { useEffect } from 'react';
import ContactHeroSection from '@/app/contact/section/ContactHeroSection';
import ContactInformationSection from '@/app/contact/section/ContactInformationSection';
import { useContactPageStore } from './core';

const Contact: React.FC = () => {
  const { contactPage, loading, error, fetchContactPage, clearError } = useContactPageStore();

  useEffect(() => {
    fetchContactPage();
  }, [fetchContactPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center max-w-2xl mx-auto p-8">
          <div className="text-red-600 text-2xl mb-4">🚨 API Data Required</div>
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
            <p className="text-red-800 font-semibold mb-2">Error Details:</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <p className="text-gray-600 mb-4">
            This page requires data from Strapi API. No dummy data is available.
          </p>
          <button 
            onClick={() => {
              clearError();
              fetchContactPage();
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry API Call
          </button>
        </div>
      </div>
    );
  }

  if (!contactPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No contact page data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHeroSection hero={contactPage.hero} background={contactPage.background} />
      
      {/* Combined Contact Information & Form Section */}
      <ContactInformationSection information={contactPage.information} />
    </div>
  );
};

export default Contact;
