'use client';

import { Spot } from '@/lib/types';

interface SpotMarkerProps {
  spot: Spot;
  isFiltered: boolean;
  isSelected: boolean;
  onClick: (spot: Spot) => void;
}

const STATUS_COLORS: Record<string, string> = {
  available: '#22c55e',
  occupied: '#ef4444',
  partial:  '#f59e0b',
  unknown:  '#d1d5db',
};

const LARGE_TYPES = new Set(['study_room', 'large_table']);

export default function SpotMarker({ spot, isFiltered, isSelected, onClick }: SpotMarkerProps) {
  const color = STATUS_COLORS[spot.status] ?? STATUS_COLORS.unknown;
  // 5px on mobile, 7px on desktop (md breakpoint = 768px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const base = LARGE_TYPES.has(spot.type) ? (isMobile ? 7 : 10) : (isMobile ? 5 : 7);

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(spot); }}
      className="absolute focus:outline-none"
      style={{
        left: `${spot.x_percent}%`,
        top: `${spot.y_percent}%`,
        transform: 'translate(-50%, -50%)',
        opacity: isFiltered ? 0.1 : 1,
        transition: 'opacity 0.15s',
        zIndex: isSelected ? 20 : 10,
        padding: 4,
      }}
      title={spot.name}
    >
      <span
        className="block rounded-full"
        style={{
          width: isSelected ? base + 4 : base,
          height: isSelected ? base + 4 : base,
          backgroundColor: color,
          outline: isSelected ? `2px solid white` : 'none',
          outlineOffset: 1,
          boxShadow: isSelected ? `0 0 0 3px ${color}` : 'none',
          transition: 'width 0.15s, height 0.15s',
        }}
      />
    </button>
  );
}
