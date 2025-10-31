import React from 'react';
import { Plane } from 'lucide-react';

interface LoadingProps {
  message?: string;
  variant?: 'spinner' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
}

export default function Loading({ 
  message = 'Memuat...', 
  variant = 'spinner',
  size = 'md' 
}: LoadingProps) {
  const sizeClasses = {
    sm: { spinner: 'h-12 w-12', icon: 'w-4 h-4', text: 'text-base' },
    md: { spinner: 'h-16 w-16', icon: 'w-8 h-8', text: 'text-xl' },
    lg: { spinner: 'h-32 w-32', icon: 'w-12 h-12', text: 'text-2xl' },
  };

  const currentSize = sizeClasses[size];

  if (variant === 'skeleton') {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="h-[70vh] bg-gray-200" />
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="h-64 bg-gray-200 rounded" />
              <div className="h-32 bg-gray-200 rounded" />
            </div>
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className={`animate-spin rounded-full ${currentSize.spinner} border-b-2 border-blue-600 mx-auto mb-4 flex items-center justify-center`}>
          <Plane className={`${currentSize.icon} text-blue-600`} />
        </div>
        <h2 className={`${currentSize.text} font-semibold text-gray-900 mb-2`}>
          {message}
        </h2>
        <p className="text-gray-600">Mohon tunggu sebentar</p>
      </div>
    </div>
  );
}

