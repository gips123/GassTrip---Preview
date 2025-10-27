import React from 'react';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-8">
            Maaf, halaman yang Anda cari tidak ditemukan. 
            Mungkin halaman tersebut telah dipindahkan atau dihapus.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          
          <Link
            href="/paket-tour"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Search className="w-4 h-4 mr-2" />
            Lihat Paket Tour
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Jika Anda yakin ini adalah kesalahan, silakan hubungi tim support kami.</p>
        </div>
      </div>
    </div>
  );
}
