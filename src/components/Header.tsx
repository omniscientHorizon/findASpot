'use client';

interface HeaderProps {
  totalAvailable: number;
  totalSpots: number;
  onFindClick: () => void;
  onInfoClick: () => void;
}

export default function Header({ totalAvailable, onFindClick, onInfoClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900 leading-none">SpotFinder</h1>
          <p className="text-xs text-gray-400 leading-none mt-0.5">Schaffer Library</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onInfoClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
            How it works
          </button>
          <button
            onClick={onFindClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Find
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-900 font-medium">{totalAvailable} spots open</span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              live
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
