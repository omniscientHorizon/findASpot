'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Spot, SpotStatus } from '@/lib/types';
import { STALE_THRESHOLD_MINUTES } from '@/lib/constants';

function resolveStatus(spot: Spot): SpotStatus {
  const updatedAt = new Date(spot.updated_at).getTime();
  const staleMs = STALE_THRESHOLD_MINUTES * 60 * 1000;
  if (Date.now() - updatedAt > staleMs) return 'unknown';
  return spot.status;
}

export function useSpots(floorId: string) {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSpots = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('spots')
      .select('*')
      .eq('floor_id', floorId);
    if (data) setSpots(data as Spot[]);
    setLoading(false);
  }, [floorId]);

  useEffect(() => {
    setSpots([]); // clear immediately so header count resets on floor switch
    fetchSpots();

    const channel = supabase
      .channel(`spots-${floorId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'spots',
        filter: `floor_id=eq.${floorId}`,
      }, (payload) => {
        setSpots(prev =>
          prev.map(s => s.id === payload.new.id ? { ...s, ...(payload.new as Spot) } : s)
        );
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [floorId, fetchSpots]);

  const spotsWithStatus = spots.map(s => ({ ...s, status: resolveStatus(s) }));

  return { spots: spotsWithStatus, loading, refetch: fetchSpots };
}

export async function updateSpotStatus(
  spotId: string,
  newStatus: SpotStatus,
  userId: string
): Promise<{ error: string | null }> {
  const { error: updateError } = await supabase
    .from('spots')
    .update({ status: newStatus, updated_at: new Date().toISOString(), updated_by: userId })
    .eq('id', spotId);

  if (updateError) return { error: updateError.message };

  const { error: logError } = await supabase
    .from('status_log')
    .insert({ spot_id: spotId, user_id: userId, new_status: newStatus });

  if (logError) return { error: logError.message };

  return { error: null };
}
