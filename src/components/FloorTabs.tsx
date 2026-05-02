'use client';

import { FLOORS } from '@/lib/constants';

interface FloorTabsProps {
  activeFloor: string;
  onChange: (floorId: string) => void;
  availableCounts: Record<string, number>;
  totalCounts: Record<string, number>;
}

export default function FloorTabs({ activeFloor, onChange, availableCounts, totalCounts }: FloorTabsProps) {
  return (
    <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {FLOORS.map(floor => {
            const isActive = activeFloor === floor.id;
            return (
              <button
                key={floor.id}
                onClick={() => onChange(floor.id)}
                className={`relative px-4 py-3 text-sm transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-400 hover:text-gray-600 font-normal'
                }`}
              >
                {isActive ? (
                  <span>
                    {floor.name}
                    <span className="ml-1.5 text-gray-400 font-normal">
                      · {availableCounts[floor.id] ?? 0} of {totalCounts[floor.id] ?? 0}
                    </span>
                  </span>
                ) : floor.name}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
