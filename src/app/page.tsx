'use client';

import { useState, useCallback, useEffect } from 'react';
import { Spot, SpotType } from '@/lib/types';
import { useSpots } from '@/hooks/useSpots';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { STALE_THRESHOLD_MINUTES } from '@/lib/constants';
import Header from '@/components/Header';
import FloorTabs from '@/components/FloorTabs';
import FilterBar from '@/components/FilterBar';
import FloorPlan from '@/components/FloorPlan';
import SpotDetail from '@/components/SpotDetail';
import StatsBar from '@/components/StatsBar';
import FindSpot from '@/components/FindSpot';

const ALL_TYPES: SpotType[] = [
  'carrel', 'carrel_enclosed', 'computer', 'adjustable_computer',
  'group_table', 'large_table', 'couch_table', 'study_room',
];

const FLOOR_TOTALS: Record<string, number> = {
  basement: 64, first: 55, second: 77, third: 10,
};

export default function Home() {
  const [activeFloor, setActiveFloor]   = useState('first');
  const [activeTypes, setActiveTypes]   = useState<Set<SpotType>>(new Set(ALL_TYPES));
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [focusSpot, setFocusSpot]       = useState<Spot | null>(null);
  const [findOpen, setFindOpen]         = useState(false);

  const { spots, loading, refetch } = useSpots(activeFloor);
  const { userId } = useAuth();

  const [libraryAvailable, setLibraryAvailable] = useState(0);

  useEffect(() => {
    const staleMs = STALE_THRESHOLD_MINUTES * 60 * 1000;
    const fetchAll = async () => {
      const { data } = await supabase.from('spots').select('status,updated_at');
      if (data) {
        const now = Date.now();
        setLibraryAvailable(data.filter(s =>
          s.status === 'available' && (now - new Date(s.updated_at).getTime()) <= staleMs
        ).length);
      }
    };
    fetchAll();
    const ch = supabase.channel('library-available-count')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'spots' }, fetchAll)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const handleFloorChange = useCallback((floorId: string) => {
    setActiveFloor(floorId);
    setSelectedSpot(null);
    setFocusSpot(null);
  }, []);

  const handleFindSelect = useCallback((spot: Spot) => {
    setFindOpen(false);
    setActiveFloor(spot.floor_id);
    setSelectedSpot(spot);
    setFocusSpot(spot);
  }, []);

  const available = spots.filter(s => s.status === 'available').length;

  return (
    <div className="flex flex-col bg-[#fafafa] overflow-hidden" style={{ height: '100dvh' }}>

      <Header
        totalAvailable={libraryAvailable}
        totalSpots={FLOOR_TOTALS[activeFloor]}
        onFindClick={() => setFindOpen(true)}
      />
      <div className="h-14 flex-shrink-0" />

      <div className="flex-shrink-0">
        <FloorTabs
          activeFloor={activeFloor}
          onChange={handleFloorChange}
          availableCounts={{ [activeFloor]: available }}
          totalCounts={{ [activeFloor]: FLOOR_TOTALS[activeFloor] }}
        />
        <FilterBar activeTypes={activeTypes} onSetTypes={setActiveTypes} />
        <StatsBar spots={spots} />
      </div>

      <main className="flex-1 min-h-0">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
          </div>
        ) : (
          <FloorPlan
            floorId={activeFloor}
            spots={spots}
            activeTypes={activeTypes}
            selectedSpot={selectedSpot}
            onSpotClick={setSelectedSpot}
            focusSpot={focusSpot}
          />
        )}
      </main>

      {selectedSpot && (
        <SpotDetail
          spot={selectedSpot}
          userId={userId}
          onClose={() => setSelectedSpot(null)}
          onUpdated={() => { refetch(); setSelectedSpot(null); }}
        />
      )}

      {findOpen && (
        <FindSpot
          onSelect={handleFindSelect}
          onClose={() => setFindOpen(false)}
        />
      )}
    </div>
  );
}
