'use client'
import React, { useState } from 'react';
import DatePicker from './DatePicker';
import DestinationSuggestions from './DestinationSuggestions';
import { format } from 'date-fns';

const SearchBar = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDestinationSuggestionsOpen, setIsDestinationSuggestionsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  
  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
    setIsDestinationSuggestionsOpen(false);
  };

  const toggleDestinationSuggestions = () => {
    setIsDestinationSuggestionsOpen(!isDestinationSuggestionsOpen);
    setIsDatePickerOpen(false);
  };

  // Handle date selection from DatePicker
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false); // Close the date picker when a date is selected
  };

  // Handle location selection from DestinationSuggestions
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsDestinationSuggestionsOpen(false); // Close the suggestions when a location is selected
  };

  // Close the date picker
  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  // Close the destination suggestions
  const handleCloseDestinationSuggestions = () => {
    setIsDestinationSuggestionsOpen(false);
  };

  return (
    <div className="w-[58%] mx-auto my-9">
      <div className="flex items-center rounded-full bg-white shadow-md overflow-hidden border border-gray-200">
        <div className="flex-1 px-6 py-3 relative">
          <div className="text-sm font-medium">Services or business</div>
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            className="w-full outline-none text-gray-600"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-2/3 bg-gray-200"></div>
        </div>
        
        <div className="flex-1 px-6 py-3 relative">
          <div className="text-sm font-medium">Where</div>
          <input 
            type="text" 
            placeholder="Location" 
            className="w-full outline-none text-gray-600"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            onClick={toggleDestinationSuggestions}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-2/3 bg-gray-200"></div>
        </div>
        
        <div className="flex-1 px-6 py-3 relative">
          <div className="text-sm font-medium">When</div>
          <button 
            className="w-full text-left outline-none text-gray-600 cursor-pointer"
            onClick={toggleDatePicker}>
            {selectedDate ? format(selectedDate, 'PP') : 'Date'}
          </button>
        </div>
        
        <button className="bg-[#FF375C] hover:bg-red-600 cursor-pointer text-white p-3 rounded-full mx-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Date Picker */}
      <div className="relative">
        <DatePicker 
          isOpen={isDatePickerOpen}
          onDateSelect={handleDateSelect}
          onClose={handleCloseDatePicker}
        />
      </div>

      {/* Destination Suggestions */}
      <div className="relative">
        <DestinationSuggestions
          isOpen={isDestinationSuggestionsOpen}
          onSelect={handleLocationSelect}
          onClose={handleCloseDestinationSuggestions}
        />
      </div>
    </div>
  );
};

export default SearchBar; 