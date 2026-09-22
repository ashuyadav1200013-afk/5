import React, { useState, useEffect, useMemo } from 'react';
import { Doubt, Reply, SubjectType, AcademicLevel } from './types';
import { INITIAL_DOUBTS } from './data/initialDoubts';
import { Header } from './components/Header';
import { FiltersBar } from './components/FiltersBar';
import { DoubtCard } from './components/DoubtCard';
import { DoubtDetail } from './components/DoubtDetail';
import { NewDoubtModal } from './components/NewDoubtModal';
import { AboutModal } from './components/AboutModal';
import {
  Sparkles,
  Search,
  Plus,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Bookmark,
  ChevronDown,
  Info,
} from 'lucide-react';

const STORAGE_KEY_DOUBTS = 'problem_solve_doubts_v1';
const ITEMS_PER_PAGE = 12;
const COMMUNITY_BASE_PROBLEMS = 1160;
const COMMUNITY_BASE_SOLVED = 940;

export default function App() {
  // Load doubts from local storage or initial genuine sample data
  const [doubts, setDoubts] = useState<Doubt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DOUBTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load doubts from storage', e);
    }
    return INITIAL_DOUBTS;
  });

  // Active viewed doubt for thread detail
  const [activeDoubtId, setActiveDoubtId] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'All'>('All');
  const [selectedGrade, setSelectedGrade] = useState<AcademicLevel | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unsolved' | 'solved'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'upvotes' | 'replies'>('recent');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Modals
  const [isNewDoubtOpen, setIsNewDoubtOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DOUBTS, JSON.stringify(doubts));
    } catch (e) {
      console.error('Failed to save doubts', e);
    }
  }, [doubts]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedSubject, selectedGrade, selectedStatus, searchQuery, sortBy, showOnlyBookmarked]);

  // Handler: Toggle Upvote on a Doubt
  const handleToggleDoubtUpvote = (doubtId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDoubts((prev) =>
      prev.map((d) => {
        if (d.id === doubtId) {
          const isUpvoted = d.hasUpvoted;
          return {
            ...d,
            hasUpvoted: !isUpvoted,
            upvotes: isUpvoted ? d.upvotes - 1 : d.upvotes + 1,
          };
        }
        return d;
      })
    );
  };

  // Handler: Toggle Bookmark on a Doubt
  const handleToggleBookmark = (doubtId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDoubts((prev) =>
      prev.map((d) => {
        if (d.id === doubtId) {
          const nextState = !d.isBookmarked;
          showToast(nextState ? 'Problem saved to your bookmarks.' : 'Problem removed from bookmarks.');
          return { ...d, isBookmarked: nextState };
        }
        return d;
      })
    );
  };

  // Handler: Toggle Upvote on a Reply
  const handleToggleReplyUpvote = (doubtId: string, replyId: string) => {
    setDoubts((prev) =>
      prev.map((d) => {
        if (d.id === doubtId) {
          return {
            ...d,
            replies: d.replies.map((r) => {
              if (r.id === replyId) {
                const isUp = r.hasUpvoted;
                return {
                  ...r,
                  hasUpvoted: !isUp,
                  upvotes: isUp ? r.upvotes - 1 : r.upvotes + 1,
                };
              }
              return r;
            }),
          };
        }
        return d;
      })
    );
  };

  // Handler: Add Reply directly to doubt
  const handleAddReply = (
    doubtId: string,
    newReplyData: Omit<Reply, 'id' | 'createdAt' | 'upvotes'>
  ) => {
    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      ...newReplyData,
      createdAt: 'Just now',
      upvotes: 1,
      hasUpvoted: true,
    };

    setDoubts((prev) =>
      prev.map((d) => {
        if (d.id === doubtId) {
          return {
            ...d,
            replies: [newReply, ...d.replies],
          };
        }
        return d;
      })
    );

    showToast('Your solution has been submitted and published for peer review.');
  };

  // Handler: Toggle mark reply as solution
  const handleToggleSolution = (doubtId: string, replyId: string) => {
    setDoubts((prev) =>
      prev.map((d) => {
        if (d.id === doubtId) {
          let markSolved = false;
          const updatedReplies = d.replies.map((r) => {
            if (r.id === replyId) {
              const nextState = !r.isSolution;
              if (nextState) markSolved = true;
              return { ...r, isSolution: nextState };
            }
            return r;
          });

          const hasAnySolution = markSolved || updatedReplies.some((r) => r.isSolution);
          return {
            ...d,
            isSolved: hasAnySolution,
            replies: updatedReplies,
          };
        }
        return d;
      })
    );
  };

  // Handler: Create New Doubt
  const handleCreateDoubt = (
    newDoubtData: Omit<Doubt, 'id' | 'createdAt' | 'upvotes' | 'replies' | 'isSolved'>
  ) => {
    const newDoubt: Doubt = {
      id: `doubt-${Date.now()}`,
      ...newDoubtData,
      createdAt: 'Just now',
      upvotes: 1,
      views: 1,
      hasUpvoted: true,
      isSolved: false,
      replies: [],
    };

    setDoubts((prev) => [newDoubt, ...prev]);
    setActiveDoubtId(newDoubt.id);
    showToast('Problem successfully published! Other students can now answer.');
  };

  // Handler: Reset mock data
  const handleResetData = () => {
    if (
      window.confirm(
        'Restore the comprehensive catalog of verified problems and solutions?'
      )
    ) {
      setDoubts(INITIAL_DOUBTS);
      setActiveDoubtId(null);
      showToast('Restored catalog of verified problems and solutions.');
    }
  };

  // Filtered & Sorted doubts
  const filteredDoubts = useMemo(() => {
    return doubts
      .filter((d) => {
        // Bookmarked filter
        if (showOnlyBookmarked && !d.isBookmarked) {
          return false;
        }
        // Subject filter
        if (selectedSubject !== 'All' && d.subject !== selectedSubject) {
          return false;
        }
        // Grade filter
        if (selectedGrade !== 'All' && d.grade !== selectedGrade) {
          return false;
        }
        // Status filter
        if (selectedStatus === 'solved' && !d.isSolved) {
          return false;
        }
        if (selectedStatus === 'unsolved' && d.isSolved) {
          return false;
        }
        // Search query (title, description, tags, author, replies, institution)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = d.title.toLowerCase().includes(q);
          const matchesDesc = d.description.toLowerCase().includes(q);
          const matchesAuthor = d.authorName.toLowerCase().includes(q);
          const matchesInst = d.institution ? d.institution.toLowerCase().includes(q) : false;
          const matchesTags = d.tags.some((t) => t.toLowerCase().includes(q));
          const matchesSubject = d.subject.toLowerCase().includes(q);
          const matchesReplies = d.replies.some(
            (r) =>
              r.content.toLowerCase().includes(q) ||
              r.authorName.toLowerCase().includes(q)
          );
          if (
            !matchesTitle &&
            !matchesDesc &&
            !matchesAuthor &&
            !matchesInst &&
            !matchesTags &&
            !matchesSubject &&
            !matchesReplies
          ) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === 'replies') {
          return b.replies.length - a.replies.length;
        }
        // 'recent' by default
        return 0;
      });
  }, [
    doubts,
    selectedSubject,
    selectedGrade,
    selectedStatus,
    searchQuery,
    sortBy,
    showOnlyBookmarked,
  ]);

  const activeDoubt = doubts.find((d) => d.id === activeDoubtId);
  const totalSolved = doubts.filter((d) => d.isSolved).length;
  const totalCommunityProblems = COMMUNITY_BASE_PROBLEMS + doubts.length;
  const totalCommunitySolved = COMMUNITY_BASE_SOLVED + totalSolved;
  const bookmarkedCount = doubts.filter((d) => d.isBookmarked).length;

  const paginatedDoubts = filteredDoubts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDoubts.length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col antialiased selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Navigation Header */}
      <Header
        onOpenNewDoubt={() => setIsNewDoubtOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalDoubts={totalCommunityProblems}
        solvedDoubts={totalCommunitySolved}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeDoubt ? (
          /* Single Doubt Thread View */
          <DoubtDetail
            doubt={activeDoubt}
            onBack={() => setActiveDoubtId(null)}
            onToggleDoubtUpvote={handleToggleDoubtUpvote}
            onToggleReplyUpvote={handleToggleReplyUpvote}
            onAddReply={handleAddReply}
            onToggleSolution={handleToggleSolution}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          /* Doubts Feed View */
          <div className="space-y-6">
            {/* Welcome Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg border border-indigo-900/60">
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>Developed by Ashu Yadav</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Problem Solve
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Ask your doubts, share step-by-step solutions, and collaborate with students across Maths, Science, Humanities, and Computing.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    id="hero-ask-doubt-btn"
                    onClick={() => setIsNewDoubtOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition hover:scale-[1.01] cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Post a Problem</span>
                  </button>

                  <button
                    onClick={() => setIsAboutOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/20 transition cursor-pointer"
                  >
                    <Info className="h-4 w-4 text-indigo-300" />
                    <span>About Platform</span>
                  </button>

                  <div className="flex items-center gap-2.5 text-xs text-slate-300 flex-wrap">
                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                      1,200+ Student Problems
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      980+ Verified Solutions
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute right-40 -top-12 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Quick Metrics & Bookmarks Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Total Problems
                </div>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {totalCommunityProblems.toLocaleString()}+ <span className="text-xs font-medium text-slate-400">posted</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Verified Solutions
                </div>
                <div className="text-xl font-black text-emerald-700 mt-0.5">
                  {totalCommunitySolved.toLocaleString()}+ <span className="text-xs font-medium text-slate-400">resolved</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Academic Subjects
                </div>
                <div className="text-xl font-black text-indigo-700 mt-0.5">
                  9 <span className="text-xs font-medium text-slate-400">disciplines</span>
                </div>
              </div>

              <button
                onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                  showOnlyBookmarked
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                    : 'bg-white border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Saved Problems</span>
                  <Bookmark className={`h-3 w-3 ${showOnlyBookmarked ? 'text-amber-600 fill-current' : 'text-slate-400'}`} />
                </div>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {bookmarkedCount} <span className="text-xs font-medium text-slate-400">{showOnlyBookmarked ? 'filtered' : 'bookmarked'}</span>
                </div>
              </button>
            </div>

            {/* Filter & Subject Selection Bar */}
            <FiltersBar
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
              selectedGrade={selectedGrade}
              onSelectGrade={setSelectedGrade}
              selectedStatus={selectedStatus}
              onSelectStatus={setSelectedStatus}
              sortBy={sortBy}
              onSelectSort={setSortBy}
              totalFiltered={filteredDoubts.length}
            />

            {/* Doubts List */}
            {filteredDoubts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-4 shadow-xs">
                <div className="h-16 w-16 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    No Problems Found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    No problems match your current search or filters. You can clear filters or post a new problem.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedSubject('All');
                      setSelectedGrade('All');
                      setSelectedStatus('all');
                      setSearchQuery('');
                      setShowOnlyBookmarked(false);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={() => setIsNewDoubtOpen(true)}
                    className="px-4 py-2 text-xs font-bold text-white bg-indigo-700 hover:bg-indigo-800 rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Post a Problem
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedDoubts.map((doubt) => (
                    <DoubtCard
                      key={doubt.id}
                      doubt={doubt}
                      onSelect={(id) => setActiveDoubtId(id)}
                      onToggleUpvote={handleToggleDoubtUpvote}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-200">
                  <span>
                    Showing <strong>{Math.min(visibleCount, filteredDoubts.length)}</strong> of{' '}
                    <strong>{filteredDoubts.length}</strong> problems
                  </span>

                  {hasMore && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 font-semibold text-indigo-700 rounded-xl shadow-2xs transition cursor-pointer"
                      >
                        <ChevronDown className="h-4 w-4" />
                        <span>Load More Problems ({ITEMS_PER_PAGE} more)</span>
                      </button>

                      <button
                        onClick={() => setVisibleCount(filteredDoubts.length)}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 font-medium text-slate-700 rounded-xl transition cursor-pointer"
                      >
                        <span>Show All ({filteredDoubts.length})</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer with Ashu Yadav Attribution */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-900">Problem Solve</span>
            <span>•</span>
            <span className="text-slate-700 font-semibold">
              Developed by <strong className="text-indigo-700 font-bold">Ashu Yadav</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-700 transition cursor-pointer"
              title="Reset the catalog of problems and solutions"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to Default Problems</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400">Student Doubt-Solving Platform</span>
          </div>
        </div>
      </footer>

      {/* New Doubt Creation Modal */}
      <NewDoubtModal
        isOpen={isNewDoubtOpen}
        onClose={() => setIsNewDoubtOpen(false)}
        onCreateDoubt={handleCreateDoubt}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenPostDoubt={() => {
          setIsAboutOpen(false);
          setIsNewDoubtOpen(true);
        }}
      />
    </div>
  );
}
