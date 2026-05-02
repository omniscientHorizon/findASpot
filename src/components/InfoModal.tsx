'use client';

interface InfoModalProps {
  onClose: () => void;
}

export default function InfoModal({ onClose }: InfoModalProps) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
      <div
        className="fixed z-50 bottom-0 left-0 right-0 bg-white rounded-t-2xl animate-slide-up md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[380px] md:rounded-2xl"
        style={{ boxShadow: '0 -4px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)' }}
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <span className="w-8 h-1 rounded-full bg-gray-200 block" />
        </div>

        <div className="px-6 pt-4 pb-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">How SpotFinder works</h2>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 text-xl leading-none"
            >×</button>
          </div>

          <div className="flex flex-col gap-5">
            <Step n="1" title="Browse the map">
              Switch floors using the tabs at the top. Each colored dot is a study spot, tap any dot to see details.
            </Step>
            <Step n="2" title="Read the colors">
              <span className="inline-flex items-center gap-1.5 mr-2"><Dot color="#22c55e" /><b>Green</b></span> is open,&nbsp;
              <span className="inline-flex items-center gap-1.5 mr-2"><Dot color="#ef4444" /><b>red</b></span> is taken,&nbsp;
              <span className="inline-flex items-center gap-1.5"><Dot color="#d1d5db" /><b>gray</b></span> means no recent report.
            </Step>
            <Step n="3" title="Report what you see">
              Tap a spot, then choose what you observed, <b>It&apos;s free</b>, <b>I&apos;m here</b>, or <b>It&apos;s taken</b>. Reports expire after 1 hour automatically.
            </Step>
            <Step n="4" title="Find a spot fast">
              Hit <b>Find</b> in the top bar to search across all floors and types. Tap a result and the map jumps right to it.
            </Step>
          </div>

          <p className="mt-6 text-[11px] text-gray-400 text-center">
            SpotFinder is crowdsourced, accuracy depends on everyone reporting.
          </p>
        </div>
      </div>
    </>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="w-2 h-2 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: color }} />;
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
        {n}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-900 mb-0.5">{title}</p>
        <p className="text-sm text-gray-500 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
