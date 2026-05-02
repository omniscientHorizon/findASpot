'use client';

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Spot, SpotType } from '@/lib/types';
import { FLOORS, TYPE_LABELS, STALE_THRESHOLD_MINUTES } from '@/lib/constants';
import InfoTooltip from './InfoTooltip';

interface FindSpotProps {
  onSelect: (spot: Spot) => void;
  onClose: () => void;
}

const TYPE_GROUPS: { label: string; types: SpotType[] }[] = [
  { label: 'Study Desks',        types: ['carrel', 'carrel_enclosed'] },
  { label: 'Group Study Tables', types: ['group_table', 'large_table', 'couch_table'] },
  { label: 'Computers',          types: ['computer', 'adjustable_computer'] },
  { label: 'Rooms',              types: ['study_room'] },
];

const STATUS_DOT: Record<string, string> = {
  available: '#22c55e',
  occupied:  '#ef4444',
  partial:   '#f59e0b',
  unknown:   '#d1d5db',
};

const CARREL_TYPES = new Set<SpotType>(['carrel', 'carrel_enclosed']);
const CARREL_TOOLTIP = 'A compact private desk built for solo studying.';

function relativeTime(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

function resolveStatus(spot: Spot): Spot {
  const staleMs = STALE_THRESHOLD_MINUTES * 60 * 1000;
  if (Date.now() - new Date(spot.updated_at).getTime() > staleMs) {
    return { ...spot, status: 'unknown' };
  }
  return spot;
}

export default function FindSpot({ onSelect, onClose }: FindSpotProps) {
  const [allSpots, setAllSpots]           = useState<Spot[]>([]);
  const [loading, setLoading]             = useState(true);
  const [activeGroup, setActiveGroup]     = useState<string | null>(null);
  const [activeFloor, setActiveFloor]     = useState<string | null>(null);
  const [availableOnly, setAvailableOnly] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('spots').select('*');
      if (data) setAllSpots((data as Spot[]).map(resolveStatus));
      setLoading(false);
    };
    fetch();
  }, []);

  const results = useMemo(() => {
    return allSpots.filter(s => {
      if (availableOnly && s.status !== 'available') return false;
      if (activeFloor && s.floor_id !== activeFloor) return false;
      if (activeGroup) {
        const group = TYPE_GROUPS.find(g => g.label === activeGroup);
        if (group && !group.types.includes(s.type)) return false;
      }
      return true;
    });
  }, [allSpots, activeGroup, activeFloor, availableOnly]);

  const byFloor = useMemo(() => {
    const map = new Map<string, Spot[]>();
    for (const floor of FLOORS) map.set(floor.id, []);
    for (const spot of results) {
      map.get(spot.floor_id)?.push(spot);
    }
    return map;
  }, [results]);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[420px] md:rounded-2xl animate-slide-up"
        style={{ maxHeight: '80dvh', display: 'flex', flexDirection: 'column', boxShadow: '0 -4px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)' }}
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden flex-shrink-0">
          <span className="w-8 h-1 rounded-full bg-gray-200 block" />
        </div>

        {/* header */}
        <div className="flex items-center justify-between px-4 pt-2 pb-3 flex-shrink-0">
          <h2 className="text-base font-semibold text-gray-900">Find a Spot</h2>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 text-xl leading-none">×</button>
        </div>

        {/* filters */}
        <div className="px-4 pb-3 flex-shrink-0 border-b border-gray-100">
          {/* floor chips */}
          <div className="flex gap-1.5 flex-wrap mb-2">
            <button
              onClick={() => setActiveFloor(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFloor === null ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >All floors</button>
            {FLOORS.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFloor(activeFloor === f.id ? null : f.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFloor === f.id ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >{f.name}</button>
            ))}
          </div>

          {/* type chips */}
          <div className="flex gap-1.5 flex-wrap mb-2">
            <button
              onClick={() => setActiveGroup(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeGroup === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >Any type</button>
            {TYPE_GROUPS.map(g => (
              <button
                key={g.label}
                onClick={() => setActiveGroup(activeGroup === g.label ? null : g.label)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeGroup === g.label ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >{g.label}</button>
            ))}
          </div>

          {/* available-only toggle */}
          <button
            onClick={() => setAvailableOnly(v => !v)}
            className="flex items-center gap-2 text-xs text-gray-500"
          >
            <span className={`w-8 h-4 rounded-full transition-colors flex items-center px-0.5 ${availableOnly ? 'bg-green-500' : 'bg-gray-200'}`}>
              <span className={`w-3 h-3 rounded-full bg-white shadow transition-transform ${availableOnly ? 'translate-x-4' : 'translate-x-0'}`} />
            </span>
            Available spots only
          </button>
        </div>

        {/* results */}
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
            </div>
          ) : results.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">No spots found</p>
          ) : activeFloor ? (
            results.map(spot => <SpotRow key={spot.id} spot={spot} onSelect={onSelect} />)
          ) : (
            FLOORS.map(floor => {
              const floorSpots = byFloor.get(floor.id) ?? [];
              if (floorSpots.length === 0) return null;
              return (
                <div key={floor.id}>
                  <p className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wide bg-gray-50">{floor.name}</p>
                  {floorSpots.map(spot => <SpotRow key={spot.id} spot={spot} onSelect={onSelect} />)}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

function SpotRow({ spot, onSelect }: { spot: Spot; onSelect: (s: Spot) => void }) {
  const isCarrel = CARREL_TYPES.has(spot.type);
  return (
    <button
      onClick={() => onSelect(spot)}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-50 transition-colors"
    >
      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: STATUS_DOT[spot.status] ?? STATUS_DOT.unknown }} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 leading-snug">{spot.name}</p>
        <p className="text-xs text-gray-400 flex items-center">
          {TYPE_LABELS[spot.type]}
          {isCarrel && <InfoTooltip text={CARREL_TOOLTIP} />}
          <span className="mx-1">·</span>
          {spot.capacity === 1 ? '1 seat' : `${spot.capacity} seats`}
        </p>
      </div>
      <span className="text-xs text-gray-400 flex-shrink-0">{relativeTime(spot.updated_at)}</span>
    </button>
  );
}
