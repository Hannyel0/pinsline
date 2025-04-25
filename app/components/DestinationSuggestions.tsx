'use client'
import React, { useEffect, useState } from 'react';

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

const DestinationSuggestions = ({ isOpen, onSelect, onClose }: DestinationSuggestionsProps) => {
  if (!isOpen) return null;

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
    {
      id: 'nashville',
      name: 'Nashville, TN',
      description: 'For sights like Ryman Auditorium',
      icon: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4M9 9h1m0 4h1m4-4h1m0 4h1" />
          </svg>
        </div>
      )
    },
    {
      id: 'branson',
      name: 'Branson, MO',
      description: 'Popular with travelers near you',
      icon: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
      )
    },
    {
      id: 'gatlinburg',
      name: 'Gatlinburg, TN',
      description: 'For nature-lovers',
      icon: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
      )
    },
    {
      id: 'pigeon-forge',
      name: 'Pigeon Forge, TN',
      description: 'For sights like Dollywood',
      icon: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
      )
    },
    {
      id: 'panama-city',
      name: 'Panama City Beach, FL',
      description: 'Popular beach destination',
      icon: (
        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path d="M16 9H8v10h8V9z"/>
          </svg>
        </div>
      )
    }
  ];

  const handleSelect = (destination: string, destinationId: string) => {
    onSelect(destination);
    onClose();
  };

  return (
    <div className="absolute z-10 mt-2 w-full bg-white rounded-2xl shadow-lg p-6 max-h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-5">Suggested destinations</h3>
      <div className="space-y-5">
        {destinations.map((destination) => (
          <div 
            key={destination.id}
            className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            onClick={() => handleSelect(destination.name, destination.id)}
          >
            {destination.icon}
            <div>
              <div className="font-medium text-base">{destination.name}</div>
              <div className="text-gray-500 text-sm mt-0.5">{destination.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationSuggestions; 