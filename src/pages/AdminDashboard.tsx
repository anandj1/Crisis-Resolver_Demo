import React from 'react';
import { useIssueStore } from '../store/issueStore';
import { IssueCard } from '../components/IssueCard';
import {
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const issues = useIssueStore((state) => state.issues);

  const stats = {
    totalIssues: issues.length,
    pendingIssues: issues.filter((i) => i.status === 'pending').length,
    resolvedIssues: issues.filter((i) => i.status === 'resolved').length,
    urgentIssues: issues.filter((i) => i.priority === 'urgent').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalIssues}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingIssues}</p>
            </div>
            <Users className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.urgentIssues}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.resolvedIssues}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.slice(0, 6).map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
};