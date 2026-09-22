export type SubjectType =
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Computer Science'
  | 'Economics'
  | 'English Literature'
  | 'History & Philosophy'
  | 'General Academic';

export type AcademicLevel =
  | 'GCSE (Year 10-11)'
  | 'A-Levels (Year 12-13)'
  | 'International Baccalaureate (IB)'
  | 'Undergraduate (BSc/BA)'
  | 'Postgraduate & Research';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  grade: AcademicLevel;
  institution?: string;
  reputationPoints?: number;
}

export interface Reply {
  id: string;
  authorName: string;
  authorGrade: AcademicLevel;
  authorAvatar?: string;
  institution?: string;
  content: string;
  createdAt: string;
  upvotes: number;
  isSolution: boolean;
  hasUpvoted?: boolean;
}

export interface Doubt {
  id: string;
  title: string;
  description: string;
  subject: SubjectType;
  grade: AcademicLevel;
  tags: string[];
  authorName: string;
  authorGrade: AcademicLevel;
  authorAvatar?: string;
  institution?: string;
  createdAt: string;
  upvotes: number;
  views: number;
  hasUpvoted?: boolean;
  isSolved: boolean;
  isBookmarked?: boolean;
  replies: Reply[];
}
