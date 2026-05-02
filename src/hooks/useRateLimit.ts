'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { RATE_LIMIT_SECONDS } from '@/lib/constants';

export function useRateLimit() {
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});

  const checkAndSetCooldown = useCallback(async (spotId: string, userId: string): Promise<{ allowed: boolean; secondsLeft: number }> => {
    const local = cooldowns[spotId];
    if (local && local > Date.now()) {
      return { allowed: false, secondsLeft: Math.ceil((local - Date.now()) / 1000) };
    }

    const since = new Date(Date.now() - RATE_LIMIT_SECONDS * 1000).toISOString();
    const { data } = await supabase
      .from('status_log')
      .select('created_at')
      .eq('spot_id', spotId)
      .eq('user_id', userId)
      .gte('created_at', since)
      .limit(1);

    if (data && data.length > 0) {
      const lastUpdate = new Date(data[0].created_at).getTime();
      const expiresAt = lastUpdate + RATE_LIMIT_SECONDS * 1000;
      setCooldowns(prev => ({ ...prev, [spotId]: expiresAt }));
      return { allowed: false, secondsLeft: Math.ceil((expiresAt - Date.now()) / 1000) };
    }

    const expiresAt = Date.now() + RATE_LIMIT_SECONDS * 1000;
    setCooldowns(prev => ({ ...prev, [spotId]: expiresAt }));
    return { allowed: true, secondsLeft: 0 };
  }, [cooldowns]);

  const getCooldownSeconds = useCallback((spotId: string): number => {
    const exp = cooldowns[spotId];
    if (!exp || exp <= Date.now()) return 0;
    return Math.ceil((exp - Date.now()) / 1000);
  }, [cooldowns]);

  return { checkAndSetCooldown, getCooldownSeconds };
}
