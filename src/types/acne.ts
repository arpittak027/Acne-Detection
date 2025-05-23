export interface AcneAnalysis {
  id: string;
  patientId: string;
  doctorId?: string;
  imageUrl: string;
  date: string;
  severity: 'mild' | 'moderate' | 'severe';
  regions: AcneRegion[];
  notes?: string;
  status: 'pending' | 'reviewed' | 'archived';
}

export interface AcneRegion {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  type: 'papule' | 'pustule' | 'blackhead' | 'whitehead' | 'nodule' | 'cyst';
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  doctorId: string;
  title: string;
  description: string;
  createdAt: string;
  medications: Medication[];
  lifestyle: string[];
  followUpDate?: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}