import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Save, Maximize, Minimize } from 'lucide-react';

interface ImageCaptureProps {
  onCapture: (imageSrc: string) => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);
  
  const retake = () => {
    setCapturedImage(null);
  };
  
  const saveImage = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };
  
  const toggleCamera = () => {
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
  };
  
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode
  };

  return (
    <div className={`flex flex-col items-center ${isFullScreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div className={`relative ${isFullScreen ? 'w-full h-full flex items-center justify-center' : 'w-full max-w-2xl'}`}>
        {!capturedImage ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className={`w-full rounded-lg ${isFullScreen ? 'h-auto max-h-full' : ''}`}
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button 
                onClick={toggleCamera}
                className="p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all"
              >
                <RefreshCw className="w-5 h-5 text-gray-800" />
              </button>
              <button 
                onClick={toggleFullScreen}
                className="p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all"
              >
                {isFullScreen ? (
                  <Minimize className="w-5 h-5 text-gray-800" />
                ) : (
                  <Maximize className="w-5 h-5 text-gray-800" />
                )}
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={capture}
                className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
              >
                <Camera className="w-8 h-8 text-primary-600" />
              </button>
            </div>
          </>
        ) : (
          <>
            <img 
              src={capturedImage} 
              alt="Captured" 
              className={`w-full rounded-lg ${isFullScreen ? 'h-auto max-h-full' : ''}`}
            />
            <div className="absolute top-4 right-4">
              <button 
                onClick={toggleFullScreen}
                className="p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all"
              >
                {isFullScreen ? (
                  <Minimize className="w-5 h-5 text-gray-800" />
                ) : (
                  <Maximize className="w-5 h-5 text-gray-800" />
                )}
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button
                onClick={retake}
                className="flex items-center justify-center px-4 py-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition-all"
              >
                <RefreshCw className="w-5 h-5 mr-2 text-gray-700" />
                <span>Retake</span>
              </button>
              <button
                onClick={saveImage}
                className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md shadow-md hover:bg-primary-700 transition-all"
              >
                <Save className="w-5 h-5 mr-2" />
                <span>Use Photo</span>
              </button>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 w-full max-w-2xl">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-primary-800">Tips for better analysis:</h3>
          <ul className="mt-2 text-sm text-primary-700 list-disc pl-5 space-y-1">
            <li>Ensure good lighting on your face</li>
            <li>Position your face in the center of the frame</li>
            <li>Remove glasses, hats, or other accessories</li>
            <li>Use the front-facing camera for selfies or back camera with help</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageCapture;