import React, { useState } from 'react';
import { User, Edit2, Lock, Shield, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    bio: user?.role === 'doctor' 
      ? 'Board-certified dermatologist with 10+ years of experience specializing in acne treatment.'
      : 'Looking to improve my skin health and track my progress over time.'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4 bg-white rounded-lg shadow-sm mb-6 md:mb-0 md:mr-6">
          <div className="flex flex-col items-center p-4 border-b border-gray-200 pb-6">
            <img
              src={user?.profileImage || 'https://www.google.com/imgres?q=phineas%20&imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fphineasandferb%2Fimages%2Fe%2Fea%2FProfile_-_Phineas_Flynn.PNG%2Frevision%2Flatest%3Fcb%3D20200401182458&imgrefurl=https%3A%2F%2Fphineasandferb.fandom.com%2Fwiki%2FPhineas_Flynn&docid=q6qpvy-gcOtcXM&tbnid=LsHA5Rz8FvzlJM&vet=12ahUKEwiEyouFssmNAxWyZfUHHWCCCRwQM3oECBoQAA..i&w=690&h=717&hcb=2&itg=1&ved=2ahUKEwiEyouFssmNAxWyZfUHHWCCCRwQM3oECBoQAA'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4"
            />
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {user?.role === 'doctor' ? 'Dermatologist' : 'Patient'}
            </span>
            <button className="mt-4 btn-outline text-sm">
              Change photo
            </button>
          </div>
          
          <nav className="mt-6 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'profile'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <User className="mr-3 h-5 w-5" />
              <span>Profile Information</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'security'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Lock className="mr-3 h-5 w-5" />
              <span>Security</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'notifications'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bell className="mr-3 h-5 w-5" />
              <span>Notifications</span>
            </button>
          </nav>
        </div>
        
        <div className="md:w-2/3 bg-white rounded-lg shadow-sm p-6 animate-fade-in">
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Profile Information</h3>
                <button className="btn-outline text-sm flex items-center">
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  {user?.role === 'doctor' && (
                    <div>
                      <label htmlFor="specialty" className="label">
                        Specialty
                      </label>
                      <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        defaultValue="Dermatology"
                        className="input"
                        disabled
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="bio" className="label">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="input resize-none"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <Shield className="h-5 w-5 text-primary-600" />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="current-password" className="label">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="new-password" className="label">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-md font-medium mb-4">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <button className="btn-outline">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <Bell className="h-5 w-5 text-primary-600" />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-4">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="email-analysis"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="email-analysis" className="ml-2 block text-sm text-gray-700">
                        {user?.role === 'doctor' ? 'New analysis requests' : 'Analysis results'}
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="email-messages"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="email-messages" className="ml-2 block text-sm text-gray-700">
                        New messages
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="email-updates"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="email-updates" className="ml-2 block text-sm text-gray-700">
                        {user?.role === 'doctor' ? 'Platform updates' : 'Treatment plan updates'}
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-md font-medium mb-4">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="push-analysis"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="push-analysis" className="ml-2 block text-sm text-gray-700">
                        {user?.role === 'doctor' ? 'New analysis requests' : 'Analysis results'}
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-messages"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="push-messages" className="ml-2 block text-sm text-gray-700">
                        New messages
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-reminders"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="push-reminders" className="ml-2 block text-sm text-gray-700">
                        {user?.role === 'doctor' ? 'Appointment reminders' : 'Treatment reminders'}
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
