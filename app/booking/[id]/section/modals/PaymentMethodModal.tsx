'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, CreditCard, Smartphone, Building2, Shield, Check, QrCode } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'credit_card' | 'bank_transfer' | 'ewallet' | 'virtual_account' | 'qris';
  icon: React.ReactNode;
  description: string;
  processingFee: number;
  isAvailable: boolean;
}

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: PaymentMethod) => void;
  bookingData: {
    packageTitle: string;
    totalPrice: string;
    guests: number;
    duration: string;
  };
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  bookingData
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [selectedCardBrand, setSelectedCardBrand] = useState<string>('');
  const [selectedEwallet, setSelectedEwallet] = useState<string>('');
  const [selectedVABank, setSelectedVABank] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit_card',
      name: 'Kartu Kredit/Debit',
      type: 'credit_card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Visa, Mastercard, JCB',
      processingFee: 0,
      isAvailable: true
    },
    {
      id: 'bank_transfer',
      name: 'Transfer Bank',
      type: 'bank_transfer',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Pilih bank untuk transfer',
      processingFee: 0,
      isAvailable: true
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      type: 'ewallet',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'GoPay, OVO, DANA, LinkAja',
      processingFee: 2500,
      isAvailable: true
    },
    {
      id: 'virtual_account',
      name: 'Virtual Account',
      type: 'virtual_account',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Pembayaran melalui ATM/Internet Banking',
      processingFee: 0,
      isAvailable: true
    }
    ,
    {
      id: 'qris',
      name: 'QRIS',
      type: 'qris',
      icon: <QrCode className="w-6 h-6" />,
      description: 'Scan QR semua e-wallet & mobile banking',
      processingFee: 0,
      isAvailable: true
    }
  ];

  const bankOptions = [
    { id: 'bca', name: 'Bank BCA', code: 'BCA' },
    { id: 'mandiri', name: 'Bank Mandiri', code: 'MANDIRI' },
    { id: 'bri', name: 'Bank BRI', code: 'BRI' },
    { id: 'bni', name: 'Bank BNI', code: 'BNI' }
  ];

  const cardBrands = [
    { id: 'visa', name: 'VISA' },
    { id: 'mastercard', name: 'Mastercard' }
  ];

  const ewalletOptions = [
    { id: 'gopay', name: 'GoPay' },
    { id: 'ovo', name: 'OVO' },
    { id: 'dana', name: 'DANA' },
    { id: 'linkaja', name: 'LinkAja' }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    if (methodId !== 'bank_transfer') {
      setSelectedBank('');
    }
    if (methodId !== 'credit_card') {
      setSelectedCardBrand('');
    }
    if (methodId !== 'ewallet') {
      setSelectedEwallet('');
    }
    if (methodId !== 'virtual_account') {
      setSelectedVABank('');
    }
  };

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };

  const handleConfirm = async () => {
    if (!selectedMethod) return;
    if (selectedMethod === 'bank_transfer' && !selectedBank) return;

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const method = paymentMethods.find(m => m.id === selectedMethod);
      if (method) {
        let paymentData: any = { ...method };
        if (selectedMethod === 'bank_transfer') {
          paymentData.selectedBank = bankOptions.find(b => b.id === selectedBank);
        } else if (selectedMethod === 'credit_card') {
          paymentData.selectedCardBrand = cardBrands.find(c => c.id === selectedCardBrand);
        } else if (selectedMethod === 'ewallet') {
          paymentData.selectedEwallet = ewalletOptions.find(w => w.id === selectedEwallet);
        } else if (selectedMethod === 'virtual_account') {
          paymentData.selectedVABank = bankOptions.find(b => b.id === selectedVABank);
        }
        onConfirm(paymentData);
      }
    } catch (error) {
      
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);
  const totalFee = selectedPaymentMethod?.processingFee || 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Pilih Metode Pembayaran</h2>
              <p className="text-gray-700">
                Selesaikan pembayaran untuk melanjutkan pemesanan
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pemesanan</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Paket Wisata</span>
                <span className="font-medium">{bookingData.packageTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Durasi</span>
                <span className="font-medium">{bookingData.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah Tamu</span>
                <span className="font-medium">{bookingData.guests} orang</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600">Total Harga</span>
                <span className="font-bold text-lg">{bookingData.totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metode Pembayaran</h3>
            
            {paymentMethods.map((method) => (
              <div key={method.id} className="border-2 rounded-xl">
                <div
                  onClick={() => method.isAvailable && handleMethodSelect(method.id)}
                  className={`p-4 cursor-pointer transition-all rounded-xl ${
                    selectedMethod === method.id
                      ? 'border-gray-500 bg-gray-100'
                      : method.isAvailable
                      ? 'hover:bg-gray-50'
                      : 'bg-gray-50 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        selectedMethod === method.id
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                        {method.processingFee > 0 && (
                          <p className="text-xs text-gray-500">
                            Biaya admin: Rp {method.processingFee.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {selectedMethod === method.id ? (
                        <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedMethod === method.id && (
                  <div className="px-4 pb-4">
                    {/* CREDIT CARD OPTIONS */}
                    {method.id === 'credit_card' && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">Pilih Brand Kartu</h5>
                        <div className="grid grid-cols-2 gap-3">
                          {cardBrands.map((brand) => (
                            <button
                              key={brand.id}
                              onClick={() => setSelectedCardBrand(brand.id)}
                              className={`p-3 border-2 rounded-xl text-left transition-all ${
                                selectedCardBrand === brand.id ? 'border-gray-500 bg-gray-100' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {/* Logos for Visa/Mastercard; JCB fallback to initials */}
                                {brand.id === 'visa' && (
                                  <div className="w-8 h-6 relative">
                                    <Image src="/payment/Visa.png" alt="VISA" fill className="object-contain" />
                                  </div>
                                )}
                                {brand.id === 'mastercard' && (
                                  <div className="w-8 h-6 relative">
                                    <Image src="/payment/MasterCard.png" alt="Mastercard" fill className="object-contain" />
                                  </div>
                                )}
                                <div className="font-medium text-gray-900">{brand.name}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* BANK TRANSFER OPTIONS */}
                    {method.id === 'bank_transfer' && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">Pilih Bank</h5>
                        <div className="grid grid-cols-2 gap-3">
                          {bankOptions.map((bank) => (
                            <button
                              key={bank.id}
                              onClick={() => setSelectedBank(bank.id)}
                              className={`p-3 border-2 rounded-xl text-left transition-all ${
                                selectedBank === bank.id ? 'border-gray-500 bg-gray-100' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {/* Bank logos */}
                                  {(bank.id === 'bca' || bank.id === 'mandiri' || bank.id === 'bri' || bank.id === 'bni') && (
                                    <div className="w-8 h-6 relative">
                                      <Image src={`/payment/${bank.id}.png`} alt={bank.name} fill className="object-contain" />
                                    </div>
                                  )}
                                  <div>
                                    <div className="font-medium text-gray-900">{bank.name}</div>
                                    <div className="text-xs text-gray-600">{bank.code}</div>
                                  </div>
                                </div>
                                {selectedBank === bank.id && (
                                  <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* EWALLET OPTIONS */}
                    {method.id === 'ewallet' && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">Pilih E-Wallet</h5>
                        <div className="grid grid-cols-2 gap-3">
                          {ewalletOptions.map((wallet) => (
                            <button
                              key={wallet.id}
                              onClick={() => setSelectedEwallet(wallet.id)}
                              className={`p-3 border-2 rounded-xl text-left transition-all ${
                                selectedEwallet === wallet.id ? 'border-gray-500 bg-gray-100' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {/* Ewallet logos */}
                                {(wallet.id === 'gopay' || wallet.id === 'ovo' || wallet.id === 'dana' || wallet.id === 'linkaja') && (
                                  <div className="w-8 h-6 relative">
                                    <Image src={`/payment/${wallet.id}.png`} alt={wallet.name} fill className="object-contain" />
                                  </div>
                                )}
                                <div className="font-medium text-gray-900">{wallet.name}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* VIRTUAL ACCOUNT OPTIONS */}
                    {method.id === 'virtual_account' && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">Pilih Bank VA</h5>
                        <div className="grid grid-cols-2 gap-3">
                          {bankOptions.map((bank) => (
                            <button
                              key={bank.id}
                              onClick={() => setSelectedVABank(bank.id)}
                              className={`p-3 border-2 rounded-xl text-left transition-all ${
                                selectedVABank === bank.id ? 'border-gray-500 bg-gray-100' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {/* Bank logos */}
                                  {(bank.id === 'bca' || bank.id === 'mandiri' || bank.id === 'bri' || bank.id === 'bni') && (
                                    <div className="w-8 h-6 relative">
                                      <Image src={`/payment/${bank.id}.png`} alt={bank.name} fill className="object-contain" />
                                    </div>
                                  )}
                                  <div>
                                    <div className="font-medium text-gray-900">{bank.name}</div>
                                    <div className="text-xs text-gray-600">{bank.code}</div>
                                  </div>
                                </div>
                                {selectedVABank === bank.id && (
                                  <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* QRIS INFO */}
                    {method.id === 'qris' && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">QRIS</h5>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                            <div className="w-12 h-12 relative">
                              <Image src="/payment/qris.png" alt="QRIS" fill className="object-contain" />
                            </div>
                          </div>
                          <div className="text-sm text-gray-700">
                            Scan QR melalui aplikasi e-wallet atau mobile banking yang mendukung QRIS.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bank Selection block removed; moved inside each card accordion */}

          {/* Security Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Pembayaran Aman</h4>
                <p className="text-sm text-gray-700">
                  Semua transaksi dilindungi dengan enkripsi SSL 256-bit. 
                  Informasi kartu Anda tidak akan disimpan di server kami.
                </p>
              </div>
            </div>
          </div>

          {/* Total Payment */}
          {selectedPaymentMethod && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-800">Total Pembayaran</p>
                  <p className="text-xs text-gray-600">
                    {selectedPaymentMethod.processingFee > 0 
                      ? `Harga + Biaya Admin (Rp ${selectedPaymentMethod.processingFee.toLocaleString()})`
                      : 'Tidak ada biaya tambahan'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {totalFee > 0 
                      ? `Rp ${(parseInt(bookingData.totalPrice.replace(/[^\d]/g, '')) + totalFee).toLocaleString()}`
                      : bookingData.totalPrice
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Kembali
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleConfirm}
              disabled={!selectedMethod || isProcessing ||
                (selectedMethod === 'bank_transfer' && !selectedBank) ||
                (selectedMethod === 'credit_card' && !selectedCardBrand) ||
                (selectedMethod === 'ewallet' && !selectedEwallet) ||
                (selectedMethod === 'virtual_account' && !selectedVABank)
              }
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Memproses...
                </div>
              ) : (
                'Konfirmasi Pembayaran'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
