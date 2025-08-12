'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

// Icons for each service type
const getServiceIcon = (serviceName: string) => {
  // Map service names to appropriate icons
  switch (serviceName.toLowerCase()) {
    case 'hair salon':
    case 'hair stylist':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.5 4C16.56 4 18 5.83 18 10C18 16 12 17 12 17C12 17 6 16 6 10C6 5.83 7.44 4 9.5 4C11.1 4 12 5 12 5C12 5 12.9 4 14.5 4Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 18C20 19.657 16.418 21 12 21C7.582 21 4 19.657 4 18" />
        </svg>
      );
    case 'nails':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 11H19V21H5V11Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 16C10.1046 16 11 15.1046 11 14C11 12.8954 10.1046 12 9 12C7.89543 12 7 12.8954 7 14C7 15.1046 7.89543 16 9 16Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 16C16.1046 16 17 15.1046 17 14C17 12.8954 16.1046 12 15 12C13.8954 12 13 12.8954 13 14C13 15.1046 13.8954 16 15 16Z" />
        </svg>
      );
    case 'lash tech':
    case 'lash techs':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8C7.5 8 7 9.1 7 12C7 14.9 7.5 16 7.5 16" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 8C16.5 8 17 9.1 17 12C17 14.9 16.5 16 16.5 16" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.5V19.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5V5.5" />
        </svg>
      );
    case 'makeup':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 14.5C6 14.5 6 19 12 19C18 19 18 14.5 18 14.5V10.5C18 10.5 18 6 12 6C6 6 6 10.5 6 10.5V14.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6C12 6 9 3 9 4C9 5 10 6 10 6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6C12 6 15 3 15 4C15 5 14 6 14 6" />
        </svg>
      );
    case 'tan':
    case 'spray tan':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4V20" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12H20" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.05025 7.05025L16.9497 16.9497" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.9497 7.05025L7.05025 16.9497" />
        </svg>
      );
    case 'braider':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 4C9 4 5 6 5 12C5 18 9 20 9 20" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 4C15 4 19 6 19 12C19 18 15 20 15 20" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5V19" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 9C15 9 12 11 12 12C12 13 15 15 15 15" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9C9 9 12 11 12 12C12 13 9 15 9 15" />
        </svg>
      );
    case 'eyebrow':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12C2 12 5.5 7 12 7C18.5 7 22 12 22 12" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
        </svg>
      );
    case 'waxing':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 14C20 18.4183 16.4183 22 12 22C7.58172 22 4 18.4183 4 14C4 9.58172 7.58172 6 12 6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6C12 6 14.5 3.5 15.5 2.5C16.5 1.5 18 2 18 3C18 4 17 8 12 6Z" />
        </svg>
      );
    case 'tooth gem':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3L14.5 5L17 3L19.5 5L17 7.5L19.5 10L17 12.5L14.5 10L12 12.5L9.5 10L7 12.5L4.5 10L7 7.5L4.5 5L7 3L9.5 5L12 3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 13C12 13 7 14 7 18C7 19.657 9.23858 21 12 21C14.7614 21 17 19.657 17 18C17 14 12 13 12 13Z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

// Mock data for testing - replace with actual API call
const mockServices: Service[] = [
  { id: '1', name: 'Hair salon', description: 'Hair styling services', created_at: new Date().toISOString() },
  { id: '2', name: 'Nails', description: 'Nail services', created_at: new Date().toISOString() },
  { id: '3', name: 'Makeup', description: 'Makeup services', created_at: new Date().toISOString() },
  { id: '4', name: 'Braider', description: 'Hair braiding services', created_at: new Date().toISOString() },
  { id: '5', name: 'Tan', description: 'Tanning services', created_at: new Date().toISOString() },
  { id: '6', name: 'Lash Tech', description: 'Eyelash services', created_at: new Date().toISOString() },
  { id: '7', name: 'Eyebrow', description: 'Eyebrow services', created_at: new Date().toISOString() },
  { id: '8', name: 'Waxing', description: 'Waxing services', created_at: new Date().toISOString() },
  { id: '9', name: 'Tooth Gem', description: 'Tooth gem services', created_at: new Date().toISOString() },
];

const ServiceCategories = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        
        // Fetch services from Supabase
        const { data, error } = await supabase
          .from('services')
          .select('id, name, description, created_at')
          .order('name');
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setServices(data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        // Fallback to mock data in development for testing
        if (process.env.NODE_ENV === 'development') {
          setServices(mockServices);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-3xl shadow-sm flex justify-center">
        <div className="animate-pulse">Loading services...</div>
      </div>
    );
  }

  if (error && services.length === 0) {
    return (
      <div className="p-6 bg-white rounded-3xl shadow-sm">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Services and Businesses</h2>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-8 min-w-max">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md mb-3 transition-transform hover:scale-105 cursor-pointer">
                {getServiceIcon(service.name)}
              </div>
              <span className="text-sm text-gray-600">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategories; 