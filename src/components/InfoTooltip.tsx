'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function InfoTooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      top: r.bottom + window.scrollY + 6,
      left: r.left + window.scrollX + r.width / 2,
    });
  }, [visible]);

  return (
    <span className="relative inline-flex items-center ml-1" ref={ref}>
      <span
        role="button"
        tabIndex={-1}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onTouchStart={(e) => { e.stopPropagation(); setVisible(v => !v); }}
        className="w-3.5 h-3.5 rounded-full bg-gray-200 text-gray-500 text-[9px] font-bold flex items-center justify-center leading-none hover:bg-gray-300 transition-colors cursor-pointer select-none"
      >i</span>

      {visible && typeof document !== 'undefined' && createPortal(
        <span
          className="fixed w-44 bg-gray-900 text-white text-[11px] leading-snug rounded-lg px-2.5 py-2 z-[9999] pointer-events-none shadow-lg"
          style={{ top: pos.top, left: pos.left, transform: 'translateX(-50%)' }}
        >
          {text}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
        </span>,
        document.body
      )}
    </span>
  );
}
