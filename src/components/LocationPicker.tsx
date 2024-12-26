import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationPickerProps {
  address: string;
  onAddressChange: (address: string) => void;
  onCoordinatesChange: (lat: number, lng: number) => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  address,
  onAddressChange,
  onCoordinatesChange,
}) => {
  // Simulated coordinates for demo
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    onAddressChange(newAddress);
    // Simulate coordinate changes (in real app, use geocoding)
    onCoordinatesChange(40.7128, -74.0060);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 mb-2">
        <MapPin className="w-5 h-5 text-gray-500" />
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
      </div>
      <input
        type="text"
        id="location"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter the issue location"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};