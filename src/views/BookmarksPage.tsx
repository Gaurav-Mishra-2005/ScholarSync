import React from 'react';
import { Bell, Star, User } from 'lucide-react';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { Scholarship, User as UserType, ViewType } from '../types';

interface BookmarksPageProps {
  user: UserType | null;
  bookmarkedScholarships: Scholarship[];
  setCurrentView: (view: ViewType) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  onToggleBookmark: (id: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  user,
  bookmarkedScholarships,
  setCurrentView,
  setIsAuthModalOpen,
  onToggleBookmark
}) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Bookmarked Scholarships</h1>
          <p className="text-lg text-gray-600">Keep track of your favorite opportunities</p>
        </div>
        
        {!user ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign in to view bookmarks</h3>
            <p className="text-gray-600 mb-4">Create an account to save and track your favorite scholarships</p>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        ) : bookmarkedScholarships.length > 0 ? (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-blue-800 font-medium">Deadline Reminders Active</p>
                <p className="text-blue-600 text-sm">We'll notify you 7 days before application deadlines</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookmarkedScholarships.map(scholarship => (
                <ScholarshipCard 
                  key={scholarship.id} 
                  scholarship={scholarship} 
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Star className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookmarked scholarships yet</h3>
            <p className="text-gray-600 mb-4">Start bookmarking scholarships to keep track of your favorites</p>
            <button 
              onClick={() => setCurrentView('scholarships')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Scholarships
            </button>
          </div>
        )}
      </div>
    </div>
  );
};