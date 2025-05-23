import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';

// Doctor pages
import DoctorDashboard from './pages/doctor/Dashboard';
import PatientList from './pages/doctor/PatientList';
import PatientDetail from './pages/doctor/PatientDetail';
import AnalyzeImage from './pages/doctor/AnalyzeImage';

// Patient pages
import PatientDashboard from './pages/patient/Dashboard';
import CaptureImage from './pages/patient/CaptureImage';
import UploadImage from './pages/patient/UploadImage';
import ViewHistory from './pages/patient/ViewHistory';
import ConsultationRequests from './pages/patient/ConsultationRequests';

// Shared pages
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

      {/* Protected Routes */}
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
        {/* Doctor Routes */}
        {user?.role === 'doctor' && (
          <>
            <Route index element={<DoctorDashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="patients/:id" element={<PatientDetail />} />
            <Route path="analyze" element={<AnalyzeImage />} />
          </>
        )}

        {/* Patient Routes */}
        {user?.role === 'patient' && (
          <>
            <Route index element={<PatientDashboard />} />
            <Route path="capture" element={<CaptureImage />} />
            <Route path="upload" element={<UploadImage />} />
            <Route path="history" element={<ViewHistory />} />
            <Route path="consultations" element={<ConsultationRequests />} />
          </>
        )}

        {/* Shared Routes */}
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;