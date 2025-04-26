'use client'
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface Destination {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface DestinationSuggestionsProps {
  isOpen: boolean;
  onSelect: (destination: string) => void;
  onClose: () => void;
}

interface GeolocationResponse {
  success: boolean;
  location: {
    ip: string | null;
    city: string;
    countryRegion: string;
    country: string;
    latitude: number | null;
    longitude: number | null;
  };
  error?: string;
}

const DestinationSuggestions = ({ isOpen, onSelect, onClose }: DestinationSuggestionsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the suggestions modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    // Add event listener when the suggestions are open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener on unmount or when isOpen changes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  const fetchUserLocation = async () => {
    setIsLoading(true);
    try {
      // Use fetch instead of axios to avoid potential compatibility issues
      const response = await fetch('/api/geolocation');
      const data: GeolocationResponse = await response.json();
      
      console.log('API response:', data);
      
      if (data.success && data.location) {
        console.log('User location:', data.location);
        
        // If we have a city, use it as the selected destination
        if (data.location.city !== 'Unknown') {
          const locationString = `${data.location.city}, ${data.location.countryRegion}`;
          onSelect(locationString);
        } else {
          // Fallback if we don't have city information
          onSelect('Nearby location');
        }
      } else {
        console.warn('Location API returned success: false', data.error);
        onSelect('Nearby location');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      onSelect('Nearby location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNearbyClick = () => {
    fetchUserLocation();
  };

  const destinations: Destination[] = [
    {
      id: 'nearby',
      name: 'Nearby',
      description: 'Find what\'s around you',
      icon: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
        </div>
      )
    },

  ];

  const handleSelect = (destination: string, destinationId: string) => {
    // For the "nearby" option, fetch user location
    if (destinationId === 'nearby') {
      if (isLoading) {
        console.log('Already fetching location, please wait...');
        return;
      }
      handleNearbyClick();
    } else {
      onSelect(destination);
      onClose();
    }
  };

  return (
    <div 
      ref={suggestionsRef}
      className="absolute z-10 mt-2 w-full bg-white rounded-2xl shadow-lg p-6 max-h-[80vh] overflow-y-auto"
    >
      <h3 className="text-lg font-semibold mb-5">Business location</h3>
      <div className="space-y-5">
        {destinations.map((destination) => (
          <div 
            key={destination.id}
            className={`flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${destination.id === 'nearby' && isLoading ? 'opacity-50' : ''}`}
            onClick={() => handleSelect(destination.name, destination.id)}
          >
            {destination.icon}
            <div>
              <div className="font-medium text-base">
                {destination.name}
                {destination.id === 'nearby' && isLoading && ' (loading...)'}
              </div>
              <div className="text-gray-500 text-sm mt-0.5">{destination.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationSuggestions; 