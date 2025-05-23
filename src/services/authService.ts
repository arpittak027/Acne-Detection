import { User } from '../types/user';

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@example.com',
    role: 'doctor',
    profileImage: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Alex Smith',
    email: 'patient@example.com',
    role: 'patient',
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

// Mock login function
export const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // In a real app, we would verify the password here
  
  return user;
};

// Mock register function
export const mockRegister = async (
  email: string,
  password: string,
  name: string,
  role: 'doctor' | 'patient'
): Promise<User> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (mockUsers.some(u => u.email === email)) {
    throw new Error('Email already in use');
  }
  
  // Create new user
  const newUser: User = {
    id: String(mockUsers.length + 1),
    name,
    email,
    role,
    profileImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  };
  
  mockUsers.push(newUser);
  
  return newUser;
};

// Mock logout function
export const mockLogout = async (): Promise<void> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, we would handle token invalidation here
  
  return;
};