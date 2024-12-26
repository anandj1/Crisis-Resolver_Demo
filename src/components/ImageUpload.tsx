import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { uploadService } from '../services/upload';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  previewUrl: string | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);
      const imageUrl = await uploadService.uploadImage(file);
      onImageSelect(imageUrl);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Camera className="w-5 h-5 text-gray-500" />
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isUploading
            ? 'border-gray-400 bg-gray-50'
            : 'border-gray-300 hover:border-blue-500'
        }`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="mx-auto h-48 w-full object-cover rounded-md"
          />
        ) : (
          <div className="space-y-2">
            <Camera className="w-12 h-12 text-gray-400 mx-auto" />
            <p className="text-sm text-gray-500">
              {isUploading
                ? 'Uploading...'
                : 'Click to upload or drag and drop'}
            </p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};