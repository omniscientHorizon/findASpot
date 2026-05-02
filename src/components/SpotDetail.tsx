'use client';

import { useEffect, useState, useCallback } from 'react';
import { Spot, SpotStatus } from '@/lib/types';
import { TYPE_LABELS, TYPE_FEATURES } from '@/lib/constants';
import InfoTooltip from './InfoTooltip';
import { updateSpotStatus } from '@/hooks/useSpots';
import { useRateLimit } from '@/hooks/useRateLimit';

interface SpotDetailProps {
  spot: Spot | null;
  userId: string | null;
  onClose: () => void;
  onUpdated: () => void;
}

function freshnessInfo(iso: string): { label: string; color: string; dotColor: string } {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 5)  return { label: mins === 0 ? 'just now' : `${mins}m ago`, color: '#15803d', dotColor: '#22c55e' };
  if (mins < 20) return { label: `${mins}m ago`, color: '#a16207', dotColor: '#eab308' };
  if (mins < 50) return { label: `${mins}m ago`, color: '#c2410c', dotColor: '#f97316' };
  return { label: `${mins}m ago`, color: '#6b7280', dotColor: '#d1d5db' };
}

const STATUS_LABEL: Record<string, string> = {
  available: 'Available',
  occupied: 'Occupied',
  partial: 'Partially full',
  unknown: 'No recent report',
};

const STATUS_DOT: Record<string, string> = {
  available: '#22c55e',
  occupied:  '#ef4444',
  partial:   '#f59e0b',
  unknown:   '#d1d5db',
};

type ReportIntent = 'free' | 'here' | 'taken';

export default function SpotDetail({ spot, userId, onClose, onUpdated }: SpotDetailProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { checkAndSetCooldown, getCooldownSeconds } = useRateLimit();

  useEffect(() => {
    if (!spot) return;
    const s = getCooldownSeconds(spot.id);
    setCooldown(s);
    if (s <= 0) return;
    const iv = setInterval(() => {
      const left = getCooldownSeconds(spot.id);
      setCooldown(left);
      if (left <= 0) clearInterval(iv);
    }, 1000);
    return () => clearInterval(iv);
  }, [spot, getCooldownSeconds]);

  const handleReport = useCallback(async (intent: ReportIntent) => {
    if (!spot || !userId) return;
    const status: SpotStatus = intent === 'free' ? 'available' : 'occupied';
    setUpdating(true);
    const { allowed, secondsLeft } = await checkAndSetCooldown(spot.id, userId);
    if (!allowed) {
      setCooldown(secondsLeft);
      setToast(`Wait ${secondsLeft}s before updating again.`);
      setUpdating(false);
      setTimeout(() => setToast(null), 3000);
      return;
    }
    const { error } = await updateSpotStatus(spot.id, status, userId);
    setUpdating(false);
    if (error) {
      setToast('Update failed. Try again.');
    } else {
      const msg = intent === 'free' ? 'Marked as free — thanks!' : intent === 'here' ? 'Enjoy your spot!' : 'Marked as taken — thanks!';
      setToast(msg);
      onUpdated();
    }
    setTimeout(() => setToast(null), 2500);
  }, [spot, userId, checkAndSetCooldown, onUpdated]);

  if (!spot) return null;

  const features = TYPE_FEATURES[spot.type] ?? [];
  const isCarrel = spot.type === 'carrel' || spot.type === 'carrel_enclosed';
  const dotColor = STATUS_DOT[spot.status] ?? STATUS_DOT.unknown;
  const disabled = updating || cooldown > 0;
  const freshness = freshnessInfo(spot.updated_at);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:bottom-auto md:left-auto md:right-6 md:top-24 md:w-72 bg-white rounded-t-2xl md:rounded-2xl animate-slide-up"
        style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)' }}
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <span className="w-8 h-1 rounded-full bg-gray-200 block" />
        </div>

        <div className="px-5 pt-3 pb-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900 leading-snug">{spot.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5 flex items-center">
                {TYPE_LABELS[spot.type]}
                {isCarrel && <InfoTooltip text="A compact private desk built for solo studying." />}
                <span className="mx-1">·</span>
                {spot.capacity === 1 ? '1 seat' : `${spot.capacity} seats`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 text-xl leading-none mt-0.5 flex-shrink-0"
            >×</button>
          </div>

          {features.length > 0 && (
            <p className="text-xs text-gray-400 mb-3">{features.join(' · ')}</p>
          )}

          {/* Status + freshness */}
          <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-xl px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dotColor }} />
              <span className="text-sm text-gray-700">{STATUS_LABEL[spot.status]}</span>
            </div>
            <span
              className="text-xs font-medium flex items-center gap-1"
              style={{ color: freshness.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: freshness.dotColor }} />
              {freshness.label}
            </span>
          </div>

          {/* Intent buttons */}
          <p className="text-xs text-gray-400 mb-2">What did you observe?</p>
          <div className="flex gap-1.5 mb-2">
            <button
              disabled={disabled}
              onClick={() => handleReport('free')}
              className="flex-1 py-2.5 rounded-xl text-xs font-medium border border-green-400 text-green-600 hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              It&apos;s free
            </button>
            <button
              disabled={disabled}
              onClick={() => handleReport('here')}
              className="flex-1 py-2.5 rounded-xl text-xs font-medium border border-blue-400 text-blue-600 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              I&apos;m here
            </button>
            <button
              disabled={disabled}
              onClick={() => handleReport('taken')}
              className="flex-1 py-2.5 rounded-xl text-xs font-medium border border-red-400 text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              It&apos;s taken
            </button>
          </div>

          {cooldown > 0 && (
            <p className="text-xs text-center text-gray-400 mt-1">Wait {cooldown}s to update again</p>
          )}

          {toast && (
            <div className="mt-2 text-xs text-center text-gray-500 bg-gray-50 rounded-lg py-2 px-3">
              {toast}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
