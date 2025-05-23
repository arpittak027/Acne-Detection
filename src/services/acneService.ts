import { AcneAnalysis, TreatmentPlan } from '../types/acne';

// Mock data for demonstration
const mockAnalyses: AcneAnalysis[] = [
  {
    id: '1',
    patientId: '2',
    doctorId: '1',
    imageUrl: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2023-04-15T09:30:00Z',
    severity: 'moderate',
    regions: [
      {
        id: 'r1',
        x: 120,
        y: 80,
        width: 30,
        height: 30,
        confidence: 0.89,
        type: 'papule'
      },
      {
        id: 'r2',
        x: 200,
        y: 150,
        width: 25,
        height: 25,
        confidence: 0.92,
        type: 'pustule'
      }
    ],
    notes: 'Moderate inflammatory acne on cheeks and forehead.',
    status: 'reviewed'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '1',
    imageUrl: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2023-04-01T14:15:00Z',
    severity: 'severe',
    regions: [
      {
        id: 'r3',
        x: 150,
        y: 100,
        width: 35,
        height: 35,
        confidence: 0.95,
        type: 'cyst'
      },
      {
        id: 'r4',
        x: 220,
        y: 180,
        width: 28,
        height: 28,
        confidence: 0.91,
        type: 'nodule'
      }
    ],
    notes: 'Severe nodular acne on jawline. Consider oral medication.',
    status: 'reviewed'
  }
];

const mockTreatments: TreatmentPlan[] = [
  {
    id: '1',
    patientId: '2',
    doctorId: '1',
    title: 'Initial Treatment Plan',
    description: 'Treatment plan targeting moderate inflammatory acne.',
    createdAt: '2023-04-16T11:00:00Z',
    medications: [
      {
        name: 'Benzoyl Peroxide 2.5%',
        dosage: 'Pea-sized amount',
        frequency: 'Once daily before bed',
        duration: '12 weeks',
        notes: 'May cause dryness and peeling'
      },
      {
        name: 'Adapalene Gel 0.1%',
        dosage: 'Pea-sized amount',
        frequency: 'Every other night',
        duration: '12 weeks',
        notes: 'Apply to clean, dry skin'
      }
    ],
    lifestyle: [
      'Avoid dairy products',
      'Cleanse face twice daily with gentle cleanser',
      'Use non-comedogenic moisturizer',
      'Avoid touching face'
    ],
    followUpDate: '2023-05-16T10:00:00Z',
    status: 'active'
  }
];

// Get all analyses for a patient
export const getPatientAnalyses = async (patientId: string): Promise<AcneAnalysis[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockAnalyses.filter(analysis => analysis.patientId === patientId);
};

// Get a specific analysis by ID
export const getAnalysisById = async (analysisId: string): Promise<AcneAnalysis | undefined> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockAnalyses.find(analysis => analysis.id === analysisId);
};

// Create a new analysis
export const createAnalysis = async (
  patientId: string, 
  imageUrl: string, 
  severity: 'mild' | 'moderate' | 'severe',
  regions: { x: number; y: number; width: number; height: number; type: string; confidence: number }[]
): Promise<AcneAnalysis> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const newAnalysis: AcneAnalysis = {
    id: String(mockAnalyses.length + 1),
    patientId,
    imageUrl,
    date: new Date().toISOString(),
    severity,
    regions: regions.map((region, index) => ({
      id: `r${mockAnalyses.length + 1}-${index}`,
      x: region.x,
      y: region.y,
      width: region.width,
      height: region.height,
      confidence: region.confidence,
      type: region.type as any
    })),
    status: 'pending'
  };
  
  mockAnalyses.push(newAnalysis);
  
  return newAnalysis;
};

// Update an analysis
export const updateAnalysis = async (
  analysisId: string, 
  updates: Partial<AcneAnalysis>
): Promise<AcneAnalysis> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const index = mockAnalyses.findIndex(analysis => analysis.id === analysisId);
  
  if (index === -1) {
    throw new Error('Analysis not found');
  }
  
  mockAnalyses[index] = { ...mockAnalyses[index], ...updates };
  
  return mockAnalyses[index];
};

// Get treatment plans for a patient
export const getPatientTreatmentPlans = async (patientId: string): Promise<TreatmentPlan[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockTreatments.filter(plan => plan.patientId === patientId);
};

// Create a treatment plan
export const createTreatmentPlan = async (plan: Omit<TreatmentPlan, 'id' | 'createdAt'>): Promise<TreatmentPlan> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newPlan: TreatmentPlan = {
    ...plan,
    id: String(mockTreatments.length + 1),
    createdAt: new Date().toISOString()
  };
  
  mockTreatments.push(newPlan);
  
  return newPlan;
};

// Simulate acne detection from image
export const detectAcneFromImage = async (imageData: string): Promise<{
  regions: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
    confidence: number;
  }>;
  severity: 'mild' | 'moderate' | 'severe';
}> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock detection results
  return {
    regions: [
      {
        x: Math.floor(Math.random() * 300) + 50,
        y: Math.floor(Math.random() * 200) + 50,
        width: 30,
        height: 30,
        type: ['papule', 'pustule', 'blackhead', 'whitehead', 'nodule', 'cyst'][Math.floor(Math.random() * 6)],
        confidence: 0.8 + Math.random() * 0.19
      },
      {
        x: Math.floor(Math.random() * 300) + 50,
        y: Math.floor(Math.random() * 200) + 50,
        width: 25,
        height: 25,
        type: ['papule', 'pustule', 'blackhead', 'whitehead', 'nodule', 'cyst'][Math.floor(Math.random() * 6)],
        confidence: 0.8 + Math.random() * 0.19
      },
      {
        x: Math.floor(Math.random() * 300) + 50,
        y: Math.floor(Math.random() * 200) + 50,
        width: 28,
        height: 28,
        type: ['papule', 'pustule', 'blackhead', 'whitehead', 'nodule', 'cyst'][Math.floor(Math.random() * 6)],
        confidence: 0.8 + Math.random() * 0.19
      }
    ],
    severity: ['mild', 'moderate', 'severe'][Math.floor(Math.random() * 3)] as 'mild' | 'moderate' | 'severe'
  };
};