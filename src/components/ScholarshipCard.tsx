import React from 'react';
import { Calendar, DollarSign, Users, Star, MapPin } from 'lucide-react';
import { Scholarship } from '../types';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onToggleBookmark: (id: string) => void;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship, onToggleBookmark }) => {
  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline(scholarship.deadline);
  const isUrgent = daysLeft <= 7;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div className="relative">
        <img 
          src={scholarship.image} 
          alt={scholarship.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={() => onToggleBookmark(scholarship.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              scholarship.isBookmarked 
                ? 'bg-yellow-500 text-white shadow-lg' 
                : 'bg-white/90 text-gray-700 hover:bg-yellow-100'
            }`}
          >
            <Star className={`w-5 h-5 ${scholarship.isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {scholarship.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {scholarship.title}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {scholarship.description}
        </p>
        
        {scholarship.location && (
          <div className="flex items-center gap-1 mb-3 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span>{scholarship.location}</span>
          </div>
        )}
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-green-700">{scholarship.amount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{scholarship.applicants} applicants</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Calendar className={`w-4 h-4 ${isUrgent ? 'text-red-500' : 'text-gray-500'}`} />
            <span className={`text-sm ${isUrgent ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
              {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
            </span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};