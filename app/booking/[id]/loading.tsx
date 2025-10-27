import React from 'react';
import { Plane, MapPin, Calendar, Users } from 'lucide-react';

export default function PackageLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="h-8 bg-white/30 rounded w-48 mb-4"></div>
          <div className="h-12 bg-white/30 rounded w-96 mb-4"></div>
          <div className="h-6 bg-white/30 rounded w-64"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <div className="h-8 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-blue-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
