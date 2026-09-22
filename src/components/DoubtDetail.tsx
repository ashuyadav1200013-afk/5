import React, { useState, useRef } from 'react';
import { Doubt, Reply, UserProfile, AcademicLevel } from '../types';
import { UserAvatar } from './UserAvatar';
import {
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  Share2,
  Send,
  Sparkles,
  Tag,
  Award,
  Check,
  Code,
  ListOrdered,
  Building2,
  GraduationCap,
  Eye,
  Bookmark,
  Sigma,
  Upload,
} from 'lucide-react';

interface DoubtDetailProps {
  doubt: Doubt;
  currentUser?: UserProfile;
  onBack: () => void;
  onToggleDoubtUpvote: (doubtId: string) => void;
  onToggleReplyUpvote: (doubtId: string, replyId: string) => void;
  onAddReply: (doubtId: string, newReply: Omit<Reply, 'id' | 'createdAt' | 'upvotes'>) => void;
  onToggleSolution: (doubtId: string, replyId: string) => void;
  onToggleBookmark?: (doubtId: string) => void;
}

const ACADEMIC_LEVELS: AcademicLevel[] = [
  'GCSE (Year 10-11)',
  'A-Levels (Year 12-13)',
  'International Baccalaureate (IB)',
  'Undergraduate (BSc/BA)',
  'Postgraduate & Research',
];

