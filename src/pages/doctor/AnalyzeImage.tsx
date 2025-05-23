import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ImageUpload from '../../components/ImageUpload';
import { detectAcneFromImage, createAnalysis, updateAnalysis } from '../../services/acneService';
import { AcneAnalysis } from '../../types/acne';
import AnalysisResult from '../../components/AnalysisResult';

const AnalyzeImage: React.FC = () => {
  const { user } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AcneAnalysis | null>(null);
  const [patientId, setPatientId] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const handleUpload = async (file: File, previewUrl: string) => {
    if (!user) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Simulate sending image to backend for analysis
      const detectionResult = await detectAcneFromImage(previewUrl);
      
      // Create a temporary analysis result
      const tempAnalysis: AcneAnalysis = {
        id: 'temp',
        patientId: '',
        doctorId: user.id,
        imageUrl: previewUrl,
        date: new Date().toISOString(),
        severity: detectionResult.severity,
        regions: detectionResult.regions.map((region, index) => ({
          id: `temp-${index}`,
          ...region,
          type: region.type as any
        })),
        status: 'pending'
      };
      
      setAnalysisResult(tempAnalysis);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setPatientId('');
    setNotes('');
  };
  
  const saveAnalysis = async () => {
    if (!user || !analysisResult) return;
    
    if (!patientId) {
      setError('Please enter a patient ID');
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Create a new analysis for the patient
      const newAnalysis = await createAnalysis(
        patientId,
        analysisResult.imageUrl,
        analysisResult.severity,
        analysisResult.regions.map(r => ({
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          type: r.type,
          confidence: r.confidence
        }))
      );
      
      // Update with doctor ID and notes
      const updatedAnalysis = await updateAnalysis(newAnalysis.id, {
        doctorId: user.id,
        notes,
        status: 'reviewed'
      });
      
      setAnalysisResult(updatedAnalysis);
      setError('Analysis saved successfully!');
    } catch (err) {
      console.error('Error saving analysis:', err);
      setError('Failed to save analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analyze Patient Image</h1>
        <p className="text-gray-600 mt-1">
          Upload and analyze a patient's skin image
        </p>
      </div>
      
      {error && (
        <div className={`mb-6 ${error.includes('successfully') ? 'bg-success-50 border-success-200 text-success-700' : 'bg-danger-50 border-danger-200 text-danger-700'} border px-4 py-3 rounded relative`} role="alert">
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
            <h3 className="text-lg font-medium text-gray-900">Analyzing patient skin</h3>
            <p className="mt-2 text-sm text-gray-500">
              Our AI is detecting acne and determining severity. This may take a moment...
            </p>
          </div>
        ) : analysisResult ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <AnalysisResult analysis={analysisResult} />
              </div>
              <div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Patient Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="patientId" className="label">
                        Patient ID
                      </label>
                      <input
                        type="text"
                        id="patientId"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="input"
                        placeholder="Enter patient ID"
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className="label">
                        Doctor's Notes
                      </label>
                      <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="input resize-none"
                        rows={5}
                        placeholder="Add your analysis notes here"
                      />
                    </div>
                    <div className="pt-2 flex flex-col space-y-2">
                      <button 
                        onClick={saveAnalysis}
                        className="btn-primary"
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? 'Saving...' : 'Save Analysis'}
                      </button>
                      <button 
                        onClick={handleNewAnalysis}
                        className="btn-outline"
                      >
                        Start New Analysis
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AnalyzeImage;