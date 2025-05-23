import React from 'react';
import { Activity, Users, FileImage } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Doctor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Consultations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Activity className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Active Consultations</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600 mt-2">Ongoing patient cases</p>
        </div>

        {/* Total Patients */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Total Patients</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-600 mt-2">Registered patients</p>
        </div>

        {/* Analyzed Images */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <FileImage className="h-8 w-8 text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Analyzed Images</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">483</p>
          <p className="text-sm text-gray-600 mt-2">Total images analyzed</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                patient: "Sarah Johnson",
                action: "New consultation request",
                time: "10 minutes ago"
              },
              {
                patient: "Michael Chen",
                action: "Uploaded new image for analysis",
                time: "1 hour ago"
              },
              {
                patient: "Emily Williams",
                action: "Updated treatment progress",
                time: "2 hours ago"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.patient}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;