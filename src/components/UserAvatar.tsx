import React, { useState } from 'react';

interface UserAvatarProps {
  src?: string;
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE_CLASSES = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-7 h-7 text-xs',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-12 h-12 text-base',
};

// Generates consistent, high-contrast, collegiate color themes per student name
const PALETTES = [
  { bg: 'from-blue-600 to-indigo-700', text: 'text-white', border: 'border-blue-300' },
  { bg: 'from-emerald-600 to-teal-700', text: 'text-white', border: 'border-emerald-300' },
  { bg: 'from-violet-600 to-purple-800', text: 'text-white', border: 'border-purple-300' },
  { bg: 'from-rose-500 to-pink-700', text: 'text-white', border: 'border-rose-300' },
  { bg: 'from-amber-600 to-orange-700', text: 'text-white', border: 'border-amber-300' },
  { bg: 'from-cyan-600 to-blue-700', text: 'text-white', border: 'border-cyan-300' },
  { bg: 'from-slate-700 to-slate-900', text: 'text-white', border: 'border-slate-400' },
];

function getInitials(name: string): string {
  if (!name) return 'S';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getPalette(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTES.length;
  return PALETTES[index];
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  className = '',
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);
  const palette = getPalette(name);
  const initials = getInitials(name);
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
        loading="lazy"
        className={`${sizeClass} rounded-full object-cover shrink-0 border border-slate-200/80 shadow-2xs ${className}`}
      />
    );
  }

  // Guaranteed 100% offline fallback: styled academic avatar with student initials
  return (
    <div
      title={name}
      aria-label={name}
      className={`${sizeClass} rounded-full bg-gradient-to-br ${palette.bg} ${palette.text} ${palette.border} border flex items-center justify-center font-bold select-none shrink-0 shadow-2xs ${className}`}
    >
      <span>{initials}</span>
    </div>
  );
};
