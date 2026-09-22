import React from 'react';
import { SubjectType, AcademicLevel } from '../types';
import { Filter, CheckCircle2, HelpCircle, ArrowUpDown, Layers } from 'lucide-react';

interface FiltersBarProps {
  selectedSubject: SubjectType | 'All';
  onSelectSubject: (subject: SubjectType | 'All') => void;
  selectedGrade: AcademicLevel | 'All';
  onSelectGrade: (grade: AcademicLevel | 'All') => void;
  selectedStatus: 'all' | 'unsolved' | 'solved';
  onSelectStatus: (status: 'all' | 'unsolved' | 'solved') => void;
  sortBy: 'recent' | 'upvotes' | 'replies';
  onSelectSort: (sort: 'recent' | 'upvotes' | 'replies') => void;
  totalFiltered: number;
}

const SUBJECTS: { label: SubjectType | 'All'; icon: string; color: string }[] = [
  { label: 'All', icon: '📚', color: 'bg-slate-100 text-slate-800 hover:bg-slate-200' },
  { label: 'Mathematics', icon: '📐', color: 'bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200' },
  { label: 'Physics', icon: '⚛️', color: 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border-indigo-200' },
  { label: 'Chemistry', icon: '🧪', color: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200' },
  { label: 'Biology', icon: '🧬', color: 'bg-rose-50 text-rose-800 hover:bg-rose-100 border-rose-200' },
  { label: 'Computer Science', icon: '💻', color: 'bg-amber-50 text-amber-900 hover:bg-amber-100 border-amber-200' },
  { label: 'Economics', icon: '📈', color: 'bg-teal-50 text-teal-800 hover:bg-teal-100 border-teal-200' },
  { label: 'English Literature', icon: '📜', color: 'bg-purple-50 text-purple-800 hover:bg-purple-100 border-purple-200' },
  { label: 'History & Philosophy', icon: '🏛️', color: 'bg-stone-100 text-stone-800 hover:bg-stone-200 border-stone-200' },
];

const ACADEMIC_LEVELS: (AcademicLevel | 'All')[] = [
  'All',
  'GCSE (Year 10-11)',
  'A-Levels (Year 12-13)',
  'International Baccalaureate (IB)',
  'Undergraduate (BSc/BA)',
  'Postgraduate & Research',
];

export const FiltersBar: React.FC<FiltersBarProps> = ({
  selectedSubject,
  onSelectSubject,
  selectedGrade,
  onSelectGrade,
  selectedStatus,
  onSelectStatus,
  sortBy,
  onSelectSort,
  totalFiltered,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4 mb-6">
      {/* Subject Filter Pills */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-indigo-700" />
            Academic Disciplines
          </span>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            {totalFiltered} problems available
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {SUBJECTS.map((item) => {
            const isSelected = selectedSubject === item.label;
            return (
              <button
                key={item.label}
                id={`filter-subject-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onSelectSubject(item.label)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-700 text-white border-indigo-700 shadow-sm'
                    : `${item.color} border-transparent`
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls: Academic Level, Solution Status, and Sorter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        {/* Academic Level Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
          <span className="text-slate-500 font-medium whitespace-nowrap flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-slate-400" />
            Level:
          </span>
          {ACADEMIC_LEVELS.map((grade) => (
            <button
              key={grade}
              id={`filter-grade-${grade.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => onSelectGrade(grade)}
              className={`px-2.5 py-1 rounded-lg font-medium transition whitespace-nowrap cursor-pointer ${
                selectedGrade === grade
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>

        {/* Status & Sorting Controls */}
        <div className="flex items-center gap-3 ml-auto flex-wrap sm:flex-nowrap">
          {/* Status Filter Tabs */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              id="status-filter-all"
              onClick={() => onSelectStatus('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                selectedStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All Enquiries
            </button>
            <button
              id="status-filter-unsolved"
              onClick={() => onSelectStatus('unsolved')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                selectedStatus === 'unsolved'
                  ? 'bg-white text-amber-800 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
              <span>Awaiting Solution</span>
            </button>
            <button
              id="status-filter-solved"
              onClick={() => onSelectStatus('solved')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                selectedStatus === 'solved'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Solved</span>
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <select
              id="sort-doubts-select"
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-600 cursor-pointer"
            >
              <option value="recent">Most Recent First</option>
              <option value="upvotes">Highest Upvoted</option>
              <option value="replies">Most Peer Replies</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
