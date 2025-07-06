import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { FilterPanel } from '../components/FilterPanel';
import { Scholarship } from '../types';

interface ScholarshipsPageProps {
  scholarships: Scholarship[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  onToggleBookmark: (id: string) => void;
  filteredScholarships: Scholarship[];
  branches: string[];
  genders: string[];
  categories: string[];
}

export const ScholarshipsPage: React.FC<ScholarshipsPageProps> = ({
  searchTerm,
  setSearchTerm,
  selectedBranch,
  setSelectedBranch,
  selectedGender,
  setSelectedGender,
  selectedCategory,
  setSelectedCategory,
  isFilterOpen,
  setIsFilterOpen,
  onToggleBookmark,
  filteredScholarships,
  branches,
  genders,
  categories
}) => {
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedBranch('');
    setSelectedGender('');
    setSelectedCategory('');
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Scholarship</h1>
          <p className="text-lg text-gray-600">Explore thousands of scholarships tailored for Indian students</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search scholarships by title, organization, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
            />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden w-full bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-between mb-4"
            >
              <span className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </span>
              <span className="text-sm text-gray-500">
                {[selectedBranch, selectedGender, selectedCategory].filter(Boolean).length} active
              </span>
            </button>
            <FilterPanel 
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              branches={branches}
              genders={genders}
              categories={categories}
            />
          </div>
          
          {/* Scholarship Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredScholarships.length} Scholarships Found
              </h2>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Deadline (Earliest)</option>
                <option>Amount (Highest)</option>
                <option>Applicants (Fewest)</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredScholarships.map(scholarship => (
                <ScholarshipCard 
                  key={scholarship.id} 
                  scholarship={scholarship} 
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
            
            {filteredScholarships.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No scholarships found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button 
                  onClick={clearAllFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};