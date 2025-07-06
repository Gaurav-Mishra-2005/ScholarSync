import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  branches: string[];
  genders: string[];
  categories: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isFilterOpen,
  setIsFilterOpen,
  selectedBranch,
  setSelectedBranch,
  selectedGender,
  setSelectedGender,
  selectedCategory,
  setSelectedCategory,
  branches,
  genders,
  categories
}) => {
  const clearFilters = () => {
    setSelectedBranch('');
    setSelectedGender('');
    setSelectedCategory('');
  };

  return (
    <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block bg-white rounded-2xl shadow-lg p-6 border border-gray-100`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="lg:hidden p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Branch</label>
          <select 
            value={selectedBranch} 
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Branches</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
          <select 
            value={selectedGender} 
            onChange={(e) => setSelectedGender(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Genders</option>
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={clearFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-colors duration-200 font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};