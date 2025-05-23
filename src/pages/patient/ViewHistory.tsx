import React from 'react';

const ViewHistory: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Medical History</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <p className="text-gray-600">Your medical history and previous consultations will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default ViewHistory;