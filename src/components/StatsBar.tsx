'use client';

import { Spot } from '@/lib/types';

interface StatsBarProps {
  spots: Spot[];
}

export default function StatsBar({ spots }: StatsBarProps) {
  const available = spots.filter(s => s.status === 'available').length;
  const total = spots.length;

  return (
    <div className="bg-white px-4 py-1.5 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs text-gray-400">
          {available} of {total} available
        </p>
      </div>
    </div>
  );
}
