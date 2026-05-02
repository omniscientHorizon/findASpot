'use client';

import { SpotType } from '@/lib/types';
import InfoTooltip from './InfoTooltip';

const ALL_TYPES: SpotType[] = [
  'carrel', 'carrel_enclosed', 'computer', 'adjustable_computer',
  'group_table', 'large_table', 'couch_table', 'study_room',
];

const GROUPS: { label: string; types: SpotType[] }[] = [
  { label: 'All', types: ALL_TYPES },
  { label: 'Study Desks', types: ['carrel', 'carrel_enclosed'] },
  { label: 'Group Study Tables', types: ['group_table', 'large_table', 'couch_table'] },
  { label: 'Computers', types: ['computer', 'adjustable_computer'] },
  { label: 'Study Rooms', types: ['study_room'] },
];

interface FilterBarProps {
  activeTypes: Set<SpotType>;
  onSetTypes: (types: Set<SpotType>) => void;
}

export default function FilterBar({ activeTypes, onSetTypes }: FilterBarProps) {
  const activeGroup = GROUPS.find(g =>
    g.types.every(t => activeTypes.has(t)) &&
    (g.label === 'All' ? true : ALL_TYPES.filter(t => !g.types.includes(t)).every(t => !activeTypes.has(t)))
  );

  const handleGroup = (group: typeof GROUPS[0]) => {
    if (group.label === 'All') {
      onSetTypes(new Set(ALL_TYPES));
    } else {
      onSetTypes(new Set(group.types));
    }
  };

  return (
    <div className="bg-white border-b border-gray-100 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center gap-0 overflow-x-auto scrollbar-hide">
        {GROUPS.map((group, i) => {
          const isActive = activeGroup?.label === group.label;
          return (
            <span key={group.label} className="flex items-center flex-shrink-0">
              <button
                onClick={() => handleGroup(group)}
                className={`text-sm px-1 py-0.5 transition-colors ${
                  isActive
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-400 hover:text-gray-600 font-normal'
                }`}
              >
                <span className="flex items-center gap-0.5">
                  {group.label}
                  {group.label === 'Study Desks' && <InfoTooltip text="A compact private desk built for solo studying." />}
                </span>
              </button>
              {i < GROUPS.length - 1 && (
                <span className="text-gray-200 mx-2 select-none">·</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
