import React from 'react';
import {
  Sparkles,
  Plus,
  Search,
  BookOpen,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface HeaderProps {
  onOpenNewDoubt: () => void;
  onOpenAbout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalDoubts: number;
  solvedDoubts: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewDoubt,
  onOpenAbout,
  searchQuery,
  onSearchChange,
  totalDoubts,
  solvedDoubts,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Main Navigation Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
          {/* Brand Logo & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 flex items-center justify-center text-white shadow-md shadow-indigo-300/30 shrink-0">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                    Problem <span className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">Solve</span>
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                    Developed by Ashu Yadav
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Student Doubt & Problem Solving Community
                </p>
              </div>
            </div>

            {/* Mobile Actions: About & Post */}
            <div className="flex md:hidden items-center gap-2">
              <button
                id="mobile-about-btn"
                onClick={onOpenAbout}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                title="About Problem Solve"
              >
                <Info className="h-3.5 w-3.5 text-indigo-600" />
                <span>About</span>
              </button>

              <button
                id="mobile-ask-doubt-btn"
                onClick={onOpenNewDoubt}
                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white text-xs font-semibold rounded-xl shadow-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Post</span>
              </button>
            </div>
          </div>

          {/* Search bar & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 md:max-w-xl md:justify-end">
            {/* Live Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search doubts, theorems, subjects, or keywords..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:bg-white text-slate-900 placeholder:text-slate-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Desktop About Button */}
            <button
              id="desktop-about-btn"
              onClick={onOpenAbout}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl transition cursor-pointer shrink-0"
              title="About Problem Solve platform"
            >
              <Info className="h-4 w-4 text-indigo-600" />
              <span>About</span>
            </button>

            {/* Desktop Post Doubt Button */}
            <button
              id="desktop-ask-doubt-btn"
              onClick={onOpenNewDoubt}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white text-sm font-semibold rounded-xl shadow-xs transition hover:shadow-md cursor-pointer shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Post Doubt</span>
            </button>
          </div>
        </div>

        {/* Quick Academic Metric Subheader */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
              <strong className="text-slate-800">{totalDoubts.toLocaleString()}+</strong> Total Problems
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <strong className="text-slate-800">{solvedDoubts.toLocaleString()}+</strong> Verified Solutions
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            <span>Free Open Student Community</span>
          </div>
        </div>
      </div>
    </header>
  );
};
