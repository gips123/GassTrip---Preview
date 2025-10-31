'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Heart, Plane, Globe, Shield } from 'lucide-react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Image src="/gasstrip-logo.png" alt="GassTrip Logo" width={80} height={80} />

              <h3 className="text-2xl font-bold">GassTrip</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Jelajahi dunia dengan pengalaman tak terlupakan. Kami menghadirkan petualangan terbaik 
              dengan layanan berkualitas tinggi dan harga yang terjangkau.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/paket-tour" className="text-gray-300 hover:text-white transition-colors">
                  Paket Tour
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Kontak
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Media Sosial</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Facebook className="w-5 h-5 text-blue-400 mr-3" />
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Facebook
                </a>
              </div>
              <div className="flex items-center">
                <Instagram className="w-5 h-5 text-blue-400 mr-3" />
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
              <div className="flex items-center">
                <Twitter className="w-5 h-5 text-blue-400 mr-3" />
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Twitter
                </a>
              </div>
              <div className="flex items-center">
                <Youtube className="w-5 h-5 text-blue-400 mr-3" />
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  YouTube
                </a>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-blue-400 mr-3" />
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Website
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Hubungi Kami</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                  Jalan Raya Pondok Gede Nomor 18 E, Lubang Buaya, Kec. Cipayung, Jakarta Timur
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="tel:+6281234567890" className="text-gray-300 hover:text-white transition-colors">
                  +62 877-8574-0144
                </a>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@.com" className="text-gray-300 hover:text-white transition-colors">
                  admin@gasstrip.com
                </a>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Senin - Jumat: 09.00 WIB - 17.00 WIB Weekend: 12.00 WIB - 15.00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-8 mb-4 md:mb-0">
              <div className="flex items-center text-sm text-gray-300">
                <Shield className="w-4 h-4 text-green-400 mr-2" />
                <span>Pembayaran Aman</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Globe className="w-4 h-4 text-blue-400 mr-2" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Heart className="w-4 h-4 text-red-400 mr-2" />
                <span>100% Kepuasan</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>© 2025 GassTrip. Semua hak dilindungi.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
