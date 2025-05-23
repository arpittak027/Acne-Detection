import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Camera, 
  UploadCloud, 
  Clock, 
  MessageSquare, 
  User,
  BarChart,
  Microscope,
  FileText
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  userRole: 'doctor' | 'patient';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, userRole }) => {
  const location = useLocation();
  
  const doctorNavItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'Patients', icon: <Users className="w-5 h-5" />, path: '/patients' },
    { name: 'Analyze Image', icon: <Microscope className="w-5 h-5" />, path: '/analyze' },
    { name: 'Analytics', icon: <BarChart className="w-5 h-5" />, path: '/analytics' },
    { name: 'Profile', icon: <User className="w-5 h-5" />, path: '/profile' }
  ];
  
  const patientNavItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'Capture Image', icon: <Camera className="w-5 h-5" />, path: '/capture' },
    { name: 'Upload Image', icon: <UploadCloud className="w-5 h-5" />, path: '/upload' },
    { name: 'History', icon: <Clock className="w-5 h-5" />, path: '/history' },
    { name: 'Consultations', icon: <MessageSquare className="w-5 h-5" />, path: '/consultations' },
    { name: 'Treatment Plan', icon: <FileText className="w-5 h-5" />, path: '/treatment' },
    { name: 'Profile', icon: <User className="w-5 h-5" />, path: '/profile' }
  ];
  
  const navItems = userRole === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <aside 
      className={`bg-white dark:bg-gray-800 shadow-md z-20 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      } h-full flex flex-col`}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center">
          {isOpen ? (
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">DermAI</span>
          ) : (
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">D</span>
          )}
        </Link>
      </div>
      
      <nav className="mt-5 flex-1 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <div className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</div>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className={`flex ${isOpen ? 'items-start' : 'justify-center'}`}>
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="User"
            />
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {userRole === 'doctor' ? 'Dr. Sarah' : 'Alex Smith'}
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {userRole === 'doctor' ? 'Dermatologist' : 'Patient'}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;