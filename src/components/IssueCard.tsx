import React from 'react';
import { MapPin, Calendar, AlertCircle } from 'lucide-react';
import { Issue } from '../types';
import { format } from 'date-fns';

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
}

const priorityColors = {
  urgent: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
};

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            priorityColors[issue.priority]
          }`}
        >
          {issue.priority}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
      
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{issue.location.address}</span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{format(issue.createdAt, 'MMM d, yyyy')}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[issue.status]
          }`}
        >
          {issue.status}
        </span>
        
        {issue.priority === 'urgent' && (
          <AlertCircle className="w-5 h-5 text-red-500" />
        )}
      </div>
    </div>
  );
};