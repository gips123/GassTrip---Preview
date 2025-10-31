'use client';

import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Heart, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import DatePicker from './components/DatePicker';
import GuestSelector from './components/GuestSelector';

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  departureDate: string;
  returnDate: string;
  totalGuests: number;
  specialRequests: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (formData: BookingFormData) => void;
  packageData?: {
    id: string;
    title: string;
    price: string;
    duration: string;
    location: string;
  };
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
  isOpen,
  onClose,
  onNext,
  packageData
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    departureDate: '',
    returnDate: '',
    totalGuests: 1,
    specialRequests: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleDateChange = (departureDate: string, returnDate: string) => {
    setFormData(prev => ({
      ...prev,
      departureDate,
      returnDate
    }));
  };

  const handleGuestsChange = (totalGuests: number) => {
    setFormData(prev => ({
      ...prev,
      totalGuests
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    if (!formData.departureDate) {
      newErrors.departureDate = 'Tanggal keberangkatan wajib diisi';
    }

    if (!formData.returnDate) {
      newErrors.returnDate = 'Tanggal kembali wajib diisi';
    }

    if (formData.totalGuests < 1) {
      newErrors.totalGuests = 'Minimal 1 tamu' as any;
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Kontak darurat wajib diisi';
    }

    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Nomor telepon darurat wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Pass form data to next step
      onNext(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <User className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Formulir Pemesanan</h2>
              </div>
              <p className="text-gray-700 text-lg">
                {packageData?.title}
              </p>
              <p className="text-gray-500 text-sm">
                📍 {packageData?.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl p-6 border border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-600" />
                Informasi Pribadi
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="contoh@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Travel Information */}
            <div className="bg-white rounded-xl p-6 border border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-gray-600" />
                Informasi Perjalanan
              </h3>
              
              {/* Modern Date Picker */}
              <div className="mb-6">
                <DatePicker
                  departureDate={formData.departureDate}
                  returnDate={formData.returnDate}
                  onDepartureChange={(date) => handleDateChange(date, formData.returnDate)}
                  onReturnChange={(date) => handleDateChange(formData.departureDate, date)}
                />
                {errors.departureDate && (
                  <p className="text-red-500 text-sm mt-2">{errors.departureDate}</p>
                )}
                {errors.returnDate && (
                  <p className="text-red-500 text-sm mt-2">{errors.returnDate}</p>
                )}
              </div>

              {/* Modern Guest Selector */}
              <div>
                <GuestSelector
                  totalGuests={formData.totalGuests}
                  onGuestsChange={handleGuestsChange}
                  minGuests={1}
                  maxGuests={20}
                />
                {errors.totalGuests && (
                  <p className="text-red-500 text-sm mt-2">{errors.totalGuests}</p>
                )}
              </div>
            </div>


            {/* Emergency Contact */}
            <div className="bg-white rounded-xl p-6 border border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-gray-600" />
                Kontak Darurat
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Kontak Darurat *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nama kontak darurat"
                    />
                  </div>
                  {errors.emergencyContact && (
                    <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon Darurat *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                  {errors.emergencyPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-xl p-6 border border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                Permintaan Khusus
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Masukkan permintaan khusus, alergi makanan, atau informasi penting lainnya..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="px-8 py-3 border border-red-300 text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Memproses...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Lanjut ke Pembayaran
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingFormModal;
