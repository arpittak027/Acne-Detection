import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ImageUpload from '../../components/ImageUpload';
import { createAnalysis, detectAcneFromImage } from '../../services/acneService';
import { AcneAnalysis } from '../../types/acne';
import AnalysisResult from '../../components/AnalysisResult';

const UploadImage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AcneAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleUpload = async (file: File, previewUrl: string) => {
    if (!user) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Simulate sending image to backend for analysis
      const detectionResult = await detectAcneFromImage(previewUrl);
      
      // Create a new analysis with the detection results
      const newAnalysis = await createAnalysis(
        user.id,
        previewUrl,
        detectionResult.severity,
        detectionResult.regions
      );
      
      setAnalysisResult(newAnalysis);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleNewUpload = () => {
    setAnalysisResult(null);
  };
  
  const viewHistory = () => {
    navigate('/history');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload Image</h1>
        <p className="text-gray-600 mt-1">
          Upload a photo of your skin for acne analysis
        </p>
      </div>
      
      {error && (
        <div className="mb-6 bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm">
        {!isAnalyzing && !analysisResult ? (
          <div className="p-6">
            <ImageUpload onUpload={handleUpload} />
          </div>
        ) : isAnalyzing ? (
          <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="animate-pulse flex space-x-2">
                <div className="h-3 w-3 bg-primary-600 rounded-full"></div>
                <div className="h-3 w-3 bg-primary-600 rounded-full animation-delay-200"></div>
                <div className="h-3 w-3 bg-primary-600 rounded-full animation-delay-400"></div>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Analyzing your skin</h3>
            <p className="mt-2 text-sm text-gray-500">
              Our AI is detecting acne and determining severity. This may take a moment...
            </p>
          </div>
        ) : analysisResult ? (
          <div className="p-6">
            <AnalysisResult analysis={analysisResult} />
            <div className="mt-6 flex justify-between">
              <button 
                onClick={handleNewUpload}
                className="btn-outline"
              >
                Upload Another Image
              </button>
              <button 
                onClick={viewHistory}
                className="btn-primary"
              >
                View History
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UploadImage;