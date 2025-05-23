import React, { useState } from 'react';
import { MessageSquare, Calendar, Clock, ChevronRight, Plus } from 'lucide-react';

interface ConsultationRequest {
  id: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  type: 'followup' | 'initial' | 'emergency';
  notes?: string;
}

const ConsultationRequests: React.FC = () => {
  const [requests, setRequests] = useState<ConsultationRequest[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-02-20',
      time: '10:00 AM',
      status: 'pending',
      type: 'followup',
      notes: 'Follow-up consultation for acne treatment progress'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      date: '2024-02-22',
      time: '2:30 PM',
      status: 'approved',
      type: 'initial',
      notes: 'Initial consultation for skin assessment'
    }
  ]);

  const getStatusBadgeClass = (status: ConsultationRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: ConsultationRequest['type']) => {
    switch (type) {
      case 'followup':
        return 'Follow-up Consultation';
      case 'initial':
        return 'Initial Consultation';
      case 'emergency':
        return 'Emergency Consultation';
      default:
        return 'Consultation';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultation Requests</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your consultation requests and appointments
          </p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {requests.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {requests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {request.doctorName}
                      </h3>
                      <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {getTypeLabel(request.type)}
                    </p>
                    {request.notes && (
                      <p className="mt-2 text-sm text-gray-600">
                        {request.notes}
                      </p>
                    )}
                    <div className="mt-3 flex items-center space-x-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {request.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {request.time}
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center text-sm text-primary-600 hover:text-primary-700">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                {request.status === 'approved' && (
                  <div className="mt-4 flex">
                    <button className="btn-primary flex items-center text-sm">
                      <MessageSquare className="w-4 h-4 mr-1.5" />
                      Start Consultation
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No consultation requests</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new consultation request.
            </p>
            <div className="mt-6">
              <button className="btn-primary flex items-center mx-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationRequests;