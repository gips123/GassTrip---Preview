'use client';

import React from 'react';

interface DateRangePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  checkIn: string;
  checkOut: string;
  setCheckIn: (v: string) => void;
  setCheckOut: (v: string) => void;
  className?: string;
}

function addMonths(date: Date, n: number) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function toISO(d: Date) {
  return d.toISOString().split('T')[0];
}

function getMonthGrid(date: Date) {
  const first = startOfMonth(date);
  const firstWeekday = first.getDay();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(date.getFullYear(), date.getMonth(), d));
  return cells;
}

const DateRangePopover: React.FC<DateRangePopoverProps> = ({
  isOpen,
  onClose,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  className,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const isInRange = (d: Date) => {
    if (!checkIn || !checkOut) return false;
    const x = toISO(d);
    return x > checkIn && x < checkOut;
  };

  const isStart = (d: Date) => checkIn && toISO(d) === checkIn;
  const isEnd = (d: Date) => checkOut && toISO(d) === checkOut;

  const onPickDay = (d: Date) => {
    const day = toISO(d);
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut('');
    } else if (day >= checkIn) {
      setCheckOut(day);
    } else {
      setCheckIn(day);
      setCheckOut('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl shadow-xl p-4 ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setCurrentMonth((m) => addMonths(m, -1))}
          className="px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-200 text-gray-700"
        >Prev</button>
        <div className="text-sm font-semibold text-gray-900">
          {currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          {' • '}
          {addMonths(currentMonth, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
        </div>
        <button
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-200 text-gray-700"
        >Next</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[currentMonth, addMonths(currentMonth, 1)].map((m, idx) => (
          <div key={idx}>
            <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
              {['Min','Sen','Sel','Rab','Kam','Jum','Sab'].map((d) => (
                <div key={d} className="text-center py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {getMonthGrid(m).map((cell, i) => (
                <div key={i} className="aspect-square">
                  {cell ? (
                    <button
                      onClick={() => onPickDay(cell)}
                      className={`w-full h-full rounded-lg text-sm
                        ${isStart(cell) || isEnd(cell) ? 'bg-gray-900 text-white' : isInRange(cell) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-800'}
                      `}
                    >{cell.getDate()}</button>
                  ) : (
                    <div />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-600">
          {checkIn ? `Pergi: ${new Date(checkIn + 'T00:00:00').toLocaleDateString('id-ID')}` : 'Pilih tanggal pergi'}
          {checkOut ? ` • Pulang: ${new Date(checkOut + 'T00:00:00').toLocaleDateString('id-ID')}` : ''}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setCheckIn(''); setCheckOut(''); }}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50"
          >Reset</button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
          >Selesai</button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePopover;


