import React, { useState, useRef } from 'react';
import { UploadCloud, X, FileImage } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (file: File, previewUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file (jpg, jpeg, png)');
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }
    
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const confirmUpload = () => {
    if (file && previewUrl) {
      onUpload(file, previewUrl);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!previewUrl ? (
        <div
          className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-colors ${
            dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          <UploadCloud className={`w-12 h-12 mb-3 ${dragActive ? 'text-primary-500' : 'text-gray-400'}`} />
          <p className="text-lg font-medium text-gray-700">
            Drag & drop your image here
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or click to browse files
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Supports: JPG, JPEG, PNG (max 10MB)
          </p>
        </div>
      ) : (
        <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <div className="relative">
            <img src={previewUrl} alt="Preview" className="w-full h-auto" />
            <button
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              onClick={clearImage}
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-center">
              <FileImage className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700 truncate">
                {file?.name}
              </span>
              <span className="text-xs text-gray-500 ml-auto">
                {file && (file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            <button
              className="w-full mt-3 btn-primary"
              onClick={confirmUpload}
            >
              Analyze Image
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-4 bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-primary-800">For best results:</h3>
        <ul className="mt-2 text-sm text-primary-700 list-disc pl-5 space-y-1">
          <li>Upload a clear, well-lit photo of the affected area</li>
          <li>Ensure the image is in focus and not blurry</li>
          <li>Remove any makeup or skincare products before taking the photo</li>
          <li>Include only the areas with acne in the frame</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;