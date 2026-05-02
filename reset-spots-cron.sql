-- ============================================================
-- SpotFinder: auto-reset all spots to available at library open
-- Run this once in the Supabase SQL editor.
-- pg_cron uses UTC. Union College is EDT (UTC-4) in summer,
-- EST (UTC-5) in winter. Times below are for EDT (Apr-Nov).
-- ============================================================

-- 1. Function that resets every spot to available
CREATE OR REPLACE FUNCTION reset_all_spots_to_available()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE spots
  SET
    status     = 'available',
    updated_at = NOW(),
    updated_by = 'system-open'
  WHERE true;
END;
$$;

-- 2. Enable pg_cron extension (if not already on)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 3. Remove any existing schedules (safe to re-run)
SELECT cron.unschedule(jobname)
FROM cron.job
WHERE jobname IN ('spotfinder-open-weekday', 'spotfinder-open-weekend');

-- 4. Mon–Fri: open 8am EDT = 12:00 UTC
SELECT cron.schedule(
  'spotfinder-open-weekday',
  '0 12 * * 1-5',
  'SELECT reset_all_spots_to_available()'
);

-- 5. Sat–Sun: open 10am EDT = 14:00 UTC
SELECT cron.schedule(
  'spotfinder-open-weekend',
  '0 14 * * 0,6',
  'SELECT reset_all_spots_to_available()'
);

-- Verify schedules were created
SELECT jobname, schedule, command FROM cron.job
WHERE jobname LIKE 'spotfinder%';
