export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  description: string;
  eligibility: string[];
  branch: string;
  gender: string;
  image: string;
  category: string;
  applicants: number;
  isBookmarked: boolean;
  location?: string;
}

export interface User {
  email: string;
  name: string;
}

export type ViewType = 'home' | 'scholarships' | 'bookmarks';