export const DoubtDetail: React.FC<DoubtDetailProps> = ({
  doubt,
  onBack,
  onToggleDoubtUpvote,
  onToggleReplyUpvote,
  onAddReply,
  onToggleSolution,
  onToggleBookmark,
}) => {
  const [replyText, setReplyText] = useState('');
  const [responderName, setResponderName] = useState('');
  const [responderGrade, setResponderGrade] = useState<AcademicLevel>('Undergraduate (BSc/BA)');
  const [responderInstitution, setResponderInstitution] = useState('');
  const [photoOption, setPhotoOption] = useState<'none' | 'upload'>('none');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      if (typeof loadEvent.target?.result === 'string') {
        setUploadedPhotoUrl(loadEvent.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setUploadedPhotoUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    const effectiveName = responderName.trim() || 'Fellow Student';
    const avatarToUse = photoOption === 'upload' && uploadedPhotoUrl ? uploadedPhotoUrl : undefined;

    onAddReply(doubt.id, {
      authorName: effectiveName,
      authorGrade: responderGrade,
      authorAvatar: avatarToUse,
      institution: responderInstitution.trim() || undefined,
      content: replyText.trim(),
      isSolution: false,
    });

    setReplyText('');
    setResponderName('');
    setResponderInstitution('');
    setUploadedPhotoUrl('');
    setPhotoOption('none');
    setIsSubmitting(false);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertHelperSnippet = (type: 'steps' | 'formula' | 'code') => {
    let snippet = '';
    if (type === 'steps') {
      snippet = `\n1. **Premise & Governing Principles**: State the applicable theorem or physical law.\n2. **Derivation / Working**: Substitute boundary conditions and simplify algebraically.\n3. **Conclusion**: State the final evaluated result clearly with units.\n`;
    } else if (type === 'formula') {
      snippet = `\n**Governing Formula**: \nΔG° = ΔH° - TΔS°\n`;
    } else if (type === 'code') {
      snippet = `\n\`\`\`python\n# Algorithmic implementation\ndef solve_problem():\n    pass\n\`\`\`\n`;
    }
    setReplyText((prev) => prev + snippet);
  };

  return (
    <div className="space-y-6">
      {/* Top back navigation and quick share */}
      <div className="flex items-center justify-between">
        <button
          id="back-to-doubts-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Enquiries</span>
        </button>

        <div className="flex items-center gap-2">
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(doubt.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition cursor-pointer ${
                doubt.isBookmarked
                  ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${doubt.isBookmarked ? 'fill-current' : ''}`} />
              <span>{doubt.isBookmarked ? 'Saved' : 'Save Enquiry'}</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share Discussion'}</span>
          </button>
        </div>
      </div>

      {/* Main Doubt Question Card */}
      <article className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
        {/* Tags, subject, grade row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
              {doubt.subject}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
              {doubt.grade}
            </span>
            {doubt.isSolved ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Verified Solution
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
                Awaiting Solution
              </span>
            )}
          </div>

          {/* Upvote doubt button */}
          <button
            id={`doubt-detail-upvote-${doubt.id}`}
            onClick={() => onToggleDoubtUpvote(doubt.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer ${
              doubt.hasUpvoted
                ? 'bg-indigo-700 text-white'
                : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700'
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${doubt.hasUpvoted ? 'fill-current' : ''}`} />
            <span>{doubt.upvotes} Upvotes</span>
          </button>
        </div>

        {/* Question Title */}
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
          {doubt.title}
        </h1>

        {/* Author details */}
        <div className="flex items-center gap-3 py-3 border-y border-slate-100">
          <UserAvatar
            src={doubt.authorAvatar}
            name={doubt.authorName}
            size="lg"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-slate-900">{doubt.authorName}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600 font-medium">
                {doubt.authorGrade}
              </span>
              {doubt.institution && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  <Building2 className="h-3 w-3 text-slate-400" />
                  {doubt.institution}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Enquiry logged: {doubt.createdAt} • {doubt.views || 42} views
            </p>
          </div>
        </div>

        {/* Full Question Description */}
        <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-50/70 p-5 rounded-xl border border-slate-100">
          {doubt.description}
        </div>

        {/* Tags */}
        {doubt.tags && doubt.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {doubt.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200"
              >
                <Tag className="h-3 w-3 text-slate-400" />
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Answers / Replies Section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Peer Solutions & Academic Explanations ({doubt.replies.length})
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Rigorous peer-reviewed student responses
          </span>
        </div>

        {/* List of Replies */}
        {doubt.replies.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300 space-y-3">
            <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Awaiting First Peer Solution</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Be the first scholar to formulate a structured, step-by-step solution for this enquiry. Use the academic response form below.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {doubt.replies.map((reply) => {
              return (
                <div
                  key={reply.id}
                  id={`reply-${reply.id}`}
                  className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all ${
                    reply.isSolution
                      ? 'border-emerald-300 ring-2 ring-emerald-100 bg-emerald-50/15'
                      : 'border-slate-200 shadow-xs'
                  }`}
                >
                  {/* Verified Solution Banner */}
                  {reply.isSolution && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-lg w-fit mb-3.5 border border-emerald-300/60">
                      <Award className="h-4 w-4 text-emerald-700" />
                      <span>Verified Best Solution & Method</span>
                    </div>
                  )}

                  {/* Reply Header: Author & Controls */}
                  <div className="flex items-center justify-between gap-3 mb-3.5 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar
                        src={reply.authorAvatar}
                        name={reply.authorName}
                        size="md"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-bold text-slate-900">{reply.authorName}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                            {reply.authorGrade}
                          </span>
                          {reply.institution && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.2 rounded border border-slate-200">
                              <Building2 className="h-2.5 w-2.5 text-slate-400" />
                              {reply.institution}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{reply.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Mark as Solution Toggle */}
                      <button
                        onClick={() => onToggleSolution(doubt.id, reply.id)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition border cursor-pointer ${
                          reply.isSolution
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                            : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border-slate-200'
                        }`}
                        title={reply.isSolution ? 'Unmark solution' : 'Mark as accepted best solution'}
                      >
                        {reply.isSolution ? '✓ Accepted Solution' : 'Accept Solution'}
                      </button>

                      {/* Reply Upvote button */}
                      <button
                        id={`reply-upvote-${reply.id}`}
                        onClick={() => onToggleReplyUpvote(doubt.id, reply.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          reply.hasUpvoted
                            ? 'bg-indigo-700 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700'
                        }`}
                      >
                        <ThumbsUp className={`h-3.5 w-3.5 ${reply.hasUpvoted ? 'fill-current' : ''}`} />
                        <span>{reply.upvotes}</span>
                      </button>
                    </div>
                  </div>

                  {/* Reply Content */}
                  <div className="text-slate-800 text-sm leading-relaxed whitespace-pre-line font-normal">
                    {reply.content}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reply Box */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-700" />
              <span>Contribute a Solution or Explanation</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Student Peer Discussion
            </span>
          </div>

          <form onSubmit={handleSubmitReply} className="space-y-4">
            {/* Author Identity row for reply */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name:
                </label>
                <input
                  type="text"
                  value={responderName}
                  onChange={(e) => setResponderName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  placeholder="e.g. Rahul, Sneha, David"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Level:
                </label>
                <select
                  value={responderGrade}
                  onChange={(e) => setResponderGrade(e.target.value as AcademicLevel)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                >
                  {ACADEMIC_LEVELS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School / College (Optional):
                </label>
                <input
                  type="text"
                  value={responderInstitution}
                  onChange={(e) => setResponderInstitution(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  placeholder="e.g. University / College"
                />
              </div>
            </div>

            {/* Photo Upload Option for Responder */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <label className="block text-xs font-semibold text-slate-800 mb-2">
                Photo Option: Do you want to upload your photo?
              </label>

              <div className="flex flex-wrap items-center gap-3 mb-2">
                <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                  photoOption === 'none'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}>
                  <input
                    type="radio"
                    name="responderPhotoChoice"
                    value="none"
                    checked={photoOption === 'none'}
                    onChange={() => setPhotoOption('none')}
                    className="accent-indigo-600"
                  />
                  <span>No, use default avatar / initials</span>
                </label>

                <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                  photoOption === 'upload'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}>
                  <input
                    type="radio"
                    name="responderPhotoChoice"
                    value="upload"
                    checked={photoOption === 'upload'}
                    onChange={() => setPhotoOption('upload')}
                    className="accent-indigo-600"
                  />
                  <Upload className="h-3 w-3 text-indigo-600" />
                  <span>Yes, upload my photo</span>
                </label>
              </div>

              {photoOption === 'upload' && (
                <div className="mt-2 p-2.5 bg-white rounded-lg border border-dashed border-indigo-300 flex items-center justify-between gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFile}
                    className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                  />
                  {uploadedPhotoUrl && (
                    <div className="flex items-center gap-2">
                      <img
                        src={uploadedPhotoUrl}
                        alt="Preview"
                        className="w-8 h-8 rounded-full object-cover border border-indigo-300"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="text-xs text-rose-600 hover:text-rose-800 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick formatting shortcuts */}
            <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap">
              <span className="text-[11px] text-slate-400 font-medium">Formatting Templates:</span>
              <button
                type="button"
                onClick={() => insertHelperSnippet('steps')}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer"
              >
                <ListOrdered className="h-3 w-3 text-indigo-700" />
                + Method Steps
              </button>
              <button
                type="button"
                onClick={() => insertHelperSnippet('formula')}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer"
              >
                <Sigma className="h-3 w-3 text-emerald-700" />
                + Governing Formula
              </button>
              <button
                type="button"
                onClick={() => insertHelperSnippet('code')}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer"
              >
                <Code className="h-3 w-3 text-amber-700" />
                + Algorithmic Code
              </button>
            </div>

            {/* Textarea */}
            <div>
              <textarea
                id="reply-textarea"
                rows={5}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your step-by-step solution or explanation here..."
                className="w-full p-3.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden text-slate-800 placeholder:text-slate-400 leading-relaxed"
                required
              />
            </div>

            {/* Action submit button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 gap-2">
              <p className="text-[11px] text-slate-400">
                Your explanation will be posted instantly with peer review.
              </p>
              <button
                id="submit-reply-btn"
                type="submit"
                disabled={isSubmitting || !replyText.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition hover:shadow-md cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Solution</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
