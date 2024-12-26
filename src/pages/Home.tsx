import React from 'react';
import { IssueCard } from '../components/IssueCard';
import { useIssueStore } from '../store/issueStore';
import { Search, Filter } from 'lucide-react';

export const Home: React.FC = () => {
  const issues = useIssueStore((state) => state.issues);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Community Issues</h1>
        
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search issues..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
        
        {issues.length === 0 && (
          <div className="col-span-full text-center py-12">
            <img
              src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80"
              alt="No issues"
              className="w-48 h-48 mx-auto mb-4 rounded-full object-cover"
            />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Issues Reported Yet
            </h3>
            <p className="text-gray-500">
              Be the first to report a community issue!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};