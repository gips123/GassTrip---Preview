'use client';

import React, { useState } from 'react';
import { MapPin, Clock, Mail, Phone, User, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';
import FeatureCard from '@/components/partials/FeatureCard';

const ContactInformationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Alamat",
      description: "Jalan Raya Pondok Gede Nomor 18 E, Lubang Buaya, Kec. Cipayung, DKI Jakarta"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Jam Operasional",
      description: "Senin - Jumat: 09.00 WIB - 17.00 WIB\nWeekend: 12.00 WIB - 15.00 WIB"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "admin@gasstrip.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telepon",
      description: "+62 877-8574-0144"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight">
            Informasi Kontak
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Tim profesional kami siap membantu mewujudkan perjalanan impian Anda dengan layanan terbaik dan pengalaman tak terlupakan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Map and Contact Cards */}
          <div className="space-y-6">
            {/* Map Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="relative h-80">
                <Image
                  src="/maps.png"
                  alt="Lokasi Gasstrip Travel"
                  fill
                  className="object-cover"
                  priority
                />

              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <FeatureCard
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  description={info.description}
                  className="bg-white/90 backdrop-blur-sm"
                  iconBgColor="bg-blue-500"
                  iconSize="w-10 h-10"
                  titleSize="text-sm"
                  descriptionSize="text-xs"
                />
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4 border border-gray-200 rounded-2xl p-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Kami ingin mendengar kabar dari Anda!</h3>
                    <p className="text-blue-600 font-medium">Tim kami siap membantu Anda</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Kirimkan pesan kepada kami dan tim profesional kami akan segera merespons dalam waktu 1 jam.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Field */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">
                    First & Last Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Masukkan alamat email Anda"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-3">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Masukkan subjek pesan"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
                    Comment or Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none"
                      placeholder="Tuliskan pesan Anda di sini..."
                    />
                    <div className="absolute top-4 right-4">
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Mengirim Pesan...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInformationSection;