'use client';

import React from 'react';

interface GuestsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  guests: number;
  setGuests: (v: number) => void;
  className?: string;
}

const GuestsPopover: React.FC<GuestsPopoverProps> = ({ isOpen, onClose, guests, setGuests, className }) => {
  if (!isOpen) return null;
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl shadow-xl p-4 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-900">Tamu</div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGuests(Math.max(1, guests - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
          >-</button>
          <div className="w-6 text-center font-semibold">{guests}</div>
          <button
            onClick={() => setGuests(guests + 1)}
            className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
          >+</button>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => { setGuests(2); onClose(); }}
          className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50"
        >Reset</button>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
        >Selesai</button>
      </div>
    </div>
  );
};

export default GuestsPopover;


