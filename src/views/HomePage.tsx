import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { Scholarship, ViewType } from '../types';

interface HomePageProps {
  scholarships: Scholarship[];
  setCurrentView: (view: ViewType) => void;
  onToggleBookmark: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  scholarships, 
  setCurrentView, 
  onToggleBookmark 
}) => {
  return (
    <>
      <HeroSection setCurrentView={setCurrentView} />
      <StatsSection />
      
      {/* Featured Scholarships */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Scholarships</h2>
            <p className="text-lg text-gray-600">Handpicked opportunities for Indian students with upcoming deadlines</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.slice(0, 3).map(scholarship => (
              <ScholarshipCard 
                key={scholarship.id} 
                scholarship={scholarship} 
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentView('scholarships')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View All Scholarships
            </button>
          </div>
        </div>
      </div>
    </>
  );
};