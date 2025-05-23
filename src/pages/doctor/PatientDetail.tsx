import React from 'react';
import { useParams } from 'react-router-dom';

const PatientDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Patient Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Patient ID: {id}</p>
        {/* Additional patient details will be added here */}
      </div>
    </div>
  );
};

export default PatientDetail;