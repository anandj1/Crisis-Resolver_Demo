import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon } from 'lucide-react';
import { Category, Priority } from '../types';
import { useIssueStore } from '../store/issueStore';
import { LocationPicker } from '../components/LocationPicker';
import { ImageUpload } from '../components/ImageUpload';

export const ReportIssue: React.FC = () => {
  const navigate = useNavigate();
  const addIssue = useIssueStore((state) => state.addIssue);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as Category,
    priority: '' as Priority,
    address: '',
    imageUrl: '',
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newIssue = {
      id: crypto.randomUUID(),
      ...formData,
      status: 'pending' as const,
      location: {
        lat: coordinates.lat,
        lng: coordinates.lng,
        address: formData.address,
      },
      reporterId: 'user-1', // In real app, get from auth
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addIssue(newIssue);
    navigate('/');
  };

  const handleImageSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <AlertOctagon className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Report an Issue</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as Category }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="road">Road</option>
              <option value="waste">Waste</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value as Priority }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <LocationPicker
            address={formData.address}
            onAddressChange={(address) => setFormData((prev) => ({ ...prev, address }))}
            onCoordinatesChange={(lat, lng) => setCoordinates({ lat, lng })}
          />

          <ImageUpload
            onImageSelect={handleImageSelect}
            previewUrl={previewUrl}
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};