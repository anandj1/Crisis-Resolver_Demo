import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Community Crisis Solver
            </span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link
              to="/report"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Report Issue
            </Link>
            
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-gray-600 hover:text-gray-900"
              >
                Admin Dashboard
              </Link>
            )}
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">{user?.name}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};