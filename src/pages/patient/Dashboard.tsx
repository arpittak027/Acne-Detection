import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  UploadCloud, 
  Clock, 
  ChevronRight, 
  Activity, 
  FileText, 
  AlertTriangle 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getPatientAnalyses, getPatientTreatmentPlans } from '../../services/acneService';
import { AcneAnalysis, TreatmentPlan } from '../../types/acne';
import AnalysisResult from '../../components/AnalysisResult';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<AcneAnalysis[]>([]);
  const [treatments, setTreatments] = useState<TreatmentPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const [analysisData, treatmentData] = await Promise.all([
            getPatientAnalyses(user.id),
            getPatientTreatmentPlans(user.id)
          ]);
          
          setAnalyses(analysisData);
          setTreatments(treatmentData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  const getSeverityTrend = (): 'improving' | 'stable' | 'worsening' | null => {
    if (analyses.length < 2) return null;
    
    const sortedAnalyses = [...analyses].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const latestSeverity = sortedAnalyses[0].severity;
    const previousSeverity = sortedAnalyses[1].severity;
    
    const severityRank = {
      'mild': 1,
      'moderate': 2,
      'severe': 3
    };
    
    if (severityRank[latestSeverity] < severityRank[previousSeverity]) {
      return 'improving';
    } else if (severityRank[latestSeverity] > severityRank[previousSeverity]) {
      return 'worsening';
    } else {
      return 'stable';
    }
  };
  
  const getTrendColor = () => {
    const trend = getSeverityTrend();
    switch (trend) {
      case 'improving':
        return 'text-success-600';
      case 'worsening':
        return 'text-danger-600';
      case 'stable':
      default:
        return 'text-gray-600';
    }
  };
  
  const getTrendIcon = () => {
    const trend = getSeverityTrend();
    switch (trend) {
      case 'improving':
        return <span className="text-success-600">↓</span>;
      case 'worsening':
        return <span className="text-danger-600">↑</span>;
      case 'stable':
      default:
        return <span className="text-gray-600">→</span>;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.name}
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-2">
            <div className="h-3 w-3 bg-primary-600 rounded-full"></div>
            <div className="h-3 w-3 bg-primary-600 rounded-full animation-delay-200"></div>
            <div className="h-3 w-3 bg-primary-600 rounded-full animation-delay-400"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link to="/capture" className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                    <Camera className="h-6 w-6 text-primary-700" />
                  </div>
                  <span className="text-sm font-medium text-primary-700">Capture Image</span>
                </Link>
                <Link to="/upload" className="flex flex-col items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-3">
                    <UploadCloud className="h-6 w-6 text-secondary-700" />
                  </div>
                  <span className="text-sm font-medium text-secondary-700">Upload Image</span>
                </Link>
                <Link to="/history" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-gray-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">View History</span>
                </Link>
              </div>
            </div>
            
            {/* Latest Analysis */}
            {analyses.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Latest Analysis</h2>
                  <Link to="/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                    View all <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                <div className="p-4">
                  <AnalysisResult analysis={analyses[0]} isPreview={true} />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="h-12 w-12 text-warning-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No analyses yet</h3>
                <p className="mt-1 text-gray-500">
                  Start by capturing or uploading an image of your skin to analyze.
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                  <Link to="/capture" className="btn-primary">
                    Capture Image
                  </Link>
                  <Link to="/upload" className="btn-outline">
                    Upload Image
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Statistics</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Analyses</span>
                    <span className="text-lg font-medium">{analyses.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-primary-600 h-1.5 rounded-full" 
                      style={{ width: `${Math.min(analyses.length * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Current Severity</span>
                    {analyses.length > 0 ? (
                      <div className="flex items-center">
                        <span className="text-lg font-medium capitalize">
                          {analyses[0].severity}
                        </span>
                        <span className="ml-2 text-sm font-medium">
                          {getSeverityTrend() && (
                            <span className={getTrendColor()}>
                              {getTrendIcon()}
                            </span>
                          )}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-medium">-</span>
                    )}
                  </div>
                  {analyses.length > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          analyses[0].severity === 'mild' 
                            ? 'bg-success-500 w-1/3' 
                            : analyses[0].severity === 'moderate' 
                            ? 'bg-warning-500 w-2/3' 
                            : 'bg-danger-500 w-full'
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Active Treatments</span>
                    <span className="text-lg font-medium">
                      {treatments.filter(t => t.status === 'active').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Treatment Plan */}
            {treatments.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Current Treatment Plan</h2>
                <div className="space-y-4">
                  <h3 className="text-md font-medium">{treatments[0].title}</h3>
                  <p className="text-sm text-gray-600">{treatments[0].description}</p>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Medications</h4>
                    <ul className="space-y-2">
                      {treatments[0].medications.map((med, index) => (
                        <li key={index} className="bg-gray-50 p-3 rounded-md">
                          <div className="font-medium text-gray-800">{med.name}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {med.dosage}, {med.frequency}, for {med.duration}
                          </div>
                          {med.notes && (
                            <div className="text-xs text-gray-500 mt-1">
                              Note: {med.notes}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Lifestyle Recommendations</h4>
                    <ul className="space-y-1">
                      {treatments[0].lifestyle.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary-500 mr-2">•</span>
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {treatments[0].followUpDate && (
                    <div className="bg-primary-50 p-3 rounded-md text-sm">
                      <div className="font-medium text-primary-800">Next Follow-up</div>
                      <div className="text-primary-700">
                        {new Date(treatments[0].followUpDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <Link to="/treatment" className="btn-primary w-full flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Treatment Plan
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Treatment Plan</h2>
                <div className="text-center py-6">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-gray-700 font-medium">No active treatment plan</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Complete your first analysis to receive a treatment plan.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;