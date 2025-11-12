'use client';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Header({ onMenuClick, title = 'Menù Scuola' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-primary shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-primary-dark transition-colors"
          aria-label="Apri menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          {title}
        </h1>

        {/* Placeholder for symmetry */}
        <div className="w-10" />
      </div>
    </header>
  );
}
