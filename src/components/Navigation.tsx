import React from 'react';
import { GraduationCap, Menu, X, Star, LogOut, User } from 'lucide-react';
import { User as UserType, ViewType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  user: UserType | null;
  setIsAuthModalOpen: (open: boolean) => void;
  handleLogout: () => void;
  bookmarkedCount: number;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  setCurrentView,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  user,
  setIsAuthModalOpen,
  handleLogout,
  bookmarkedCount,
  isUserMenuOpen,
  setIsUserMenuOpen
}) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ScholarSync</span>
              <span className="ml-2 text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">India</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setCurrentView('home')}
                className={`${currentView === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} px-3 py-2 text-sm font-medium transition-colors`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('scholarships')}
                className={`${currentView === 'scholarships' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} px-3 py-2 text-sm font-medium transition-colors`}
              >
                Scholarships
              </button>
              <button
                onClick={() => setCurrentView('bookmarks')}
                className={`${currentView === 'bookmarks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} px-3 py-2 text-sm font-medium transition-colors relative`}
              >
                Bookmarks
                {bookmarkedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {bookmarkedCount}
                  </span>
                )}
              </button>
              
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700 font-medium">{user.name}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setCurrentView('home');
                setIsMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView('scholarships');
                setIsMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Scholarships
            </button>
            <button
              onClick={() => {
                setCurrentView('bookmarks');
                setIsMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 relative"
            >
              Bookmarks
              {bookmarkedCount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {bookmarkedCount}
                </span>
              )}
            </button>
            {user ? (
              <div className="border-t border-gray-200 pt-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};