import React from 'react';
import { Plane } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4">
          <Plane className="w-8 h-8 text-blue-600 m-4" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Memuat...</h2>
        <p className="text-gray-600">Mohon tunggu sebentar</p>
      </div>
    </div>
  );
}
