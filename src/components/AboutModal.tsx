import React from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Zap, BookOpen, UserCheck } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPostDoubt: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenPostDoubt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        id="about-modal-container"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/30 rounded-xl border border-indigo-400/30">
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">About Problem Solve</h3>
              <p className="text-xs text-indigo-200">Developed by Ashu Yadav</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-slate-700">
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              Student Doubt-Solving Platform
            </span>
            <p className="text-sm leading-relaxed text-slate-600 font-normal">
              <strong>Problem Solve</strong> is an open, peer-to-peer academic platform with over <strong>1,200+ student problems</strong> posted and <strong>980+ verified step-by-step solutions</strong> contributed across Mathematics, Sciences, Computing, and Humanities.
            </p>
          </div>

          <div className="space-y-2.5 pt-1 border-t border-slate-100">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-slate-800">Verified Peer Solutions:</strong> Step-by-step explanations, mathematical derivations, and conceptual clarifications contributed by students.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <UserCheck className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-slate-800">Your Photo, Your Choice:</strong> When posting a problem or solution, choose whether to upload your photo or use clean initials.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <BookOpen className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-slate-800">Multi-Subject Support:</strong> Comprehensive coverage of Mathematics, Physics, Chemistry, Biology, Computer Science, Economics, and Humanities.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-slate-800">Vercel & GitHub Friendly:</strong> Hostable anywhere directly from GitHub with zero backend configuration.
              </div>
            </div>
          </div>

          {/* Credits Box */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
            <div className="text-xs text-slate-500">Project Architect & Developer</div>
            <div className="text-sm font-black text-indigo-900 mt-0.5">Ashu Yadav</div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenPostDoubt();
              }}
              className="px-4 py-2 text-xs font-bold bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl shadow-xs transition cursor-pointer"
            >
              Post a Problem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
