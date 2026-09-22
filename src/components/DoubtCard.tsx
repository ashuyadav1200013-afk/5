import React from 'react';
import { Doubt } from '../types';
import { UserAvatar } from './UserAvatar';
import {
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Tag,
  Eye,
  Bookmark,
  GraduationCap,
} from 'lucide-react';

interface DoubtCardProps {
  doubt: Doubt;
  onSelect: (doubtId: string) => void;
  onToggleUpvote: (doubtId: string, e: React.MouseEvent) => void;
  onToggleBookmark?: (doubtId: string, e: React.MouseEvent) => void;
}

const getSubjectBadgeStyle = (subject: string) => {
  switch (subject) {
    case 'Mathematics':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'Physics':
      return 'bg-indigo-50 text-indigo-800 border-indigo-200';
    case 'Chemistry':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'Biology':
      return 'bg-rose-50 text-rose-800 border-rose-200';
    case 'Computer Science':
      return 'bg-amber-50 text-amber-900 border-amber-200';
    case 'Economics':
      return 'bg-teal-50 text-teal-800 border-teal-200';
    case 'English Literature':
      return 'bg-purple-50 text-purple-800 border-purple-200';
    case 'History & Philosophy':
      return 'bg-stone-100 text-stone-800 border-stone-200';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

export const DoubtCard: React.FC<DoubtCardProps> = ({
  doubt,
  onSelect,
  onToggleUpvote,
  onToggleBookmark,
}) => {
  const repliesCount = doubt.replies.length;
  const hasSolution = doubt.isSolved || doubt.replies.some((r) => r.isSolution);

  return (
    <article
      id={`doubt-card-${doubt.id}`}
      onClick={() => onSelect(doubt.id)}
      className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top row: Subject, Grade, Solved status, Upvotes */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getSubjectBadgeStyle(
                doubt.subject
              )}`}
            >
              {doubt.subject}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
              {doubt.grade}
            </span>
            {hasSolution ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                <span>Verified Solution</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                <HelpCircle className="h-3 w-3 text-amber-600" />
                <span>Needs Solution</span>
              </span>
            )}
          </div>

          {/* Action buttons (Bookmark & Upvote) */}
          <div className="flex items-center gap-1.5">
            {onToggleBookmark && (
              <button
                id={`doubt-bookmark-btn-${doubt.id}`}
                onClick={(e) => onToggleBookmark(doubt.id, e)}
                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                  doubt.isBookmarked
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title={doubt.isBookmarked ? 'Remove bookmark' : 'Bookmark enquiry'}
              >
                <Bookmark className={`h-3.5 w-3.5 ${doubt.isBookmarked ? 'fill-current' : ''}`} />
              </button>
            )}

            <button
              id={`doubt-upvote-btn-${doubt.id}`}
              onClick={(e) => onToggleUpvote(doubt.id, e)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                doubt.hasUpvoted
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700'
              }`}
              title="Upvote this academic enquiry"
            >
              <ThumbsUp className={`h-3.5 w-3.5 ${doubt.hasUpvoted ? 'fill-current' : ''}`} />
              <span>{doubt.upvotes}</span>
            </button>
          </div>
        </div>

        {/* Question Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-2 mb-2">
          {doubt.title}
        </h3>

        {/* Academic Snippet */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-3.5 leading-relaxed">
          {doubt.description}
        </p>

        {/* Academic Tags */}
        {doubt.tags && doubt.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {doubt.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-0.5 text-[11px] font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200"
              >
                <Tag className="h-2.5 w-2.5 text-slate-400" />#{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom row: Scholar Info & Reply CTA */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 gap-2">
        {/* Scholar Avatar & Details */}
        <div className="flex items-center gap-2">
          <UserAvatar
            src={doubt.authorAvatar}
            name={doubt.authorName}
            size="sm"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-800">{doubt.authorName}</span>
              {doubt.institution && (
                <span className="hidden md:inline-flex items-center gap-0.5 text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                  <GraduationCap className="h-2.5 w-2.5 text-slate-500" />
                  {doubt.institution}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              <span>{doubt.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Stats & Solution CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Eye className="h-3 w-3" />
            <span>{doubt.views || 45}</span>
          </div>

          <div className="flex items-center gap-1 font-medium text-slate-700">
            <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />
            <span>
              {repliesCount} {repliesCount === 1 ? 'peer reply' : 'peer replies'}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 group-hover:translate-x-0.5 transition-transform">
            <span>View Thread</span>
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </article>
  );
};
