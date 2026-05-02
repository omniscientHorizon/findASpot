'use client';

import { useRef, useState, useEffect } from 'react';
import { FLOORS } from '@/lib/constants';
import { SpotType } from '@/lib/types';

const TYPE_GROUPS = [
  { label: 'Study Desks',        types: ['carrel', 'carrel_enclosed'] as SpotType[] },
  { label: 'Group Study Tables', types: ['group_table', 'large_table', 'couch_table'] as SpotType[] },
  { label: 'Computers',          types: ['computer', 'adjustable_computer'] as SpotType[] },
  { label: 'Study Rooms',        types: ['study_room'] as SpotType[] },
];

const ALL_TYPES = TYPE_GROUPS.flatMap(g => g.types);

interface FloorTabsProps {
  activeFloor: string;
  onChange: (floorId: string) => void;
  availableCounts: Record<string, number>;
  totalCounts: Record<string, number>;
  activeTypes: Set<SpotType>;
  onSetTypes: (t: Set<SpotType>) => void;
}

export default function FloorTabs({ activeFloor, onChange, availableCounts, totalCounts, activeTypes, onSetTypes }: FloorTabsProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const isGroupActive = (types: SpotType[]) => types.every(t => activeTypes.has(t));
  const allActive = TYPE_GROUPS.every(g => isGroupActive(g.types));

  const toggleGroup = (types: SpotType[], checked: boolean) => {
    const next = new Set(activeTypes);
    types.forEach(t => checked ? next.add(t) : next.delete(t));
    onSetTypes(next);
  };

  const toggleAll = () => {
    onSetTypes(allActive ? new Set() : new Set(ALL_TYPES));
  };

  const inactiveCount = TYPE_GROUPS.filter(g => !isGroupActive(g.types)).length;

  return (
    <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-stretch">

        {/* Floor tabs — scrollable */}
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max px-4">
            {FLOORS.map(floor => {
              const isActive = activeFloor === floor.id;
              return (
                <button
                  key={floor.id}
                  onClick={() => onChange(floor.id)}
                  className={`relative px-4 py-3 text-sm transition-colors whitespace-nowrap ${
                    isActive ? 'text-gray-900 font-medium' : 'text-gray-400 hover:text-gray-600 font-normal'
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
                  {isActive && <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter button */}
        <div className="flex-shrink-0 flex items-center px-3 border-l border-gray-100 relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(v => !v)}
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
              inactiveCount > 0 ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 6h18M7 12h10M11 18h2"/>
            </svg>
            Filter
            {inactiveCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-semibold">
                {inactiveCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-52 z-50">
              {/* All toggle */}
              <label className="flex items-center gap-2.5 px-4 py-2 cursor-pointer hover:bg-gray-50 select-none">
                <input
                  type="checkbox"
                  checked={allActive}
                  onChange={toggleAll}
                  className="w-3.5 h-3.5 accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">All types</span>
              </label>
              <div className="h-px bg-gray-100 mx-4 my-1" />
              {TYPE_GROUPS.map(g => (
                <label key={g.label} className="flex items-center gap-2.5 px-4 py-2 cursor-pointer hover:bg-gray-50 select-none">
                  <input
                    type="checkbox"
                    checked={isGroupActive(g.types)}
                    onChange={e => toggleGroup(g.types, e.target.checked)}
                    className="w-3.5 h-3.5 accent-blue-600"
                  />
                  <span className="text-sm text-gray-600">{g.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
