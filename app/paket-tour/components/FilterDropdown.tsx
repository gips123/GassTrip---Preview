'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface FilterDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ isOpen, onToggle, sortBy, setSortBy, className }) => {
  return (
    <div className={`relative ${className || ''}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-label="Filter"
        className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50"
      >
        <Filter className="w-5 h-5 text-gray-600" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-10">
          <div className="text-xs font-semibold text-gray-500 px-2 py-1">Urutkan</div>
          {[
            { id: 'popularity', label: 'Populer' },
            { id: 'price-low', label: 'Harga Terendah' },
            { id: 'price-high', label: 'Harga Tertinggi' },
            { id: 'rating', label: 'Rating Tertinggi' }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => { setSortBy(opt.id); onToggle(); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${sortBy === opt.id ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;


