'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Spot, SpotType } from '@/lib/types';
import { FLOOR_IMAGES } from '@/lib/constants';
import SpotMarker from './SpotMarker';

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const IMG_RATIO = 1920 / 1080;

function getImgRect(cw: number, ch: number) {
  if (cw / ch > IMG_RATIO) {
    const h = ch, w = h * IMG_RATIO;
    return { left: (cw - w) / 2, top: 0, width: w, height: h };
  } else {
    const w = cw, h = w / IMG_RATIO;
    return { left: 0, top: (ch - h) / 2, width: w, height: h };
  }
}

interface XForm { scale: number; tx: number; ty: number }

interface FloorPlanProps {
  floorId: string;
  spots: Spot[];
  activeTypes: Set<SpotType>;
  selectedSpot: Spot | null;
  onSpotClick: (spot: Spot) => void;
  focusSpot?: Spot | null;
}

export default function FloorPlan({ floorId, spots, activeTypes, selectedSpot, onSpotClick, focusSpot }: FloorPlanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [xform, setXform] = useState<XForm>({ scale: 1, tx: 0, ty: 0 });
  const xRef = useRef<XForm>({ scale: 1, tx: 0, ty: 0 });
  const [imgRect, setImgRect] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const wasDragging = useRef(false);

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  const applyXform = useCallback((s: number, tx: number, ty: number) => {
    const el = containerRef.current;
    if (!el) return;
    const cw = el.clientWidth, ch = el.clientHeight;
    const ir = getImgRect(cw, ch);
    const maxTx = Math.max(0, (ir.width  * s - cw) / 2);
    const maxTy = Math.max(0, (ir.height * s - ch) / 2);
    const t: XForm = {
      scale: clamp(s, MIN_SCALE, MAX_SCALE),
      tx:    clamp(tx, -maxTx, maxTx),
      ty:    clamp(ty, -maxTy, maxTy),
    };
    xRef.current = t;
    setXform(t);
  }, []);

  const updateImgRect = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setImgRect(getImgRect(el.clientWidth, el.clientHeight));
  }, []);

  useEffect(() => {
    updateImgRect();
    const ro = new ResizeObserver(updateImgRect);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [floorId, fullscreen, updateImgRect]);

  useEffect(() => { applyXform(1, 0, 0); }, [floorId, applyXform]);

  // Re-clamp after fullscreen transition
  useEffect(() => {
    const t = setTimeout(() => {
      const { scale, tx, ty } = xRef.current;
      applyXform(scale, tx, ty);
      updateImgRect();
    }, 50);
    return () => clearTimeout(t);
  }, [fullscreen, applyXform, updateImgRect]);

  // Escape key to exit fullscreen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFullscreen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Pan + zoom to a focused spot
  useEffect(() => {
    if (!focusSpot) return;
    const timer = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const cw = el.clientWidth, ch = el.clientHeight;
      const ir = getImgRect(cw, ch);
      const spotX = ir.left + (focusSpot.x_percent / 100) * ir.width;
      const spotY = ir.top  + (focusSpot.y_percent / 100) * ir.height;
      const s = 3;
      applyXform(s, -(spotX - cw / 2) * s, -(spotY - ch / 2) * s);
    }, 60);
    return () => clearTimeout(timer);
  }, [focusSpot, applyXform]);

  // ── Touch gestures ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    type G =
      | { kind: 'idle' }
      | { kind: 'drag'; sx: number; sy: number; stx: number; sty: number }
      | { kind: 'pinch'; sd: number; ss: number; smx: number; smy: number; stx: number; sty: number };

    let g: G = { kind: 'idle' };

    const dist = (a: Touch, b: Touch) => {
      const dx = a.clientX - b.clientX, dy = a.clientY - b.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };
    const midRel = (a: Touch, b: Touch, rect: DOMRect) => ({
      x: (a.clientX + b.clientX) / 2 - rect.left - rect.width  / 2,
      y: (a.clientY + b.clientY) / 2 - rect.top  - rect.height / 2,
    });

    const onStart = (e: TouchEvent) => {
      const { scale: s, tx, ty } = xRef.current;
      const rect = el.getBoundingClientRect();
      if (e.touches.length >= 2) {
        e.preventDefault();
        const m = midRel(e.touches[0], e.touches[1], rect);
        g = { kind: 'pinch', sd: dist(e.touches[0], e.touches[1]), ss: s, smx: m.x, smy: m.y, stx: tx, sty: ty };
      } else {
        g = { kind: 'drag', sx: e.touches[0].clientX, sy: e.touches[0].clientY, stx: tx, sty: ty };
      }
    };

    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      const { scale: s } = xRef.current;
      if (g.kind === 'pinch' && e.touches.length >= 2) {
        const rect = el.getBoundingClientRect();
        const nd = dist(e.touches[0], e.touches[1]);
        const m  = midRel(e.touches[0], e.touches[1], rect);
        const ns = clamp(g.ss * nd / g.sd, MIN_SCALE, MAX_SCALE);
        const sd = ns / g.ss;
        applyXform(ns, g.smx + (g.stx - g.smx) * sd + (m.x - g.smx),
                       g.smy + (g.sty - g.smy) * sd + (m.y - g.smy));
        wasDragging.current = true;
      } else if (g.kind === 'drag' && e.touches.length === 1) {
        const dx = e.touches[0].clientX - g.sx;
        const dy = e.touches[0].clientY - g.sy;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) wasDragging.current = true;
        applyXform(s, g.stx + dx, g.sty + dy);
      }
    };

    const onEnd = (e: TouchEvent) => {
      if (g.kind === 'pinch' && e.touches.length === 1) {
        const { scale: s, tx, ty } = xRef.current;
        g = { kind: 'drag', sx: e.touches[0].clientX, sy: e.touches[0].clientY, stx: tx, sty: ty };
      } else {
        g = { kind: 'idle' };
      }
    };

    el.addEventListener('touchstart',  onStart, { passive: false });
    el.addEventListener('touchmove',   onMove,  { passive: false });
    el.addEventListener('touchend',    onEnd);
    el.addEventListener('touchcancel', onEnd);
    return () => {
      el.removeEventListener('touchstart',  onStart);
      el.removeEventListener('touchmove',   onMove);
      el.removeEventListener('touchend',    onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  }, [applyXform, fullscreen]);

  // ── Mouse drag ────────────────────────────────────────────────────────────
  const mouse = useRef<{ sx: number; sy: number; stx: number; sty: number } | null>(null);
  const onMouseDown = (e: React.MouseEvent) => {
    mouse.current = { sx: e.clientX, sy: e.clientY, stx: xform.tx, sty: xform.ty };
    wasDragging.current = false;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouse.current) return;
    const dx = e.clientX - mouse.current.sx, dy = e.clientY - mouse.current.sy;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) wasDragging.current = true;
    applyXform(xform.scale, mouse.current.stx + dx, mouse.current.sty + dy);
  };
  const onMouseUp   = () => { mouse.current = null; };

  // Double-tap/click map background to reset zoom
  const lastTap = useRef(0);
  const onContainerClick = useCallback((e: React.MouseEvent) => {
    if (wasDragging.current) { wasDragging.current = false; return; }
    const now = Date.now();
    if (now - lastTap.current < 350) applyXform(1, 0, 0);
    lastTap.current = now;
  }, [applyXform]);

  // ── Spot click ────────────────────────────────────────────────────────────
  const handleSpotClick = useCallback((spot: Spot) => {
    if (wasDragging.current) return;
    onSpotClick(spot);
  }, [onSpotClick]);

  // ── Zoom buttons ──────────────────────────────────────────────────────────
  const zoomIn  = () => applyXform(Math.min(xform.scale * 1.6, MAX_SCALE), xform.tx, xform.ty);
  const zoomOut = () => applyXform(Math.max(xform.scale / 1.6, MIN_SCALE), xform.tx, xform.ty);

  const { scale, tx, ty } = xform;

  return (
    <div
      ref={containerRef}
      className="overflow-hidden bg-[#fafafa]"
      style={{
        // Fullscreen: cover entire viewport above everything
        ...(fullscreen
          ? { position: 'fixed', inset: 0, zIndex: 30 }
          : { width: '100%', height: '100%' }),
        touchAction: 'none',
        cursor: mouse.current ? 'grabbing' : 'grab',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClick={onContainerClick}
    >
      {/* Transformable layer */}
      <div
        style={{
          width: '100%', height: '100%',
          transform: `translate(${tx}px,${ty}px) scale(${scale})`,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FLOOR_IMAGES[floorId]}
          alt="floor plan"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        />
        <div className="absolute" style={{ left: imgRect.left, top: imgRect.top, width: imgRect.width, height: imgRect.height }}>
          {spots.map(spot => (
            <SpotMarker
              key={spot.id}
              spot={spot}
              isFiltered={!activeTypes.has(spot.type)}
              isSelected={selectedSpot?.id === spot.id}
              onClick={handleSpotClick}
            />
          ))}
        </div>
      </div>

      {/* ── Controls overlay (always visible, don't scale with map) ── */}

      {/* Fullscreen toggle — bottom-right */}
      <button
        onClick={(e) => { e.stopPropagation(); setFullscreen(f => !f); }}
        className="absolute bottom-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/90 rounded-lg shadow-sm border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-white transition-colors"
        title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {fullscreen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        )}
      </button>

      {/* Zoom +/- — only in fullscreen, bottom-right above fullscreen button */}
      {fullscreen && (
        <div className="absolute bottom-14 right-3 z-10 flex flex-col gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); zoomIn(); }}
            className="w-8 h-8 flex items-center justify-center bg-white/90 rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-white text-lg font-light transition-colors"
          >
            +
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); zoomOut(); }}
            className="w-8 h-8 flex items-center justify-center bg-white/90 rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-white text-lg font-light transition-colors"
            disabled={scale <= MIN_SCALE}
          >
            −
          </button>
        </div>
      )}

      {/* Double-tap hint when zoomed */}
      {scale > 1.1 && (
        <div className="absolute bottom-3 left-3 text-[10px] text-gray-400 bg-white/70 px-2 py-0.5 rounded-full pointer-events-none z-10">
          double-tap to reset
        </div>
      )}

      {/* Legend — bottom-left when NOT zoomed, otherwise hidden */}
      {scale <= 1.1 && !fullscreen && (
        <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none z-10">
          {([['#22c55e','open'],['#ef4444','taken'],['#d1d5db','unknown']] as const).map(([color, label]) => (
            <span key={label} className="flex items-center gap-1 text-[10px] text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
