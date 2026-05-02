'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        return;
      }
      const { data } = await supabase.auth.signInAnonymously();
      if (data.user) setUserId(data.user.id);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { userId };
}
