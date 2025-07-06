import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { HomePage } from './views/HomePage';
import { ScholarshipsPage } from './views/ScholarshipsPage';
import { BookmarksPage } from './views/BookmarksPage';
import { mockScholarships } from './data/scholarships';
import { Scholarship, User, ViewType } from './types';

function App() {
  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarships);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = !selectedBranch || scholarship.branch === selectedBranch;
    const matchesGender = !selectedGender || scholarship.gender === selectedGender || scholarship.gender === 'Any';
    const matchesCategory = !selectedCategory || scholarship.category === selectedCategory;
    
    return matchesSearch && matchesBranch && matchesGender && matchesCategory;
  });

  const bookmarkedScholarships = scholarships.filter(s => s.isBookmarked);

  const toggleBookmark = (id: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    setScholarships(prev => 
      prev.map(scholarship => 
        scholarship.id === id 
          ? { ...scholarship, isBookmarked: !scholarship.isBookmarked }
          : scholarship
      )
    );
  };

  const handleLogin = (email: string, name: string) => {
    setUser({ email, name });
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
  };

  const branches = [...new Set(scholarships.map(s => s.branch))];
  const genders = [...new Set(scholarships.map(s => s.gender))];
  const categories = [...new Set(scholarships.map(s => s.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
        setIsAuthModalOpen={setIsAuthModalOpen}
        handleLogout={handleLogout}
        bookmarkedCount={bookmarkedScholarships.length}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
      />

      <main>
        {currentView === 'home' && (
          <HomePage
            scholarships={scholarships}
            setCurrentView={setCurrentView}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {currentView === 'scholarships' && (
          <ScholarshipsPage
            scholarships={scholarships}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            onToggleBookmark={toggleBookmark}
            filteredScholarships={filteredScholarships}
            branches={branches}
            genders={genders}
            categories={categories}
          />
        )}

        {currentView === 'bookmarks' && (
          <BookmarksPage
            user={user}
            bookmarkedScholarships={bookmarkedScholarships}
            setCurrentView={setCurrentView}
            setIsAuthModalOpen={setIsAuthModalOpen}
            onToggleBookmark={toggleBookmark}
          />
        )}
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;