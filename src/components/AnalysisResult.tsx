import React, { useRef, useEffect, useState } from 'react';
import { AcneAnalysis, AcneRegion } from '../types/acne';
import { Info, Download, ZoomIn, ZoomOut, Move, Eye, EyeOff } from 'lucide-react';

interface AnalysisResultProps {
  analysis: AcneAnalysis;
  isPreview?: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, isPreview = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  
  // Load image and set up canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = analysis.imageUrl;
    
    image.onload = () => {
      setImageLoaded(true);
      setImageSize({ width: image.width, height: image.height });
      
      // Set canvas size to match image
      canvas.width = image.width;
      canvas.height = image.height;
      
      // Draw image
      ctx.drawImage(image, 0, 0);
      
      // Draw detected regions if showing overlay
      if (showOverlay) {
        drawRegions(ctx, analysis.regions);
      }
    };
  }, [analysis.imageUrl, analysis.regions, showOverlay]);
  
  // Update canvas when zoom or position changes
  useEffect(() => {
    if (!imageLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set transform
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.scale(zoom, zoom);
    
    // Draw image
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = analysis.imageUrl;
    ctx.drawImage(image, 0, 0);
    
    // Draw detected regions if showing overlay
    if (showOverlay) {
      drawRegions(ctx, analysis.regions);
    }
    
    ctx.restore();
  }, [analysis.imageUrl, analysis.regions, zoom, position, showOverlay, imageLoaded]);
  
  const drawRegions = (ctx: CanvasRenderingContext2D, regions: AcneRegion[]) => {
    regions.forEach(region => {
      // Set styles based on acne type
      let color = '';
      switch (region.type) {
        case 'papule':
          color = 'rgba(255, 99, 71, 0.7)'; // tomato
          break;
        case 'pustule':
          color = 'rgba(255, 165, 0, 0.7)'; // orange
          break;
        case 'blackhead':
          color = 'rgba(128, 128, 128, 0.7)'; // gray
          break;
        case 'whitehead':
          color = 'rgba(255, 255, 224, 0.7)'; // light yellow
          break;
        case 'nodule':
          color = 'rgba(139, 0, 139, 0.7)'; // dark magenta
          break;
        case 'cyst':
          color = 'rgba(178, 34, 34, 0.7)'; // firebrick
          break;
        default:
          color = 'rgba(255, 0, 0, 0.7)'; // red
      }
      
      // Draw rectangle
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(region.x, region.y, region.width, region.height);
      
      // Fill with translucent color
      ctx.fillStyle = color;
      ctx.fillRect(region.x, region.y, region.width, region.height);
      
      // Add label
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.fillText(
        `${region.type} (${Math.round(region.confidence * 100)}%)`, 
        region.x, 
        region.y - 5
      );
    });
  };
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  const toggleOverlay = () => {
    setShowOverlay(prev => !prev);
  };
  
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a temporary link
    const link = document.createElement('a');
    link.download = `acne-analysis-${analysis.id}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const getSeverityColor = (severity: 'mild' | 'moderate' | 'severe') => {
    switch (severity) {
      case 'mild':
        return 'bg-success-100 text-success-800';
      case 'moderate':
        return 'bg-warning-100 text-warning-800';
      case 'severe':
        return 'bg-danger-100 text-danger-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Acne Analysis Results</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(analysis.severity)}`}>
            {analysis.severity.charAt(0).toUpperCase() + analysis.severity.slice(1)}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Analyzed on {formatDate(analysis.date)}
        </p>
      </div>
      
      <div className="relative bg-gray-100 border-b border-gray-200">
        <div
          className="overflow-hidden"
          style={{ height: isPreview ? '300px' : '500px' }}
        >
          <canvas
            ref={canvasRef}
            className="cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain' 
            }}
          />
        </div>
        
        {!isPreview && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-white rounded-full shadow-md px-2">
            <button
              onClick={handleZoomOut}
              className="p-2 text-gray-700 hover:text-gray-900"
              title="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="px-2 text-sm">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 text-gray-700 hover:text-gray-900"
              title="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-gray-300 mx-1"></div>
            <button
              onClick={toggleOverlay}
              className="p-2 text-gray-700 hover:text-gray-900"
              title={showOverlay ? "Hide detection overlay" : "Show detection overlay"}
            >
              {showOverlay ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-700 hover:text-gray-900"
              title="Download image"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Detected Acne Types</h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(analysis.regions.map(r => r.type))).map(type => (
              <span 
                key={type} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <span className="ml-1 text-gray-500">
                  ({analysis.regions.filter(r => r.type === type).length})
                </span>
              </span>
            ))}
          </div>
        </div>
        
        {analysis.notes && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Doctor's Notes</h4>
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
              {analysis.notes}
            </div>
          </div>
        )}
        
        {!isPreview && (
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Info className="w-4 h-4 mr-1" />
            <span>Drag to pan, use controls to zoom and toggle detection overlay</span>
          </div>
        )}
        
        {isPreview && (
          <div className="mt-3">
            <button className="btn-primary w-full">
              View Full Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResult;