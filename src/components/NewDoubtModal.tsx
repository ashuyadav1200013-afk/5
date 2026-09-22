import React, { useState, useRef } from 'react';
import { SubjectType, AcademicLevel, Doubt } from '../types';
import { X, Sparkles, BookOpen, Tag, Send, Building2, Upload, Image as ImageIcon, Check } from 'lucide-react';
import { UserAvatar } from './UserAvatar';

interface NewDoubtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDoubt: (newDoubt: Omit<Doubt, 'id' | 'createdAt' | 'upvotes' | 'replies' | 'isSolved'>) => void;
}

const SUBJECTS: SubjectType[] = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Economics',
  'English Literature',
  'History & Philosophy',
  'General Academic',
];

const ACADEMIC_LEVELS: AcademicLevel[] = [
  'GCSE (Year 10-11)',
  'A-Levels (Year 12-13)',
  'International Baccalaureate (IB)',
  'Undergraduate (BSc/BA)',
  'Postgraduate & Research',
];

export const NewDoubtModal: React.FC<NewDoubtModalProps> = ({
  isOpen,
  onClose,
  onCreateDoubt,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState<SubjectType>('Mathematics');
  const [grade, setGrade] = useState<AcademicLevel>('Undergraduate (BSc/BA)');
  const [authorName, setAuthorName] = useState('');
  const [institution, setInstitution] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Photo upload option: 'none' (initials) or 'upload' (custom photo)
  const [photoOption, setPhotoOption] = useState<'none' | 'upload'>('none');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64 Data URL for 100% offline persistence
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const effectiveName = authorName.trim() || 'Student';
    const avatarToUse = photoOption === 'upload' && uploadedPhotoUrl ? uploadedPhotoUrl : undefined;

    onCreateDoubt({
      title: title.trim(),
      description: description.trim(),
      subject,
      grade,
      tags: tags.length > 0 ? tags : [subject.toLowerCase().replace(/\s+/g, '-')],
      authorName: effectiveName,
      authorGrade: grade,
      authorAvatar: avatarToUse,
      institution: institution.trim() || undefined,
      views: 1,
      isBookmarked: false,
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setTagsInput('');
    setAuthorName('');
    setInstitution('');
    setUploadedPhotoUrl('');
    setPhotoOption('none');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        id="new-doubt-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-700/40 rounded-xl border border-indigo-500/30">
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Post a Problem / Ask a Doubt</h3>
              <p className="text-xs text-indigo-200">
                Submit your question to get verified step-by-step solutions
              </p>
            </div>
          </div>
          <button
            id="close-new-doubt-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Question Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Problem Title / Question *
            </label>
            <input
              id="doubt-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to find the derivative of sin(x^2) using chain rule?..."
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Subject & Grade Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-indigo-700" />
                Subject *
              </label>
              <select
                id="doubt-subject-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectType)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white text-slate-900 font-medium cursor-pointer"
              >
                {SUBJECTS.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Class / Academic Level *
              </label>
              <select
                id="doubt-grade-select"
                value={grade}
                onChange={(e) => setGrade(e.target.value as AcademicLevel)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white text-slate-900 font-medium cursor-pointer"
              >
                {ACADEMIC_LEVELS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Author Details & Photo Choice Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Your Information</span>
              <span className="text-[11px] font-normal text-slate-500">No login required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Your Name:
                </label>
                <input
                  id="author-name-input"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  placeholder="Enter your name (e.g. Rahul, John)"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-slate-500" />
                  School / College (Optional):
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  placeholder="e.g. Delhi Public School, Oxford"
                />
              </div>
            </div>

            {/* Photo Upload Choice */}
            <div className="pt-2 border-t border-slate-200/80">
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Photo Option: Do you want to upload your photo?
              </label>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <label className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer transition ${
                  photoOption === 'none'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}>
                  <input
                    type="radio"
                    name="photoChoice"
                    value="none"
                    checked={photoOption === 'none'}
                    onChange={() => setPhotoOption('none')}
                    className="accent-indigo-600"
                  />
                  <span>No, use default avatar / initials</span>
                </label>

                <label className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer transition ${
                  photoOption === 'upload'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}>
                  <input
                    type="radio"
                    name="photoChoice"
                    value="upload"
                    checked={photoOption === 'upload'}
                    onChange={() => setPhotoOption('upload')}
                    className="accent-indigo-600"
                  />
                  <Upload className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Yes, upload my photo</span>
                </label>
              </div>

              {/* Upload Input & Preview when 'upload' is active */}
              {photoOption === 'upload' && (
                <div className="p-3 bg-white rounded-xl border border-dashed border-indigo-300 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageFile}
                      className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                    {uploadedPhotoUrl && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="text-xs text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>

                  {uploadedPhotoUrl ? (
                    <div className="flex items-center gap-3 pt-1">
                      <img
                        src={uploadedPhotoUrl}
                        alt="Preview"
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 shadow-xs"
                      />
                      <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        <span>Photo ready to publish!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400">
                      Select a photo from your computer or mobile to display with your problem.
                    </div>
                  )}
                </div>
              )}

              {/* Initials Preview when 'none' is active */}
              {photoOption === 'none' && (
                <div className="flex items-center gap-2.5 text-xs text-slate-500 pt-1">
                  <UserAvatar
                    name={authorName.trim() || 'Student'}
                    size="sm"
                  />
                  <span>Preview of your avatar: <strong>{authorName.trim() || 'Student'}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Problem Details / What are you trying to solve? *
            </label>
            <textarea
              id="doubt-description-input"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your question in detail, mention what you have tried, or paste the exercise question here..."
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
              <Tag className="h-3.5 w-3.5 text-indigo-700" />
              Tags / Topic (Comma separated, e.g. calculus, integration, organic-chem)
            </label>
            <input
              id="doubt-tags-input"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. algebra, limits, mechanics"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
            />
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-new-doubt-btn"
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white text-xs font-bold rounded-xl shadow-xs transition hover:shadow-md cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Post Problem</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
